import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
// import connectToPostgres from './config/database.config'
const port = process.env.PORT;
import Authrouter from "./route/auth.route";
import Orgrouter from "./route/org.route";
import UserRouter from "./route/user.route";
import cors from "cors";
import cookieParser from "cookie-parser";


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/", Authrouter);
app.use("/api/organisations", Orgrouter);
app.use("/api/users", UserRouter);
// app.use("/api/v1", Authrouter);
app.use("/", (req, res) => {
  res.send("Hello, Welcome to HNG Stage 2");
});

app.use("/", Authrouter);
// app.use("/api/v1", Authrouter);

(async () => {
  try {
    // await connectToPostgres();
    app.listen(port, () => {
      console.log(`server is started on ${port}`);
    });
  } catch (error: any) {
    console.log(error.message);
  }
})();

export default app;