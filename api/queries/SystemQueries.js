const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const systemQueries = {
  async getArchivedEvents(from) {
    try {
      const result = await prisma.event.findMany({
        where: {
          timestamp: {
            gte: new Date(from),
          },
        },
      });
      return { data: result, error: null };
    } catch (error) {
      console.log({ error });
      return { data: null, error };
    }
  },
};

module.exports = systemQueries;
