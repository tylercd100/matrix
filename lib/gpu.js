const { GPU } = require("gpu.js");
const gpu = new GPU({ mode: "gpu" });

console.log(gpu.Kernel);
// console.log("disableValidation", GPU.disableValidation());
console.log("enableValidation", GPU.enableValidation());
console.log("isGPUSupported", GPU.isGPUSupported);
console.log("isKernelMapSupported", GPU.isKernelMapSupported);
console.log("isOffscreenCanvasSupported", GPU.isOffscreenCanvasSupported);
console.log("isWebGLSupported", GPU.isWebGLSupported);
console.log("isWebGL2Supported", GPU.isWebGL2Supported);
console.log("isHeadlessGLSupported", GPU.isHeadlessGLSupported);
console.log("isCanvasSupported", GPU.isCanvasSupported);
console.log("isGPUHTMLImageArraySupported", GPU.isGPUHTMLImageArraySupported);
console.log("isSinglePrecisionSupported", GPU.isSinglePrecisionSupported);

// Create the GPU accelerated function from a kernel
// function that computes a single element in the
// 512 x 512 matrix (2D array). The kernel function
// is run in a parallel manner in the GPU resulting
// in very fast computations! (...sometimes)
addition = gpu.createKernel(function (a, b) {
  return a[this.thread.y][this.thread.x] + b[this.thread.y][this.thread.x];
});

exports.addition = (output, a, b) => addition.setOutput(output)(a, b);
