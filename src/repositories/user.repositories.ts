import { prisma } from "../services/prisma.service";
import { IFormData } from "../validators/user.validator";

class User {
  async create(data) {

    const newUser = await prisma.user.create({
      data: {
        responsiblePersonCpf: data?.responsiblePersonCpf ?? null,
        phone: data?.phone,
        cellPhone: data.cellPhone,
        email: data?.email,
        name: data?.name,
        cnpj: data?.cnpj ?? null,
        cpf: data?.cpf ?? null,
        }
    });

   return newUser
  }
}

export default new User();
