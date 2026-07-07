import { Kubelet } from "./kubelet.js";
import { BindResult, PodSpec } from "./types.js";

export class KubeScheduler {
  private readonly kubelets: Kubelet[];

  constructor(kubelets: Kubelet[]) {
    this.kubelets = kubelets;
  }

  schedule(pod: PodSpec): BindResult {
    console.log(`[scheduler] pod ${pod.name} needs ${pod.gpuLimit} gpu`);

    if (!Number.isInteger(pod.gpuLimit) || pod.gpuLimit < 1) {
      return {
        status: "unschedulable",
        reason: `gpu limit must be a positive integer, got ${pod.gpuLimit}`,
      };
    }

    const target = this.kubelets.find(
      (kubelet) => kubelet.freeCount() >= pod.gpuLimit
    );

    if (!target) {
      return {
        status: "unschedulable",
        reason: `no node has ${pod.gpuLimit} free gpus`,
      };
    }

    console.log(
      `[scheduler] node ${target.node.name} has ${target.freeCount()} free -> bind`
    );
    const devices = target.allocate(pod);
    return { status: "bound", node: target.node.name, devices };
  }
}
