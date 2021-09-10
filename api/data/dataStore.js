const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class DataStore {
  async create(model, data) {
    try {
      const item = await prisma[model].create({
        data
      });
      return { data: item, error: null };
    } catch (error) {
      console.log({ error });
      return { data: null, error }
    }
  }
  async createMany(model, data) {
    try {
      const created = await prisma[model].createMany({ data });
      return { data: created, error: null };
    } catch (error) {
      console.log({ error });
      return { data: null, error };
    }
  }
  async update(model, data) {
    try {
      const { id } = data;
      delete data.id;
      const item = await prisma[model].update({
        where: {
          id,
        },
        data
      })
      return { data: item, error: null };
    } catch (error) {
      console.log({ error });
      return { data: null, error }
    }
  }
  async delete(model, data) {
    try {
      const { id } = data;
      const item = await prisma[model].delete({
        where: {
          id
        }
      })
      return { data: item, error: null };
    } catch (error) {
      console.log({ error });
      return { data: null, error }
    }
  }
  async findUnique(model, key, value) {
    const where = {};
    where[key] = value;
    // console.log({ where });
    try {
      const item = await prisma[model].findUnique({
        where
      })
      if (!item) {
        return { data: item, error: "Not found" }
      }
      return { data: item, error: null };
    } catch (error) {
      console.log({ error });
      return { data: null, error }
    }
  }
  async getAll(model) {
    try {
      const items = await prisma[model].findMany()
      return { data: items, error: null };
    } catch (error) {
      console.log({ error });
      return { data: null, error }
    }
  }
}

module.exports = DataStore;