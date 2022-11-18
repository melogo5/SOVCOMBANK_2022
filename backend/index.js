// Require the framework and instantiate it

// ESM
import Fastify from 'fastify'
const fastify = Fastify({
    logger: true
});

fastify.addHook("preHandler", async function (request, reply) {
    reply.headers({
        // "Cache-Control": "no-store",
        // Pragma: "no-cache",
        // "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*", // "http://localhost:3000/",
        "Content-Type": "application/json",
        // "Access-Control-Allow-Methods": "*",
        // "Access-Control-Allow-Headers": "*",
    });
    // next();
});

fastify.post('/api/login', async (request, reply) => {
    // console.log(request.body)
    // return request.body;
    // await reply.send({
    //     hello: 'world',
    //     // request: request.body
    // })
    return {
        "hello": "world"
    }
})

fastify.get('/', async (request, reply) => {
    return { hello: 'World' }
  })

// Run the server!
const start = async () => {
    try {
        await fastify.listen({
            port: 8080,
            host: "0.0.0.0"
        })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()