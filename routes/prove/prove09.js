const express = require('express')
const router = express.Router()

const controller = require('../../controllers/prove09');

router.get('/', (req, res, next) => {
    res.render('pages/prove/prove09', {
        title: 'Prove Assignment 09',
        path: '/prove/prove09'
    })
})
.get('/pokemon/:page', (req, res, next) => {
    const page = req.params.page;
    controller.getPokemon(page, (pokemon) => {
            res.render('pages/prove/prove09', {
                title: 'Prove Assignment 09',
                path: '/prove/prove09',
                pokemonList: pokemon,
                page: page
            });
    });
});

module.exports = router