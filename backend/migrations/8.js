export default async function migration(client, index = 8) {
    const query = `
      ALTER TABLE market.orders ADD COLUMN "currency" uuid, ADD COLUMN "secondamount" int;
    `;
  
    await client.query(query);
    await client.query(`INSERT INTO public.migrations (id) VALUES ('${index}');`);
    console.log(`migration ${index} created`);
  }
  