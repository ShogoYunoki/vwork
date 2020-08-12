const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cors = require("cors");

dotenv.config({ path: "./config/config.env" });

// データベース接続
connectDB();

// Routeファイル
const auth = require("./routes/auth");
const workspaces = require("./routes/workspaces");
const projects = require("./routes/projects");
const tasks = require("./routes/tasks");
const attendances = require("./routes/attendances");
const registration = require("./routes/registration");
const users = require("./routes/users");

const app = express();

// Setting CORS
// TODO: deploy時に修正
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

// Body parser
app.use(express.json());

// 開発環境用のログ
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// route設定
app.use("/api/v1/auth", auth);
app.use("/api/v1/workspaces", workspaces);
app.use("/api/v1/projects", projects);
app.use("/api/v1/tasks", tasks);
app.use("/api/v1/attendances", attendances);
app.use("/api/v1/registration", registration);
app.use("/api/v1/users", users);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// ハンドルされなかったpromise rejectionsをハンドル
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
