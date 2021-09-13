const {find} = require('../models')

const checkNameUsed = async (req, res, next) => {

    try {

        const user = await find(req.body.username)

        if (!user) {
            next()
        } else (
            res.status(401).json({message: "username taken"})
        )


    
    } catch(err) {
        res.status(500).json({message: "server could not be reached at this time"})
    }

}

module.exports = checkNameUsed