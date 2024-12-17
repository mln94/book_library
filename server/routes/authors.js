const express = require("express")
const Router = express.Router()
const Author = require("../../models/author")
const controllers = require("../controllers/authors")
const validateAuthor = require("../middlewares/validateAuthor");

// Router.get("/", async (req, res) => {
//     res.render("authors/index")
// })  


Router.get("/", controllers.find)

Router.get("/new", (req, res) => {
    res.render("authors/new", { author: new Author() })
})  

Router.post("/",validateAuthor,controllers.create)

module.exports = Router