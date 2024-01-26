import express from "express";
import router from "./routes/index.js";
import cors from "cors";
import paymentRouter from "./routes/paymentroute.js";
const app = express();
app.use(cors("*"));
app.use(express.json());
app.use("/", router);
app.use("/", paymentRouter);
app.listen(9000, () => {
  console.log("listening at 9000");
});
