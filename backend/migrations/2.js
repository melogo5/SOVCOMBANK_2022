export default async function migration(client, index = 2) {
  const query = `
    INSERT INTO roles.list(id, name) VALUES('de2e0148-029b-4206-8676-eb764a24bcb8', 'person') returning (id);
    INSERT INTO roles.list(id, name) VALUES('de2e0148-029b-4206-8676-eb764a24bcb9', 'user') returning (id);
    INSERT INTO roles.list(id, name) VALUES('de2e0148-029b-4206-8676-eb764a24bcb0', 'admin') returning (id);
  `;

  await client.query(query);
  await client.query(`INSERT INTO public.migrations (id) VALUES ('${index}');`);
  console.log(`migration ${index} created`);
}
