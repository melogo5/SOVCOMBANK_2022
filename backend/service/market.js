export const CURRENCY = {
  RUB: 'ae2e0148-129b-4206-0001-eb764a24bcb8',
  THB: 'ae2e0148-129b-4206-0002-eb764a24bcb8',
  VND: 'ae2e0148-129b-4206-0003-eb764a24bcb8',
  USD: 'ae2e0148-129b-4206-0004-eb764a24bcb8',
  EUR: 'ae2e0148-129b-4206-0005-eb764a24bcb8'
};

export const getCurrency = async (pg, currencyId) => {
  const query = {
    name: 'market.currency',
    text: "SELECT * FROM market.currency WHERE currency.id = $1",
    values: [currencyId],
  }
  // @ts-ignore
  const result = await pg.query(query);
  const currency = result.rows[0];
  return currency;
}

export const getMarket = async (pg, marketId) => {
  const query = {
    name: 'market.get',
    text: "SELECT id, name, currency FROM market.list WHERE list.id = $1",
    values: [marketId],
  }

  // @ts-ignore
  const result = await pg.query(query);
  const market = result.rows[0];

  const RUB = await getCurrency(pg, CURRENCY.RUB);
  const TMP = await getCurrency(pg, market.currency);

  return { ...market, currency: [RUB, TMP] };
}
