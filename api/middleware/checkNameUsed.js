const {find} = require('../models')

const checkNameUsed = async (req, res, next) => {

    try {

        const user = await find(req.body.username)
        res.status(401).json({message: "username taken"})
    
    } catch(err) {
        next()
    }

}

module.exports = checkNameUsed