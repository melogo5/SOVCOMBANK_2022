export default async function migration(client, index = 3) {
  const query = `
    CREATE SCHEMA "market";

    CREATE TABLE market.status (
      id uuid NOT NULL default public.uuid_generate_v4(),
      name text,
      PRIMARY KEY ("id")
    );

    INSERT INTO market.status(id, name) VALUES('ae2e0148-029b-4206-8676-eb764a24bcb8', 'active') returning (id);
    INSERT INTO market.status(id, name) VALUES('be2e0148-029b-4206-8676-eb764a24bcb8', 'hold') returning (id);
    INSERT INTO market.status(id, name) VALUES('ce2e0148-029b-4206-8676-eb764a24bcb8', 'closed') returning (id);

    CREATE TABLE market.orders (
      id uuid NOT NULL default public.uuid_generate_v4(),
      name text,
      type text,
      created timestamp(0) NOT NULL DEFAULT now(),
      status uuid default 'ae2e0148-029b-4206-8676-eb764a24bcb8',
      PRIMARY KEY ("id")
    );

    CREATE TABLE market.users (
      id uuid NOT NULL default public.uuid_generate_v4(),
      "order" uuid NOT NULL,
      updated timestamp(0) NOT NULL DEFAULT now(),
      seller uuid NOT NULL,
      buyer uuid,
      PRIMARY KEY ("id")
    );

    ALTER TABLE users.list ADD COLUMN "email" text, ADD COLUMN "phone" text;
  `;

  await client.query(query);
  await client.query(`INSERT INTO public.migrations (id) VALUES ('${index}');`);
  console.log(`migration ${index} created`);
}
