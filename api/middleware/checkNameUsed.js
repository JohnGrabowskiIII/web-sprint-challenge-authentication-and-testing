const {find} = require('../models')

const checkNameUsed = async (req, res, next) => {

    try {

        const user = await find(req.username)

        if (!user) {
            next()
        } else {
            res.status(401).json({message: "username taken"})
        }
    
    } catch(err) {
        res.status(500).json({message: "Server could not be reached at this time"})
    }

}

module.exports = checkNameUsed