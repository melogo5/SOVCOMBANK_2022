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
}
