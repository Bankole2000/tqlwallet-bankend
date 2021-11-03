const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const txnCommands = {
  async createTxn(data) {
    try {
      return await prisma.$transaction(async (prismaInstance) => {
        const actor = await prismaInstance.user.update({
          data: {
            balance: {
              increment: data.amount,
            },
          },
          where: {
            id: data.actorUuid,
          },
        });
        if (actor && actor.balance < 0) {
          throw new Error('Insufficient Balance');
        }
        const newTxn = await prismaInstance.transaction.create({ data });
        return { data: newTxn, error: null };
      });
    } catch (e) {
      console.log({ e });
      return { data, error: 'Insufficient Balance' };
    }
  },
};

module.exports = txnCommands;
