# gpu-k8s

A tiny simulation of how kubernetes schedules gpus.

A pod asks for a whole number of gpus, the scheduler finds a node with enough
free gpus and binds the pod, and the kubelet plus the nvidia device plugin hand
out specific gpu devices. Gpus are integer only, exclusive, and cannot be
overcommitted, unlike cpu.

## run

```
npm install
npm start
```

## what you see

- device plugins register gpus with each node
- pods bound to nodes that have enough free gpus
- specific gpu devices allocated by the kubelet
- pods rejected when no single node has enough free gpus
- a cpu vs gpu summary of the scheduling rules

## the real thing

The `src` code is a simulation. `manifests` has the actual kubernetes objects
it stands in for.

- `manifests/nvidia-device-plugin.yaml` is the device plugin daemonset that runs
  on every gpu node and advertises `nvidia.com/gpu` to the kubelet. The
  simulation's `NvidiaDevicePlugin` and its `register` step map to this.
- `manifests/gpu-pod.yaml` is a pod asking for one gpu under
  `resources.limits.nvidia.com/gpu`. The simulation's `PodSpec.gpuLimit` maps to
  this. Note there is no `requests` block, gpus are integer limits only.

The scheduler in `src/scheduler.ts` mimics the real kube-scheduler filter: pick a
node whose free `nvidia.com/gpu` count covers the pod, otherwise leave it pending.

```
kubectl apply -f manifests/nvidia-device-plugin.yaml
kubectl apply -f manifests/gpu-pod.yaml
kubectl describe node <gpu-node>
kubectl get pod gpu-trainer -o wide
```
