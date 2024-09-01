const Express = require("express");
const router = require("./router");
const memoryLeakRouter = require("./memory-leak-router");
const app = Express();

app.use("/", router);
app.use("/memory-leak", memoryLeakRouter);

app.listen("3000");
