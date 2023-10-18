import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database"; //Imòrtando la conexión a la base de datos

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    //Obteniendo los datos de la petición
    const {
        method, //Obteniendo el método de la petición
        body, //Obteniendo el cuerpo de la petición
        query: { id },//Obteniendo el id de la tarea
    } = req;

    switch (method) {
        case "GET":
            try {
                const text = "SELECT * FROM tasks WHERE id = $1";//Definiendo la consulta para obtener la tarea por id
                const values = [id];//Definiendo los valores
                const result = await conn.query(text, values);//Ejecutando la consulta

                if (result.rowCount === 0) //Verificando si la consulta devolvió datos
                    return res.status(404).json({ message: "Task Not Found" }); //Devolviendo un error

                return res.json(result.rows[0]);//Devolviendo la tarea en formato json
            } catch (error: any) { //Capturando el error
                return res.status(400).json({ message: error.message });
            }
        case "PUT":
            try {
                const { title, description } = body; //Obteniendo los datos del cuerpo de la petición
                const text =
                    "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *"; //Definiendo la consulta para actualizar la tarea por id
                const values = [title, description, id]; //Definiendo los valores
                const result = await conn.query(text, values); //Ejecutando la consulta
                return res.json(result.rows[0]); //Devolviendo la tarea actualizada en formato json
            } catch (error: any) {//Capturando el error
                return res.status(400).json({ message: error.message });
            }
        case "DELETE":
            try {
                const text = "DELETE FROM tasks WHERE id = $1 RETURNING *"; //Definiendo la consulta para eliminar la tarea por id
                const values = [id];
                const result = await conn.query(text, values);

                if (result.rowCount === 0)
                    return res.status(404).json({ message: "Task Not Found" });

                return res.json(result.rows[0]);
            } catch (error: any) {
                return res.status(400).json({ message: error.message });
            }
        default:
            return res.status(400).json({ message: "Method are not supported" });
    }
};