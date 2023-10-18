import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "src/utils/database"; //Importando la conexion a la BD

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req;

    switch (method) {
        case "GET":
            try {
                const query = "SELECT * FROM tasks";//Definiendo la consulta
                const response = await conn.query(query);//Ejecutando la consulta
                return res.status(200).json(response.rows);//Devolviendo el array de tareas en formato json
            } catch (error: any) {
                return res.status(400).json({ message: error.message });//Devolviendo el error en formato json
            }
        case "POST":
            try {
                const { title, description } = body;//Obteniendo los datos del cuerpo de la petición

                const query = "INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *"; //Definiendo la consulta
                const values = [title, description];

                const response = await conn.query(query, values);

                return res.json(response.rows[0]);
            } catch (error: any) {
                return res.status(400).json({ message: error.message });
            }
        default:
            return res.status(400).json({ message: "Method are not supported" });
    }
}