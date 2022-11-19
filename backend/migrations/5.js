export default async function migration(client, index = 5) {
  const query = `
    ALTER TABLE market.orders ADD COLUMN "market" uuid NOT NULL, ADD COLUMN "amount" int, ADD COLUMN "rate" int;
  `;

  await client.query(query);
  await client.query(`INSERT INTO public.migrations (id) VALUES ('${index}');`);
  console.log(`migration ${index} created`);
}
