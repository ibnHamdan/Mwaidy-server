const router = require("express").Router();
const db = require("../config/database");

router.use("/users", require("./users"));

router.use("/", async (req, res, next) => {
  const conn = await db();

  const users = await conn.request().query("select * from users");
  res.json(users.recordset);
});

module.exports = router;
