export interface PodSpec {
  name: string;
  gpuLimit: number;
}

export interface GpuDevice {
  id: string;
  allocatedTo: string | null;
}

export type BindResult =
  | { status: "bound"; node: string; devices: string[] }
  | { status: "unschedulable"; reason: string };
