export default async function migration(client, index = 7) {
  const query = `
    ALTER TABLE "market"."orders" ALTER COLUMN "rate" TYPE float USING "rate"::float;
  `;

  await client.query(query);
  await client.query(`INSERT INTO public.migrations (id) VALUES ('${index}');`);
  console.log(`migration ${index} created`);
}
