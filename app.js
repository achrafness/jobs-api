require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');


const express = require('express');
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
 // connect DB
const connectDB = require("./db/connect")
const authenticateUser = require("./middleware/authentication")
// router 
const authRouter = require("./routes/auth")
const jobsRouter = require("./routes/jobs")
app.use("/",(req,res)=>{
  res.send("achraf zin")
})
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
)
app.use(express.json());
// extra packages
app.use(helmet());
app.use(cors());
app.use(xss());
// routes
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/jobs", authenticateUser ,jobsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
