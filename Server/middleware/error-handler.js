function errorHandler(err, req, res, next){
    res.Status(500).send(err.message);
}

module.exports = errorHandler;