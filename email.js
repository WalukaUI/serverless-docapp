import pg from 'pg';

export const handler = async (event, context) => {
    try {
      const client = new pg.Client({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: 5432,
      });
      await client.connect();
      let myDate = event.date;
      myDate = `'${myDate}'`;
      let myStatus = event.status;
      myStatus = `'${myStatus}'`;

      const queryString = "INSERT INTO appointments (doctor_id, patient_id, time, date, status) VALUES ("+ event.doctor_id +','+ event.patient_id +','+ event.time + ','+ myDate +','+ myStatus+")"
      const create_appointment = await client.query(queryString)
      const result = await client.query('SELECT * FROM appointments');
      await client.end();
      let all_appointments_lnth=result.rows.length
      return {
        statusCode: 200,
        body: JSON.stringify(result.rows[all_appointments_lnth-1]),
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      };
  
    } catch (error) {
      console.error('Error connecting to RDS PostgreSQL:', error);
      return {
        statusCode: 500,
        body: JSON.stringify('Error connecting to the database'),
      };
    }
  };