const oracledb = require('oracledb');

async function bookAppointment(data) {
    let connection;

    try{
        connection = await oracledb.getConnection({

            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECTION_STRING
        });

        const formattedDate = new Date(data.fecha).toISOString().split('T')[0];
        const result = await connection.execute(
            `INSERT INTO CITAS_PADEL (NOMBRE, FECHA, HORA) 
             VALUES (:nombre, TO_DATE(:fecha, 'YYYY-MM-DD'), :hora)`,
            {
                nombre: data.nombre,
                fecha: formattedDate,
                hora: data.hora
            },
            { autoCommit: true }
        );
         
        return result;
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

module.exports = {
    bookAppointment
};