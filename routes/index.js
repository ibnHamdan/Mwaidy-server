const router = require("express").Router();
const mssql = require("mssql");
const db = require("../config/database");

router.use("/users", require("./users"));

// router.use("/", async (req, res, next) => {
//   const conn = await db().then((conn) => conn);
//   //console.log("conn is", conn);

//   const query = "INSERT INTO [dbo].[users](username, password, email, phone, rule_id)VALUES('nodejs2', 'node3js', 'node.js3@js.js', 32201, 1)";
//   const newUser = await conn();
//   const request = newUser
//     .request()
//     .query(query)
//     .then((result) => {
//       console.log("result is", result);
//     });
//   //console.log("new user", newUser.request());
//   return newUser;
// });
router.use("/", async (req, res, next) => {
  const sql = await db();
  const conn = await sql();
  const users = await conn
    .request()
    .query("select * from users")
    .then((result) => {
      res.json(result.recordset[0]);
    });
});

module.exports = router;
