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
      text: "SELECT id, name, role FROM users.list WHERE list.name = $1 and list.password = $2",
      values: [login, password],
    }

    // @ts-ignore
    const result = await fastify.pg.query(query);
    const user = result.rows[0];

    if (!user?.id) {
      throw new Error('Пользователь не найден');
    } else {
      return { status: "success", id: user.id, name: user.name, user: user.role === USER, admin: user.role === ADMIN };
    }

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

    return { status: "success", id, name, user: false, admin: false };
  });

  fastify.post(root + "review", async (request, reply) => {
    return { hello: 'world', api: "users/review", type: "admin", actions: "approve, decline" }
  });
}

export default routes;
