export default async function migration(client, index = 6) {
  const query = `
    CREATE TABLE market.currency (
      id uuid NOT NULL default public.uuid_generate_v4(),
      name text,
      sign text,
      ticker text,
      country text,
      countryCode text,
      PRIMARY KEY ("id")
    );

    INSERT INTO market.currency(id, name, sign, ticker, country, countryCode) VALUES('ae2e0148-129b-4206-0001-eb764a24bcb8', 'Российский Рубль', '₽', 'RUB', 'Россия', 'RU') returning (id);
    INSERT INTO market.currency(id, name, sign, ticker, country, countryCode) VALUES('ae2e0148-129b-4206-0002-eb764a24bcb8', 'Тайский Бат', '฿', 'THB', 'Тайланд', 'TH') returning (id);
    INSERT INTO market.currency(id, name, sign, ticker, country, countryCode) VALUES('ae2e0148-129b-4206-0003-eb764a24bcb8', 'Вьетнамский донг', '₫', 'VND', 'Вьетнам', 'VN') returning (id);
    INSERT INTO market.currency(id, name, sign, ticker, country, countryCode) VALUES('ae2e0148-129b-4206-0004-eb764a24bcb8', 'Доллар США', '$', 'USD', 'США', 'US') returning (id);
    INSERT INTO market.currency(id, name, sign, ticker, country, countryCode) VALUES('ae2e0148-129b-4206-0005-eb764a24bcb8', 'Евро', '€', 'EUR', 'Европейский союз', 'EU') returning (id);

    ALTER TABLE market.list ADD COLUMN "currency" uuid;

    UPDATE market.list SET currency = 'ae2e0148-129b-4206-0002-eb764a24bcb8' where id = 'ae2e0148-129b-4206-8676-eb764a24bcb8';
    UPDATE market.list SET currency = 'ae2e0148-129b-4206-0003-eb764a24bcb8' where id = 'ae2e0148-229b-4206-8676-eb764a24bcb8';
    UPDATE market.list SET currency = 'ae2e0148-129b-4206-0005-eb764a24bcb8' where id = 'ae2e0148-429b-4206-8676-eb764a24bcb8';
    UPDATE market.list SET currency = 'ae2e0148-129b-4206-0004-eb764a24bcb8' where id = 'ae2e0148-329b-4206-8676-eb764a24bcb8';
  `;

  await client.query(query);
  await client.query(`INSERT INTO public.migrations (id) VALUES ('${index}');`);
  console.log(`migration ${index} created`);
}
