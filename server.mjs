import http from 'node:http';
import { Client } from 'pg';
import Waline from '@waline/vercel';
import service from './service.mjs';

const { db } = service.load();

// Waline's PostgreSQL storage adapter reads its connection settings from these
// variables when it loads; hand it the database the service was wired to.
const database = new URL(db.url);
process.env.PG_HOST = database.hostname;
process.env.PG_PORT = database.port || '5432';
process.env.PG_USER = decodeURIComponent(database.username);
process.env.PG_PASSWORD = decodeURIComponent(database.password);
process.env.PG_DB = decodeURIComponent(database.pathname.slice(1));
const sslmode = database.searchParams.get('sslmode');
if (sslmode === 'require' || sslmode === 'verify-ca' || sslmode === 'verify-full') {
  process.env.PG_SSL = 'true';
}

// Waline expects its tables to exist. Create them when the database is empty;
// existing tables are left alone.
async function createWalineTables() {
  const client = new Client({ connectionString: db.url });
  await client.connect();
  try {
    await client.query(`
      CREATE SEQUENCE IF NOT EXISTS wl_comment_seq;
      CREATE TABLE IF NOT EXISTS wl_comment (
        id INT PRIMARY KEY DEFAULT NEXTVAL('wl_comment_seq'),
        user_id INT,
        comment TEXT,
        insertedat TIMESTAMP,
        ip VARCHAR(100) DEFAULT '',
        link VARCHAR(255) DEFAULT '',
        mail VARCHAR(255) DEFAULT '',
        nick VARCHAR(255) DEFAULT '',
        pid VARCHAR(255) DEFAULT '',
        rid VARCHAR(255) DEFAULT '',
        sticky BOOLEAN DEFAULT FALSE,
        status VARCHAR(50) DEFAULT '',
        "like" INT DEFAULT 0,
        ua VARCHAR(255) DEFAULT '',
        url VARCHAR(255) DEFAULT '',
        createdat TIMESTAMP,
        updatedat TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS wl_comment_url_idx ON wl_comment (url);

      CREATE SEQUENCE IF NOT EXISTS wl_counter_seq;
      CREATE TABLE IF NOT EXISTS wl_counter (
        id INT PRIMARY KEY DEFAULT NEXTVAL('wl_counter_seq'),
        time INT,
        reaction0 INT,
        reaction1 INT,
        reaction2 INT,
        reaction3 INT,
        reaction4 INT,
        reaction5 INT,
        reaction6 INT,
        reaction7 INT,
        reaction8 INT,
        url VARCHAR(255) NOT NULL,
        createdat TIMESTAMP,
        updatedat TIMESTAMP
      );

      CREATE SEQUENCE IF NOT EXISTS wl_users_seq;
      CREATE TABLE IF NOT EXISTS wl_users (
        id INT PRIMARY KEY DEFAULT NEXTVAL('wl_users_seq'),
        display_name VARCHAR(255) DEFAULT '',
        email VARCHAR(255) DEFAULT '',
        password VARCHAR(255) DEFAULT '',
        type VARCHAR(50) DEFAULT '',
        label VARCHAR(50) DEFAULT '',
        url VARCHAR(255) DEFAULT '',
        avatar VARCHAR(255) DEFAULT '',
        github VARCHAR(255) DEFAULT '',
        twitter VARCHAR(255) DEFAULT '',
        facebook VARCHAR(255) DEFAULT '',
        google VARCHAR(255) DEFAULT '',
        "2fa" VARCHAR(32) DEFAULT '',
        createdat TIMESTAMP,
        updatedat TIMESTAMP
      );
    `);
  } finally {
    await client.end();
  }
}

const app = Waline({
  async postSave(comment) {
    // do what ever you want after save comment
  },
});

const server = http.createServer(app);
server.listen(service.port(), '0.0.0.0');

createWalineTables().catch((error) => {
  console.error('[comment] could not create Waline tables:', error.message);
});
