const express = require("express");
const { connection } = require("./Configs/db");
const { userRouter } = require("./routes/user.routes");
const { productRouter } = require("./routes/product.routes");
const { cartRouter } = require("./routes/cart.routes");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome Home Page");
});

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);

app.listen(process.env.PORT || process.env.port || 8080, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
    console.log(`Server is running on port ${process.env.PORT || process.env.port || 8080}`);
  } catch (err) {
    console.log("Trouble connecting to the DB");
    console.log(err);
  }
  console.log(`Running at ${process.env.PORT || process.env.port || 8080} Port`);
});
