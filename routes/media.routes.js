const { Router } = require('express');
const { getFavorites, updateFavorite} = require('../controllers/media.controllers');
const { validateJWT } = require('../middlewares/validate-jwt.middlewares');

const router = Router();

// Obtener animes favoritos

router.get('/', validateJWT , getFavorites);

// Guardar un favorito

router.post('/update', validateJWT , updateFavorite);

// Eliminar favorito

// router.post('/remove', validateJWT , deleteFavorite);


module.exports = router;