const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { mongodbUri, port } = require("./src/config/keys");
const routes = require("./src/routes");
const {
	notFoundHandler,
	badRequestHandler,
	forbiddenHandler,
	unAuthorizedHandler,
	genericHandler,
} = require("./src/helpers/errorHandling");

//Inıtial setup
require("dotenv").config();
const server = express();

//MIDDLEWARES
server.use(express.json());
server.use(cors());

//MIDDLEWARES
server.use("/api", routes);

//ERROR HANDLING MIDDLEWARES
server.use(notFoundHandler);
server.use(badRequestHandler);
server.use(forbiddenHandler);
server.use(unAuthorizedHandler);
server.use(genericHandler);

mongoose
	.connect(mongodbUri, { useUnifiedTopology: true, useNewUrlParser: true })
	.then(() => console.log("Connected to DB..."))
	.catch((e) => console.log("DB connection error: ", e));

server.listen(port, () => {
	console.log("Server is runnign on PORT:", port);
});
