
const DataStore = require('../data/dataStore');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

const dataStore = new DataStore()

const txnCommands = {
  async createTxn(data) {
    try {
      return await prisma.$transaction(async (prisma) => {
        const actor = await prisma.user.update({
          data: {
            balance: {
              increment: data.amount
            },
          },
          where: {
            id: data.actorUuid
          }
        });
        if (actor && actor.balance < 0) {
          throw new Error("Insufficient Balance")
        }
        const newTxn = await prisma.transaction.create({ data })
        return { data: newTxn, error: null }
      })
    } catch (e) {
      console.log({ e });
      return { data, error: "Insufficient Balance" };
    }
  },
  // updateUser(data) {
  //   dataStore.update('user', data).then(data => {
  //     console.log({ data });
  //   })
  // }
}

module.exports = txnCommands