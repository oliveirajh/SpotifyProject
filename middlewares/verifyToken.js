function verifyToken(req, res, next){
    const accessToken = req.session.accessToken;
    const refreshToken = req.session.refreshToken;

    if (!accessToken || !refreshToken) {
        res.status(401).send('You need to be logged in');
    }else{
        next();
    }
}

module.exports = verifyToken;