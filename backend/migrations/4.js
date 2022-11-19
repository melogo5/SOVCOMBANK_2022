export default async function migration(client, index = 4) {
  const query = `
    CREATE TABLE market.list (
      id uuid NOT NULL default public.uuid_generate_v4(),
      name text,
      PRIMARY KEY ("id")
    );

    INSERT INTO market.list(id, name) VALUES('ae2e0148-129b-4206-8676-eb764a24bcb8', 'RUB / THB') returning (id);
    INSERT INTO market.list(id, name) VALUES('ae2e0148-229b-4206-8676-eb764a24bcb8', 'RUB / VND') returning (id);
    INSERT INTO market.list(id, name) VALUES('ae2e0148-329b-4206-8676-eb764a24bcb8', 'RUB / EUR') returning (id);
    INSERT INTO market.list(id, name) VALUES('ae2e0148-429b-4206-8676-eb764a24bcb8', 'RUB / USD') returning (id);
  `;

  await client.query(query);
  await client.query(`INSERT INTO public.migrations (id) VALUES ('${index}');`);
  console.log(`migration ${index} created`);
}
