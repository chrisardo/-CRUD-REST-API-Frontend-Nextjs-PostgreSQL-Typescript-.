import { Pool } from "pg";
let conn: any;//Variable de conexión

if (!conn) {//Si no existe la conexión, la crea
    conn = new Pool({//Pool es un conjunto de conexiones
        user: "postgres",
        password: "postgres",
        host: "localhost",
        port: 5432,
        database: "tasksdb",
    });
}

export { conn };