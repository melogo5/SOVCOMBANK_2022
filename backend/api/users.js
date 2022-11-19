const root = "/api/users/";

/**
 * API USERS
 * @param {import('fastify').FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes (fastify, options) {
  fastify.post(root + "login", async (request, reply) => {
    return { hello: 'world', api: "users/login" }
  });

  fastify.post(root + "register", async (request, reply) => {
    return { hello: 'world', api: "users/register" }
  });

  fastify.post(root + "review", async (request, reply) => {
    return { hello: 'world', api: "users/review", type: "admin", actions: "approve, decline" }
  });
}

export default routes;
