export default async function migration(client, index = 0) {
  const query = `
    SET statement_timeout = 0;
    SET lock_timeout = 0;
    SET idle_in_transaction_session_timeout = 0;
    SET client_encoding = 'UTF8';
    SET standard_conforming_strings = on;
    SELECT pg_catalog.set_config('search_path', '', false);
    SET check_function_bodies = false;
    SET xmloption = content;
    SET client_min_messages = warning;
    SET row_security = off;

    SET default_tablespace = '';
    SET default_table_access_method = heap;

    DROP EXTENSION IF EXISTS "uuid-ossp";
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA public;
    CREATE TABLE public.migrations (id text, PRIMARY KEY ("id"));
  `

  await client.query(query);
  await client.query(`INSERT INTO public.migrations (id) VALUES ('${index}')`);
  console.log(`migration ${index} created`);
}
