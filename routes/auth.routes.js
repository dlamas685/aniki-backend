const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, revalidateToken, getUser ,loginUser } = require('../controllers/auth.controllers');
const { validateFields } = require('../middlewares/validate-fields.middlewares');
const { validateJWT } = require('../middlewares/validate-jwt.middlewares');

const router = Router();

// Crear un nuevo usuario

router.post('/new', [
    check('username', 'El nombre de usuario es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').isEmail(),
    check('name', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'La contraseña es obligatoria.').isLength({min:6}),
    validateFields 
], createUser);

// Obtener usuario: Validacion async desde el front-end

router.get('/user', getUser);

// Iniciar sesion con usuario

router.post( '/', [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').isLength({min:6}),
    validateFields
] , loginUser); 

// Validar y revalidar token

router.get('/renew', validateJWT , revalidateToken);

module.exports = router;
