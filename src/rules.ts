const cpu = [
  "divisible: request 500m means half a core",
  "compressible: throttled, not evicted",
  "overcommit allowed on a node",
  "requests can differ from limits",
];

const gpu = [
  "integer only: no 0.5 of a gpu",
  "exclusive: one container owns it",
  "no overcommit, hard cap",
  "limits == requests, always",
];

export function printRules(): void {
  console.log("\ncpu");
  for (const line of cpu) {
    console.log(`  - ${line}`);
  }
  console.log("\ngpu");
  for (const line of gpu) {
    console.log(`  - ${line}`);
  }
}
