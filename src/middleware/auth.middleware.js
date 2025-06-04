const jwt = require("jsonwebtoken");

const authenticateToken = (req,res,next) => {
    const authHeader = req.headers["authorization"];

    //Verifica si viene el header Authorization: Bearer <token>
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({message: "Acceso denegado. Token no proporcionado"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //Ahora tenés acceso a req.user.userId
        next();
    }catch(error){
        return res.status(403).json({message: "Token inválido o expirado."});
    }
};

module.exports = authenticateToken;
