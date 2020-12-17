const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config();

const { SQL_SERVER, SQL_DATABASE, SQL_USER, SQL_PASSWORD } = process.env;
const config = {
  user: SQL_USER,
  password: SQL_PASSWORD,
  server: SQL_SERVER,
  database: SQL_DATABASE,
  option: {
    enableArithAbort: "true",
  },
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
      console.log(err, "error connection to sql server(dbconfig)");
      pool = null;
    }
  };

  return await getConnection();
};

module.exports = client;
