const router = require('express').Router()

const { 
    checkAuth, 
    checkRolUser, 
    checkRolTeamLeader, 
    checkRolOrganizer 
} = require('../utils')

const { 
    createTrophy, 
    updateTrophy, 
    deleteTrophy, 
    showAllTrophies, 
    showTrophyById 
} = require('../controllers/trophyController')

router
    .post('/', checkAuth, checkRolOrganizer, createTrophy)

    .put('/:id', checkAuth, checkRolOrganizer, updateTrophy)

    //.delete('/:id', checkAuth, checkRolOrganizer, deleteTrophy)

    .get('/', checkAuth, checkRolOrganizer, showAllTrophies)
    .get('/:id', checkAuth, checkRolOrganizer, showTrophyById)


module.exports = router