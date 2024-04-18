import "dotenv/config";

export const PORT = process.env.PORT || 3000;

export const DB_PASSWORD = process.env.DB_MYSQL_CONNECTION_PASSWORD || "MBuchTost1208@";
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_NAME = process.env.DB_NAME || "cursoexpressdb";
export const DB_USER= process.env.DB_USER || "root";
export const DB_HOST= process.env.DB_HOST || "localhost";