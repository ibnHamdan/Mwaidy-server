const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config();

const { SQL_SERVER, SQL_DATABASE, SQL_USER, SQL_PASSWORD } = process.env;
const config = {
  user: SQL_USER,
  password: SQL_PASSWORD,
  server: SQL_SERVER,
  database: SQL_DATABASE,
};

const client = async () => {
  let pool = null;

  const closePool = async () => {
    try {
      await pool.close();
      pool = null;
    } catch (err) {
      pool = null;
    }
  };

  const getConnection = async () => {
    try {
      if (pool) {
        return pool;
      }
      pool = await sql.connect(config);

      pool.on("error", async (err) => {
        console.log("conection db pool error", err);
        await closePool();
      });
      return pool;
    } catch (err) {
      console.log(err, "error connection to sql server");
      pool = nul;
    }
  };

  return getConnection;
};

module.exports = client;

// sql.connect(config, function (err) {
//   if (err) console.log(err);

//   let sqlRequest = new sql.Request();

//   let sqlQuery = "Select * From users";

//   sqlRequest.query(sqlQuery, function (err, data) {
//     if (err) console.log(err);

//     console.log(data);
//   });
// });

// async function queryDb() {
//   let pool = await sql.connect(config);
//   let data = await pool.request().query("select * from users");

//   pool.close;
//   sql.close;

//   return data;
// }

// module.exports = queryDb;
