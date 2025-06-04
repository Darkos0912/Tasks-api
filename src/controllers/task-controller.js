const db = require("../db");

const createTask = async (req,res) => {
    const {title, description} = req.body;
    const userId = req.user.userId; //Viene del middleware de autenticación.

    if(!title){
        return res.status(400).json({message: "El titulo es obligatorio"});
    }

    try{
        const result = await db.query("INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *", [userId,title,description]);
        res.status(201).json({task: result.rows[0]});
    }catch(error){
        console.error("Error al crear la tarea", error);
        res.status(500).json({message: "Error al crear la tarea"});
    }
};

const getTask = async (req,res) => {
    const userId = req.user.userId;

    try{
        const result = await db.query("SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
        res.status(200).json({task: result.rows});

    }catch(error){
        console.error("Error al obtener las tareas", error);
        res.status(500).json({message: "Error al obtener las tareas"});
    }
};

const updateTask = async (req,res) => {
    const userId = req.user.userId;
    const taskId = req.params.id;
    const {title, description, completed} = req.body;

    try{
        //Verificar que la tarea le pertenece al usuario
        const taskCheck = await db.query("SELECT * FROM tasks WHERE id = $1 AND user_id = $2", [taskId, userId]);

        if(taskCheck.rows.length === 0){
            return res.status(404).json({message: "Tarea no encontrada, o no autorizada"});
        }

        //Actualizar la tarea
        const result = await db.query("UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4 AND user_id = $5 RETURNING *", [title,description,completed,taskId,userId]);

        res.status(200).json({task: result.rows[0]});

    }catch(error){
        console.error("Error al actualizar la tarea",error);
        res.status(500).json({message: "Error al actualizar la tarea"});
    };
};

const deleteTask = async (req,res) => {
    const userId = req.user.userId;
    const taskId = req.params.id;

    try{
        //Verificar si la tarea pertenece al usuario.
        const taskCheck = await db.query("SELECT * FROM tasks WHERE id = $1 AND user_id = $2", [taskId, userId]);

        if(taskCheck.rows.length === 0){
            return res.status(404).json({message: "Tarea no encontrada, o no autorizada"});
        }

        //Eliminar la tarea.
        await db.query("DELETE FROM tasks WHERE id = $1 AND user_id = $2", [taskId, userId]);
        res.status(200).json({message: "Tarea eliminada correctamente"});

    }catch(error){
        console.error("Error al eliminar la tarea", error);
        res.status(500).json({message: "Error al eliminar la tarea"});
    };           
};

module.exports = {
    createTask,
    getTask,
    updateTask,
    deleteTask
}    