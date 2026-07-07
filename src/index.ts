import { WorkerNode } from "./node.js";
import { Cluster } from "./cluster.js";

const cluster = new Cluster([new WorkerNode("gpu-a", 3), new WorkerNode("gpu-b", 1)]);

console.log("");
cluster.submit({ name: "trainer-1", gpuLimit: 2 });
console.log("");
cluster.submit({ name: "trainer-2", gpuLimit: 1 });
console.log("");
cluster.submit({ name: "notebook-1", gpuLimit: 1 });
