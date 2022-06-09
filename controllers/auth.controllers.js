const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response) => {

    try {
        const user = new User(req.body);
        const {password} = req.body;
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password,salt);
        const token = await generateJWT(user.id, user.username);
        await user.save();
        return res.status(201).json({
            success: true,
            msg:'Usted se registro correctamente.',
            uid: user.uid,
            username: user.username,
            email: user.email,
            name: user.name,
            token        
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            msg: 'Por favor hable con el administrador.'
        });
    }
}

const getUser = async (req, res = response) => {
    const { email, username } = req.query;
    // console.log(email, username);
    try {
        let user;
        if (email) {
            user = await User.findOne({
                email
            });
        }
        else if (username) {
            user = await User.findOne({
                username
            });
        }
        if (user && email){
            return res.status(200).json({
                success: false,
            });
        }
        else if (user && username){
            return res.status(200).json({
                success: false,
            });
        }
        else {
            return res.status(200).json({
                success: true,
            });
        }

    }
    catch(error){
        return res.status(500).json({
            success: false,
            msg: 'Por favor hable con el administrador.'
        });
    }

}

const loginUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if (!user){
            return res.status(400).json({
                success:false,
                msg:`El nombre de usuario ${username} es incorrecto.`
            });
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword){
            return res.status(400).json({
                success:false,
                msg:'La contraseña es incorrecta.'
            });
        }
        const token = await generateJWT(user.id, user.name);
        return res.status(200).json({
            success: true,
            uid: user.id,
            username: user.username,
            msg: 'Bienvenido, incio de sesión correcto.',
            email: user.email,
            name: user.name,
            token
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            msg: 'Por favor hable con el administrador.'
        });
    }
}

const revalidateToken = async (req, res = response) => {
    const {uid} = req;

    const user = await User.findById(uid);

    const token = await generateJWT(uid, user.name);

    return res.json({
        success: true,
        uid,
        username: user.username,
        email:user.email,
        name:user.name,
        token
    });
}

module.exports = {
    createUser,
    getUser,
    loginUser,
    revalidateToken
}

