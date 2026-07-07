import { WorkerNode } from "./node.js";
import { NvidiaDevicePlugin } from "./devicePlugin.js";
import { PodSpec } from "./types.js";

export class Kubelet {
  readonly node: WorkerNode;
  private readonly plugin: NvidiaDevicePlugin;
  private allocatable: number;

  constructor(node: WorkerNode) {
    this.node = node;
    this.plugin = new NvidiaDevicePlugin(node);
    this.allocatable = 0;
  }

  boot(): void {
    const devices = this.plugin.register();
    this.allocatable = devices.length;
  }

  freeCount(): number {
    return this.node.freeCount();
  }

  allocate(pod: PodSpec): string[] {
    const devices = this.node.reserve(pod.gpuLimit, pod.name);
    console.log(
      `[kubelet] ${this.node.name} allocated ${devices.join(", ")} to ${pod.name}`
    );
    return devices;
  }
}
