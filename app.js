require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');
const xss = require('xss-clean');

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

const path = require('path');


app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(express.json());
// extra packages
app.use(helmet());
app.use(xss());


// routes
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/jobs", authenticateUser ,jobsRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

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
