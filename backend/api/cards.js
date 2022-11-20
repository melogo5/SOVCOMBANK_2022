import {getUser} from '../service/user.js';

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

    const user = await getUser(fastify.pg, userId);
    if (!user?.id) {
      throw new Error('Пользователь не найден');
    }
    const appendCard = async () => {
      const createCardQuery = {
        name: 'cards.append',
        text: "INSERT INTO cards.list(cardNumber, cardHolder, cardExpireDate, cardSecret) VALUES($1, $2, $3, $4) RETURNING (id)",
        values: [cardNumber, holderName, validThru, CVC]
      }

      // @ts-ignore
      const createResult = await fastify.pg.query(createCardQuery);
      const newCardId = createResult.rows[0].id;

      const linkCardToUserQuery = {
        name: 'cards.link',
        text: 'INSERT INTO cards.users(name, "user", card, active) VALUES($1, $2, $3, $4) RETURNING id, name, "user", card, active',
        values: [user.name, user.id, newCardId, true]
      }

      // @ts-ignore
      const linkResult = await fastify.pg.query(linkCardToUserQuery);
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
    // @ts-ignore
    const { userId } = JSON.parse(request.body);
    const query = {
      name: 'cards.list',
      text: "SELECT cards.list.id, cards.list.cardholder, cards.list.cardnumber, cards.list.cardexpiredate FROM cards.list, cards.users WHERE cards.users.user = $1 GROUP BY cards.list.id",
      values: [userId],
    }
    // @ts-ignore
    const result = await fastify.pg.query(query);
    return result.rows.map((row) => {
      return {
        ...row,
        cardHolder: row.cardholder,
        cardExpireDate: row.cardexpiredate,
        cardNumber: row.cardnumber
      }
    });
  });

  fastify.post(root + "select", async (request, reply) => {
    // @ts-ignore
    const { userId, cardId } = JSON.parse(request.body);

    const deactivateUserCardsQuery = {
      name: 'card.deactivate',
      text: 'UPDATE cards.users SET active = $1 WHERE user = $2',
      values: [false, userId]
    };
    // @ts-ignore
    await fastify.pg.query(deactivateUserCardsQuery);
    const setActiveQuery = {
      name: 'card.select',
      text: 'UPDATE cards.users SET active = $1 WHERE user = $2 AND card = $3',
      values: [true, userId, cardId]
    };
    // @ts-ignore
    await fastify.pg.query(setActiveQuery);
    const getSelectedCardQuery = {
      name: 'card.get',
      text: 'SELECT cards.list.id, cards.list.cardholder, cards.list.cardnumber, cards.list.cardexpiredate FROM cards.list WHERE cards.list.id = $1',
      values: [cardId]
    };
    // @ts-ignore
    const getCardResult = await fastify.pg.query(getSelectedCardQuery);
    const card = getCardResult.rows[0];
    return {
      status: 'success',
      card: {
        ...card,
        cardHolder: card.cardholder,
        cardExpireDate: card.cardexpiredate,
        cardNumber: card.cardnumber
      }
    };
  });
}

export default routes;
