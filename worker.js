const {
  parentPort,
  workerData: { number },
} = require("worker_threads");

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
const result = fibonacci(number);

if (parentPort) {
  parentPort.postMessage(result);
} else {
  console.error("parentPort is not available");
}
