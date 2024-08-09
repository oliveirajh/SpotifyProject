function verifyToken(req, res, next){
    const accessToken = req.session.accessToken;
    const refreshToken = req.session.refreshToken;

    if (!accessToken || !refreshToken) {
        res.render('index', {
            error: "You need to login first"
        });
    }else{
        next();
    }
}

module.exports = verifyToken;