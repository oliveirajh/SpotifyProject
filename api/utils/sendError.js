const sendError = async (res, error) => {
    if(error.response){
        res.status(error.response.status).json(error.response.statusText);
    }
    else{
        //console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = sendError;