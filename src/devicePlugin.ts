import { WorkerNode } from "./node.js";
import { GpuDevice } from "./types.js";

export class NvidiaDevicePlugin {
  private readonly node: WorkerNode;

  constructor(node: WorkerNode) {
    this.node = node;
  }

  register(): GpuDevice[] {
    const devices = this.node.gpus;
    console.log(
      `[device-plugin] ${this.node.name} registers ${devices.length} gpus with kubelet`
    );
    return devices;
  }
}
