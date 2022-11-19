export default async function migration(client) {
  const query = `
    CREATE SCHEMA "users" AUTHORIZATION "postgres";

    CREATE TABLE public.usersstatuses (
      id text,
      name text,
      password text,
      status text
    );

    CREATE TABLE public.usres (
      id text,
      name text,
      password text,
      status text
    );
  `

  await client.query(query);
  await client.query(`INSERT INTO public.migrations (id) VALUES ('0');`);
  console.log`migration 0 created`;
}
