import mysql from "mysql2/promise";

async function queryDb({ query, params = [] }) {

    //console.log(`query`,query);  //TODO: a sup
    //console.log(`params`,params); //TODO: a sup

    // create the connection to database
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        const [datas] = await connection.execute(query, params);

        return datas;

    } catch (error) {

        return Response.json(
            { message: 'unauthenticated' },
            { status: 401 }
        )

    } finally {
        if (connection) {
            connection.end();
        }
    }

}

export { queryDb };