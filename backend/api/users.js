import { getBalance } from '../service/user.js';

const root = "/api/users/";

const PERSON = "de2e0148-029b-4206-8676-eb764a24bcb8";
const USER = "de2e0148-029b-4206-8676-eb764a24bcb9";
const ADMIN = "de2e0148-029b-4206-8676-eb764a24bcb0";

/**
 * API USERS
 * @param {import('fastify').FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  fastify.post(root + "login", async (request, reply) => {
    // @ts-ignore
    const { login, password } = JSON.parse(request.body);

    const query = {
      name: 'users.login',
      text: "SELECT id, name, role, email, phone, balance FROM users.list WHERE list.name = $1 and list.password = $2",
      values: [login, password],
    }

    // @ts-ignore
    const result = await fastify.pg.query(query);
    const user = result.rows[0];

    if (!user?.id) {
      throw new Error('Пользователь не найден');
    } else {
      return {
        status: "success",
        id: user.id,
        name: user.name,
        user: user.role === USER,
        admin: user.role === ADMIN,
        email: user.email,
        phone: user.phone,
        balance: user.balance ?? 0
      };
    }

  });

  fastify.post(root + 'list', async (request, reply) => {
    const query = {
      name: 'users.list',
      text: "SELECT * FROM users.list"
    }

    // @ts-ignore
    const result = await fastify.pg.query(query);
    return { status: 'success', data: result.rows };
  });

  fastify.post(root + "register", async (request, reply) => {
    // @ts-ignore
    const { name, password, passwordConfirm } = JSON.parse(request.body);

    if (password !== passwordConfirm) {
      throw new Error("пароли не совпадают");
    }

    const query = {
      name: 'users.register',
      text: "INSERT INTO users.list(name, password, role) VALUES($1, $2, $3) RETURNING (id)",
      values: [name, password, PERSON],
    }

    // @ts-ignore
    const result = await fastify.pg.query(query);
    const id = result.rows[0].id;

    return { status: "success", id, name, user: true, admin: false };
  });

  fastify.post(root + "review", async (request, reply) => {
    // @ts-ignore
    const { id, type } = JSON.parse(request.body);
    let query;

    if (type === 'approve') {
      query = {
        name: 'users.approve',
        text: 'UPDATE users.list SET role = $2 WHERE id = $1',
        values: [id, USER]
      }
    } else {
      query = {
        name: 'users.decline',
        text: 'DELETE FROM users.list WHERE id = $1',
        values: [id]
      }
    }

    // @ts-ignore
    await fastify.pg.query(query);
    // return { status: 'success', data: result.rows};

    const list = {
      name: 'users.list',
      text: "SELECT * FROM users.list"
    }

    // @ts-ignore
    const result = await fastify.pg.query(list);
    return { status: 'success', data: result.rows };
  });

  fastify.post(root + "balanceGet", async (request, reply) => {
    // @ts-ignore
    const { userId } = JSON.parse(request.body);
    query = {
      name: 'users.balance.get',
      text: 'SELECT balance FROM users.list WHERE id = $1',
      values: [userId]
    }
    const balance = await getBalance(fastify.pg, userId);
    return { status: 'success', data: balance };
  });

  fastify.post(root + "balanceChange", async (request, reply) => {
    // @ts-ignore
    const { userId, delta } = JSON.parse(request.body);
    const balance = await getBalance(fastify.pg, userId);
    const newBalance = Number(balance) + Number(delta);
    const query = {
      name: 'users.balance.change',
      text: 'UPDATE users.list SET balance = $1 WHERE id = $2',
      values: [newBalance, userId]
    }
    console.log(newBalance, userId);
    const result = await fastify.pg.query(query);
    return { status: 'success', data: result.rows, balance: newBalance };
  });
}

export default routes;
