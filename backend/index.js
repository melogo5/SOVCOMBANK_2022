import Fastify from 'fastify';
import fastifyPostgres from '@fastify/postgres';
import config from './config.js';

// БД
import migrations from "./migrations/index.js";

import users from './api/users.js';
import cards from './api/cards.js';

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({});

fastify.addHook("preHandler", async (request, reply) => {
  reply.headers({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  });
});

fastify.register(fastifyPostgres, config.database)

fastify.register(users);
fastify.register(cards);

const start = async () => {
  try {
    await fastify.ready();
    const client = await fastify.pg.connect();
    await migrations(client);

    await fastify.listen(config.backend);
  } catch (err) {
    // fastify.log.error(err);
    console.error(err);
    process.exit(1)
  }
}
start();
