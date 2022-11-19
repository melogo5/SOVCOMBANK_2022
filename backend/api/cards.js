const root = "/api/cards/";

/**
 * API CARDS
 * @param {import('fastify').FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  fastify.post(root + "append", async (request, reply) => {
    // @ts-ignore
    const { cardNumber, holderName, validThru, CVC, userId } = JSON.parse(request.body);
    let errorMsg;
    if (CVC?.length !== 3) {
      errorMsg = 'Неверный CVC';
    } else if (holderName?.trim().split(' ').length !== 2) {
      errorMsg = 'Неверное имя держателя';
    } else if (validThru?.split(' / ').length !== 2) {
      errorMsg = 'Неверный срок действия';
    } else if (cardNumber?.split(' ').join('').length !== 16) {
      errorMsg = 'Неверный номер карты';
    }
    if (errorMsg) {
      throw new Error(errorMsg);
    }

    const getUser = async () => {
      const query = {
        name: 'users.find',
        text: "SELECT id, name, role FROM users.list WHERE list.id = $1",
        values: [userId],
      }
      // @ts-ignore
      const result = await fastify.pg.query(query);
      const user = result.rows[0];
      return user;
    }

    const user = await getUser();
    if (!user?.id) {
      throw new Error('Пользователь не найден');
    }
    const appendCard = async () => {
      const createCardQuery = {
        name: 'cards.append',
        text: "INSERT INTO cards.list(cardNumber, cardHolder, cardExpireDate, cardSecret) VALUES($1, $2, $3, $4) RETURNING (id)",
        values: [cardNumber, holderName, validThru, CVC]
      }
      const createResult = await fastify.pg.query(createCardQuery);
      const newCardId = createResult.rows[0].id;

      const linkCardToUserQuery = {
        name: 'cards.link',
        text: 'INSERT INTO cards.users(name, "user", card, active) VALUES($1, $2, $3, $4) RETURNING id, name, "user", card, active',
        values: [user.name, user.id, newCardId, true]
      }
      const linkResult = await fastify.pg.query(linkCardToUserQuery);
      console.log(linkResult);
      const newLinkedCard = linkResult.rows[0];
      return newLinkedCard;
    }
    const card = await appendCard();
    return {
      status: "success",
      result: { card }
    };
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
