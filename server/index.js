const express = require("express");
const app = express();
const api = process.env.API_URL || `/api/v1`;
const db = require("./models");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const expJWT = require("./_helper/jwt");
const port = process.env.PORT || 5000;

//ALL MIDDLEWARES
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
//CORS
app.use(cors());
app.options("*", cors);
//MORGANS
app.use(morgan("tiny"));
//AUTH
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
// app.use(expJWT.authJWt);
// app.use(expJWT.errorHandler);

// ALL ROUTERS
//users
const usersRoutes = require("./routes/usersRoutes");
app.use(`${api}/users/auth`, usersRoutes);
//POSTS
const postRouter = require("./routes/PostRoutes");
app.use(`${api}/posts`, postRouter);
//shops
const ShopRoutes = require("./routes/ShopRoutes");
app.use(`${api}/shop`, ShopRoutes);
//COMMENTS
const CommentRoutes = require("./routes/CommentRoutes");
app.use(`${api}/comment`, CommentRoutes);
//PRODUCTS
const ProductRoutes = require("./routes/ProductRoutes");
app.use(`${api}/product`, ProductRoutes);
const OrderRoutes = require("./routes/OrderRoutes");
app.use(`${api}/order`, OrderRoutes);
//CATEGORYS
const categoryRoutes = require("./routes/categoryRoutes");
app.use(`${api}/category`, categoryRoutes);
//conversation
const conversationsRoutes = require("./routes/ConversationsRoutes");
app.use(`${api}/conversation`, conversationsRoutes);

//TEST ROUTES
app.get("/testing", (req, res) => {
  res.status(200).send({ response: "Working" });
});
app.get(`${api}/test`, (req, res) => {
  res.send("hello muhammad abdullah");
});

// CONNECT DB WITH SEQUELIZER AND NODE SERVER
db.sequelize.sync().then(() => {
  app.listen(`${port}`, () => {
    console.log(`Server running on port  ${port}`);
  });
});
