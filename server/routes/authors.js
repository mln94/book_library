const express = require("express")
const Router = express.Router()

Router.get("/", (req, res) => {
    res.render("authors/index")
})  

Router.get("/new", (req, res) => {
    res.render("authors/new")
})  

Router.post("/", (req, res) => {
    res.send("post book")
})

module.exports = Router