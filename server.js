const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const routes = require("./server/routes/routes")
require("dotenv").config()
const authorsRoutes = require("./server/routes/authors")

const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE_URI, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.set("view engine","ejs")
app.set("views", __dirname+ "/views")
app.set("layout", "layouts/layout")


app.use(express.json())
app.use(express.urlencoded({}))

app.use(expressLayouts)
app.use(express.static("public"))
app.use("/",routes)
app.use("/authors", authorsRoutes)

const port = process.env.PORT || 3000

app.listen(port, console.log(`Connecter on port: ${port}`))