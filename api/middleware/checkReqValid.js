
const checkReqValid = (req, res, next) => {

    const valid = req.username && req.password

    if (valid) {
        next()
    } else {
        res.status(401).json({message: "username and password required"})
    }

}