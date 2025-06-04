const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const register = async (req,res) => {
    const {email, password} = req.body;
    console.log(req.body);

    try {
        //Verificar si el usuario existe.
        const userExist = await db.query("SELECT * from users WHERE email = $1", [email]);

        if(userExist.rows.length > 0){
            return res.status(400).json({message: "El usuario ya existe"});
        }

        //Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password,10);

        //Insertar usuario nuevo
        const newUser = await db.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email", [email, hashedPassword]);

        //Generar token JWT
        const token = jwt.sign(
            {userId: newUser.rows[0].id},
            process.env.JWT_SECRET,
            {expiresIn: "2h"}
        );

        res.status(201).json({
            message: "usuario registrado exitosamente",
            user: newUser.rows[0],
            token
        });
        
    }catch(error){
        console.error("Error en el registro:", error);
        res.status(500).json({message: "Error del servidor"});
    }
};

const login = async (req,res) => {
    const {email, password} = req.body;

    try{
        //1. Buscar usuario por email
        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if(user.rows.length === 0){
            return res.status(404).json({message: "Usuario no encontrado"});
        }

        const userData = user.rows[0];

        //2. Comparar contraseña con bcrypt
        const isMatch = await bcrypt.compare(password, userData.password);
        if (!isMatch){
            return res.status(401).json({message: "Contraseña incorrecta"});
        }

        //3. Crear y devolver token JWT
        const token = jwt.sign(
            {userId: userData.id},
            process.env.JWT_SECRET,
            {expiresIn: "2h"}
        );

        res.status(200).json({
            message: "Se ha logueado exitosamente",
            user: {
                id: userData.id,
                email: userData.email
            },
            token
        });

    } catch(error){
        console.error("Error en login", error);
        res.status(500).json({message: "Error del servidor"});
    }
};

const profile = async (req,res) => {
    const userId = req.user.userId;

    try{
        const result = await db.query("SELECT id,email, created_at FROM users WHERE id = $1", [userId]);
        const user = result.rows[0];

        res.status(200).json({user});
    }catch(error){
        console.error("Error al obtener perfil:", error);
        res.status(500).json({message: "Error al obtener el perfil"});
    }
};

module.exports = {
    register,
    login,
    profile
};