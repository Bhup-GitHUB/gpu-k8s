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
