// declare library
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");

// buat route
const userRouter = require("./src/router/user.routes");
const portfolioRouter = require("./src/router/portfolio.routes");
const jobRouter = require("./src/router/job.routes");
const recruiterRouter = require("./src/router/recruiter.routes");

const app = express();

try {
	app.use(express.static("public"));
	app.use(helmet());
	app.use(bodyParser.json());
	app.use(xss());
	// app.use(cookieparser());
	app.use(cors());
	//   app.options('*', cors())
	app.use(portfolioRouter);
	app.use(userRouter);
	app.use(jobRouter);
	app.use(recruiterRouter);
} catch (err) {
	console.log(err);
}

// jalankan express
app.listen(process.env.PORT, () => {
	console.log("SERVICE IS RUNNING ON PORT 3001");
});
