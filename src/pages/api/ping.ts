import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../utils/database"; //Importando la conexión a la base de datos

type Data = { //Definiendo el tipo de dato que se va a devolver
    message: string;//Mensaje
    time: string;//Fecha y hora
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {//req: petición, res: respuesta
    const response = await conn.query("SELECT NOW()");//Obteniendo la fecha y hora actual de la base de datos
    console.log(response.rows);//Imprimiendo en consola la respuesta de la base de datos

    res.status(200).json({ message: "Pong!", time: response.rows[0].now });//Devolviendo la respuesta de la base de datos en formato json
}