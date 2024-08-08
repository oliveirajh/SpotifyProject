function verifyToken(req, res, next){
    const refreshToken = req.session.refresh_token;
    const accessToken = req.session.access_token;

    if (!accessToken || !refreshToken) {
        res.status(401).send('You need to be logged in');
    }

    next();
}

export default verifyToken;