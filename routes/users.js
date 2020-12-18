const passport = require("passport");
const router = require("express").Router();
const utils = require("../lib/utils");
const db = require("../config/database");

router.post("/login", async function (req, res, next) {
  const conn = await db();
  const username = req.body.username;

  const query = `select * from users where users.username like '${username}'`;

  const request = await conn
    .request()
    .query(query)
    .then((result) => {
      const isValid = utils.validPassword(String(req.body.password), result.recordset[0].password);

      if (isValid) {
        const tokenObject = utils.issueJWT(11);

        res.status(200).json({
          user: result.recordset[0],
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res.status(401).json({
          success: false,
          msg: "you entered the wrong password",
        });
      }
      // res.status(200).json({
      //   success: true,
      //   msg: result.recordset[0].password,
      // });
    })
    .catch((err) => {
      res.status(200).json({
        success: false,
        msg: "error in valid ",
        err,
      });
      console.log(err, "erro in result");
    });
});

router.post("/register", async function (req, res, next) {
  const saltHash = utils.genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const username = req.body.username;
  const password = saltHash.hash;
  const email = req.body.email;
  const phone = Number(req.body.phone);
  const rule_id = Number(1);

  try {
    const conn = await db();

    const query = `INSERT INTO [dbo].[users](username,email,phone,rule_id, password)VALUES('${username}', '${email}', ${phone}, ${rule_id}, '${password}')`;

    const request = await conn
      .request()
      .query(query)
      .then((result) => {
        console.log(result);
        res.status(200).json({
          success: true,
          msg: result.rowsAffected,
        });
      })
      .catch((err) => {
        res.status(200).json({
          success: false,
          msg: err,
        });
        console.log(err, "erro in result");
      });
  } catch (err) {
    console.log("error in saving user", err);
    res.json({ success: false, msg: err });
  }
});

router.get("/protected", passport.authenticate("jwt", { session: false }), (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: "You are successfully authenticated to this route!",
  });
});

module.exports = router;

module.exports = router;
