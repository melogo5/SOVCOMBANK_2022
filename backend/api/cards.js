const root = "/api/cards/";

/**
 * API CARDS
 * @param {import('fastify').FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  fastify.post(root + "append", async (request, reply) => {
    return { hello: 'world', api: "cards/append" }
  });

  fastify.post(root + "remove", async (request, reply) => {
    return { hello: 'world', api: "cards/remove" }
  });

  fastify.post(root + "list", async (request, reply) => {
    return { hello: 'world', api: "cards/list", description: "список привязанных карт пользователя" }
  });

  fastify.post(root + "select", async (request, reply) => {
    return { hello: 'world', api: "cards/select", description: "выбор карты для операции? мб не надо будет этот метод" }
  });
}

export default routes;
