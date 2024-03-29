const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {

    const token = req.header('x-token');
    
    if (!token) {
        return res.status(401).json({
            success:false,
            msg: 'Error en el token'
        });
    }

    try {
        const {uid, name} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;
        
    }
    catch (error) {
        return res.status(401).json({
            success:false,
            msg: 'Token no valido'
        });
    }
    next();
}

module.exports = {
    validateJWT
}