export const getUser = async (pg, userId) => {
  const query = {
    name: 'users.find',
    text: "SELECT id, name, role FROM users.list WHERE list.id = $1",
    values: [userId],
  }
  // @ts-ignore
  const result = await pg.query(query);
  const user = result.rows[0];
  return user;
};

export const getBalance = async (pg, userId) => {
  // @ts-ignore
  const query = {
    name: 'users.balance.get',
    text: 'SELECT balance FROM users.list WHERE id = $1',
    values: [userId]
  }
  const result = await pg.query(query);
  const balance = result.rows[0].balance;
  return balance === null || balance === undefined ? 0 : balance;
};