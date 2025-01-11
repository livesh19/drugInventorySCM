const pkg = require('pg');

const { Pool } = pkg;

const pool = new Pool({
    connectionString: "postgresql://Employee_owner:iqRLeY36EWKt@ep-quiet-truth-a1p4po63.ap-southeast-1.aws.neon.tech/AdminDesktopPortal?sslmode=require"
  });

  pool.connect((err, client, release) => {
    if (err) {
      console.error('Error acquiring client', err.stack);
    } else {
      client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
          console.error('Error executing query', err.stack);
        } else {
          console.log('Connected to PostgreSQL database'); //at:', result.rows[0].now
        }
      });
    }
  });

module.exports ={ pool };