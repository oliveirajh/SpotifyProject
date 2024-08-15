const axios = require('axios');
const API_URL = process.env.API_URL;

exports.verifyAccessToken = async (req, res, next) => { 
    try {
        let isExpired = checkIfTokenExpired(req.session.tokenExpiry);
        if (isExpired) {
            const tokens = await axios.post(`${API_URL}/auth/refresh`, {
                refreshToken: req.session.refreshToken,
            })
            req.session.accessToken = tokens.data.accessToken;
            req.session.refreshToken = tokens.data.refreshToken;
            req.session.tokenExpiry = Date.now() + 3600 * 1000;
        }

        next() // Continue para o próximo middleware ou rota
    } catch (error) {
        res.status(401).send('Não autorizado');
    }
}

function checkIfTokenExpired(tokenExpiry) {
    return Date.now() > tokenExpiry;
}