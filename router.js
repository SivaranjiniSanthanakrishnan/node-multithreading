const Express = require("express");
const router = Express.Router();
const { Worker, workerData } = require("worker_threads");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.get("/fibnocci/:number", (req, res) => {
  const worker = new Worker("./worker", {
    workerData: {
      number: req.params.number,
    },
  });

  worker.on("message", (data) => {
    res.status(200).send(`Data is ${data}`);
  });
  worker.on("error", (error) => {
    res.status(404).send(`failed to perform: ${error}`);
  });
});

module.exports = router;
