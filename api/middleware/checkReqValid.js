
const checkReqValid = (req, res, next) => {

    const valid = Boolean(req.body.username && req.body.password)

    if (valid) {
        next()
    } else {
        res.status(401).json({message: "username and password required"})
    }

}

module.exports = checkReqValid