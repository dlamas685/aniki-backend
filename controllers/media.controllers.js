const { response } = require('express');
const User = require('../models/User');

const getFavorites = async (req, res = response) => {
    const {uid} = req;
    try {
        const user = await User.findById(uid);
        return res.status(201).json({
            success: true,
            msg: 'Tenemos favoritos.',
            favorites: user.favorites
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Por favor hable con el administrador.'
        });
    }
}

const updateFavorite = async (req, res = response) => {
    const {uid} = req;
    const {idgql} = req.body 
    try {
        const result = await User.find({favorites: {$elemMatch: {$eq:idgql}}})
        if (result.length === 0){
            const user = await User.findOneAndUpdate(
                {uid},
                {$addToSet:{ favorites: idgql }},
                {returnDocument: 'after'},
            );
            return res.status(200).json({
                success: true,
                msg: 'fue agregado a favoritos.',
                favorites: user.favorites
            });
        }
        else {
            const user = await User.findOneAndUpdate(
                {uid},
                {$pull:{ favorites: idgql  }},
                {returnDocument: 'after'},
            );
            return res.status(200).json({
                success: false,
                msg: 'se eliminó de favoritos.',
                favorites: user.favorites
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Por favor hable con el administrador.'
        });
    }
}

// const deleteFavorite = async (req, res = response) => {
//     const {uid} = req;
//     const {idgql} = req.body 
//     try {
//         const result = await User.find({favorites: {$elemMatch: {$eq:idgql}}})
//         if (result.length > 0){
            
//         }
//         else {
//             return res.status(200).json({
//                 success: false,
//                 msg: 'no existe en los favoritos.'
//             });
//         }
//     }
//     catch (error) {
//         return res.status(500).json({
//             success: false,
//             msg: 'Por favor hable con el administrador.'
//         });
//     }
// }

module.exports = {
    getFavorites,
    updateFavorite
}