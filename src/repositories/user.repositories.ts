import { prisma } from "../services/prisma.service";

class Lead {
  async create(data: any) {
    const newUser = prisma.user.create({data})
    return newUser
  }

  async findAll() {
    const listLead = await prisma.user.findMany();
    return listLead;
  }
}

export default new Lead();
