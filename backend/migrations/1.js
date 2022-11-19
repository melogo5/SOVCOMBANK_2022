export default async function migration(client, index = 1) {
  const query = `
    CREATE SCHEMA "permissions";
    CREATE SCHEMA "roles";
    CREATE SCHEMA "users";
    CREATE SCHEMA "cards";

    CREATE TABLE roles.list (
      id uuid NOT NULL default uuid_generate_v4(),
      name text,
      enabled boolean default true,
      PRIMARY KEY ("id")
    );

    CREATE TABLE permissions.list (
      id uuid NOT NULL default uuid_generate_v4(),
      name text,
      enabled boolean default true,
      PRIMARY KEY ("id")
    );

    CREATE TABLE roles.permissions (
      id uuid NOT NULL default uuid_generate_v4(),
      role uuid,
      permission uuid,
      enabled boolean default true,
      PRIMARY KEY ("id")
    );

    CREATE TABLE users.list (
      id uuid NOT NULL default uuid_generate_v4(),
      name text,
      password text,
      created timestamp(0) NOT NULL DEFAULT now(),
      role uuid,
      PRIMARY KEY ("id")
    );

    CREATE TABLE cards.list (
      id uuid NOT NULL default uuid_generate_v4(),
      cardnumber text,
      cardholder text,
      cardexpiredate: text,
      cardsecret: text,
      created timestamp(0) NOT NULL DEFAULT now(),
      PRIMARY KEY ("id")
    );

    CREATE TABLE cards.users (
      id uuid NOT NULL default uuid_generate_v4(),
      name text,
      user uuid,
      card uuid,
      active boolaen default true
      PRIMARY KEY ("id")
    );
  `

  await client.query(query);
  await client.query(`INSERT INTO public.migrations (id) VALUES ('${index}');`);
  console.log`migration ${index} created`;
}
