const express = require('express')
const router = express.Router()

// Path to your JSON file, although it can be hardcoded in this file.
const dummyData = {
    "avengers": [
        {
            "name": "Tony Stark"
        },
        {
            "name": "Steve Rogers"
        },
        {
            "name": "Thor Odinson"
        },
        {
            "name": "Bruce Banner"
        },
        {
            "name": "Natasha Romanova"
        },
        {
            "name": "Clint Barton"
        }
    ]
};

router.get('/fetchAll', (req, res, next) => {
    res.json(dummyData)
})

router.post('/insertName', (req, res, next) => {
    // not accepting empty values
    if (req.body.newName !== undefined) {
        const newName = req.body.newName

        // Make submissions unique.
        if (!dummyData.avengers.some(a => a.name === newName)) {
            dummyData.avengers.push({ name: newName }) // Push new object
            res.sendStatus(200)
        }
    } else {
        res.sendStatus(400) 
    }
})

router.get('/', (req, res, next) => {
    res.render('pages/prove/prove10', {
        title: 'Prove Assignment 10',
        path: '/prove/prove10'
    })
})

module.exports = router
