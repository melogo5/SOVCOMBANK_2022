import { getMarket } from '../service/market.js';
import { getUser } from '../service/user.js';

const root = "/api/markets/";

const ACTIVE = 'ae2e0148-029b-4206-8676-eb764a24bcb8';
const HOLD = 'be2e0148-029b-4206-8676-eb764a24bcb8';
const CLOSED = 'ce2e0148-029b-4206-8676-eb764a24bcb8';

/**
 * API MARKET
 * @param {import('fastify').FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  fastify.post(root + "list", async (request, reply) => {
    const query = {
      name: 'market.list',
      text: "select * from market.list",
    }
    // @ts-ignore
    const result = await fastify.pg.query(query);
    return result.rows;
  });

  fastify.post(root + "get", async (request, reply) => {
    // @ts-ignore
    const { marketId } = JSON.parse(request.body);
    // @ts-ignore
    const market = await getMarket(fastify.pg, marketId);
    return market;
  });

  fastify.post(root + "currencyList", async (request, reply) => {
    const query = {
      name: 'market.currencyList',
      text: "SELECT * FROM market.currency",
    }
    // @ts-ignore
    const result = await fastify.pg.query(query);
    return { status: 'success', data: result.rows };
  });

  fastify.post("/api/submit/operation", async (request, reply) => {
    const { id } = JSON.parse(request.body);
    console.log(id)
    const query = {
      name: 'market.orders.delete',
      text: "DELETE FROM market.orders WHERE id = $1",
      values: [id]
    };
    const result = await fastify.pg.query(query);
    return { status: 'success', data: result.rows };
  });

  fastify.post(root + "orders", async (request, reply) => {
    // @ts-ignore
    const { marketId, userId } = JSON.parse(request.body);

    const query = {
      name: 'market.orders',
      text: `select market.orders.id, market.orders.name, market.orders.type, market.orders.created, market.orders.secondamount, market.orders.amount, market.orders.rate from market.orders, market.users WHERE market.orders.market = $1 and market.users.seller != $2 and market.orders.status = '${ACTIVE}' GROUP BY market.orders.id`,
      values: [marketId, userId],
    };
    // @ts-ignore
    const result = await fastify.pg.query(query);
    const orders = result.rows;

    // @ts-ignore
    const market = await getMarket(fastify.pg, marketId);
    return orders.map(order => ({ ...order, currency: market.currency }));
  });

  fastify.post(root + "create", async (request, reply) => {
    // @ts-ignore
    const { userId, marketId, type, amount, rate, name } = JSON.parse(request.body);
    console.log({ userId, marketId, type, amount, rate, name });

    // @ts-ignore
    const user = await getUser(fastify.pg, userId);
    if (!user?.id) {
      throw new Error('Пользователь не найден');
    }

    const description = name || type === "buy" ? "Покупка" : "Продажа";
    const createOrderQuery = {
      name: 'market.create-order',
      text: "INSERT INTO market.orders(name, type, market, amount, rate) VALUES($1, $2, $3, $4, $5) RETURNING (id)",
      values: [description, type, marketId, amount, rate]
    };

    // @ts-ignore
    const createResult = await fastify.pg.query(createOrderQuery);
    const newOrderId = createResult.rows[0].id;

    const linkOrderToUserQuery = {
      name: 'market.order-link',
      text: 'INSERT INTO market.users("order", seller) VALUES($1, $2) RETURNING id',
      values: [newOrderId, userId]
    }

    // @ts-ignore
    await fastify.pg.query(linkOrderToUserQuery);
    return { order: newOrderId, status: "success" };
  });
}

export default routes;
