import { GpuDevice } from "./types.js";

export class WorkerNode {
  readonly name: string;
  readonly gpus: GpuDevice[];

  constructor(name: string, gpuCount: number) {
    this.name = name;
    this.gpus = [];
    for (let i = 0; i < gpuCount; i++) {
      this.gpus.push({ id: `${name}-gpu-${i}`, allocatedTo: null });
    }
  }

  freeGpus(): GpuDevice[] {
    return this.gpus.filter((gpu) => gpu.allocatedTo === null);
  }

  freeCount(): number {
    return this.freeGpus().length;
  }

  reserve(count: number, owner: string): string[] {
    const free = this.freeGpus().slice(0, count);
    for (const gpu of free) {
      gpu.allocatedTo = owner;
    }
    return free.map((gpu) => gpu.id);
  }
}
