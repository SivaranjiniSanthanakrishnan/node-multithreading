const Express = require("express");
const router = Express.Router();
const heapdump = require("heapdump");
const path = require("path");

const snapshotDir = path.join(__dirname, "snapshots");

router.get("/snapshot", (req, res, next) => {
  const fileName = path.join(
    snapshotDir,
    `heapdump-${Date.now()}.heapsnapshot`
  );
  heapdump.writeSnapshot(fileName, (err, filename) => {
    if (err) {
      console.error("Heap snapshot failed:", err);
      res.status(500).send("Error creating heap snapshot");
    } else {
      console.log(`Heap snapshot written to ${filename}`);
      res.send(`Heap snapshot written to ${filename}`);
    }
  });
});

router.get("/leak", (req, res) => {
  global.leakArray = global.leakArray || [];
  global.leakArray.push(new Array(10000).fill("*"));
  res.send("Memory leak simulated");
});
module.exports = router;
