const Author = require("../../models/author")

const { validationResult } = require('express-validator');

exports.find = async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render("authors/index", {
            authors: authors, 
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
}

exports.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('authors/new', {
            author: {name: req.body.name},
            errorMessage:  errors.array().map(error => error.msg).join(', ')
        });
    }

    const author = new Author({name: req.body.name});

    try {
        const newAuthor = await author.save();
        res.redirect("/authors")
    } catch (error) {
        console.error("Error saving author:", error);
        res.status(500).render('authors/new', {
            author,
            errorMessage: "Failed to create a new author. Please try again.",
        });
    }
};

