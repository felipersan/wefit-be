import { prisma } from "../services/prisma.service";

class Lead {
  async create(data: any) {
    const newLead = prisma.user.create({data})
    return newLead
  }

  async findAll() {
    const listLead = await prisma.user.findMany();
    return listLead;
  }
}

export default new Lead();
