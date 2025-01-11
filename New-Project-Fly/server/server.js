const express = require('express');
const app = express();
app.use(express.json()); // This should be before defining your routes
const otpRouter = require('./src/route/authRouts.js');

const cors = require("cors");
const PORT = process.env.PORT || 8000;
const { pool } = require('./db.js');
app.use(cors());


app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log("Request body:", req.body); // Log the request body
  next(); // Call the next middleware or route handler
});

console.log("after json parse");
app.get('/db-status', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ status: 'Connected', timestamp: result.rows[0].now });
    } catch (err) {
        console.error('Connection error', err);
        res.status(500).json({ status: 'Not connected', error: err.message });
    }
});



console.log("before otp request");
app.use("/", otpRouter);
console.log("after otp request");


const StartServer = async () => {
  app.listen(PORT, () => {
      console.log("Listening to: ", PORT);
  });

  process.on("uncaughtException", async (err) => {
      console.log(err);
      process.exit(1);
  });
};
// Start the server
StartServer();
