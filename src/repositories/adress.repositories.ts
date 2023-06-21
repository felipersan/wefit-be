import { prisma } from "../services/prisma.service";

class Adress {
  async create(data: any, userId: number) {
    const Adress = prisma.adress.create({
      data: {
        city: data.city,
        complement: data.complement ?? null,
        houseNumber: parseInt(data.houseNumber),
        postalCode: data.postalCode,
        state: data.state,
        street: data.street,
        userId: userId,
      },
    });
    return Adress;
  }
}

export default new Adress();
