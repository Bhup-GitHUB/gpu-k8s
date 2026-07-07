import { WorkerNode } from "./node.js";
import { Kubelet } from "./kubelet.js";
import { KubeScheduler } from "./scheduler.js";
import { BindResult, PodSpec } from "./types.js";

export class Cluster {
  private readonly kubelets: Kubelet[];
  private readonly scheduler: KubeScheduler;

  constructor(nodes: WorkerNode[]) {
    this.kubelets = nodes.map((node) => new Kubelet(node));
    for (const kubelet of this.kubelets) {
      kubelet.boot();
    }
    this.scheduler = new KubeScheduler(this.kubelets);
  }

  submit(pod: PodSpec): BindResult {
    const result = this.scheduler.schedule(pod);
    if (result.status === "unschedulable") {
      console.log(`[scheduler] pod ${pod.name} unschedulable: ${result.reason}`);
    }
    return result;
  }
}
