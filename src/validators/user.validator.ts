import * as yup from "yup";
import { prisma } from "../services/prisma.service";

export interface IFormData {
  cnpj?: string;
  cpf?: string;
  responsiblePersonCpf?: string;
  name: string;
  cellPhone: string;
  phone: string;
  email: string;
  postalCode: string;
  street: string;
  houseNumber: number;
  complement: string;
  city: string;
  state: string;
}

class UserValidator {
  private cellPhoneRegex: RegExp;
  private phoneRegex: RegExp;
  private emailRegex: RegExp;
  private postalCodeRegex: RegExp;

  private validateSchemaForm: any;

  constructor() {
    this.cellPhoneRegex = /^\([1-9]{2}\) (?:9\d|[2-9])\d{3}\-\d{4}$/;
    this.phoneRegex = /^\([1-9]{2}\) [2-9]\d{3}\-\d{4}$/;
    this.emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    this.postalCodeRegex = /^\d{5}-\d{3}$/;

    this.validateSchemaForm = yup.object().shape({
      name: yup
        .string()
        .strict(true)
        .typeError("name must be a string")
        .required("name must be required")
        .min(3, "name must have at least 3 characters"),

      cpf: yup
        .string()
        .strict(true)
        .typeError("cpf must be a string")
        .test(
          "is-cpf-required",
          "cpf must be required when cnpj is empty",
          function (value) {
            const cnpj = this.resolve(yup.ref("cnpj"));
            if (!cnpj && !value) {
              return this.createError({
                message: "cpf must be required when cnpj is empty",
              });
            } else if (cnpj && value) {
              return this.createError({
                message: `cannot have cpf and cnpj at the same time`,
              });
            }
            return true;
          }
        )
        .test("is-cpf-valid", "invalid cpf format", async function (value) {
          if (!value) {
            return true;
          }

          const existingUser = await prisma.user.findFirst({
            where: {
              cpf: value,
            },
          });
          if (existingUser) {
            return this.createError({
              message: "CPF already in use",
            });
          }

          const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
          return cpfRegex.test(value);
        }),

      cnpj: yup
        .string()
        .strict(true)
        .typeError("cnpj must be a string")
        .test(
          "is-cnpj-required",
          "cnpj must be required when cpf is empty",
          function (value) {
            const cpf = this.resolve(yup.ref("cpf"));
            if (!cpf && !value) {
              return this.createError({
                message: "cnpj must be required when cpf is empty",
              });
            }
            return true;
          }
        )
        .test("is-cnpj-valid", "invalid cnpj format", async function (value) {
          if (!value) {
            return true;
          }

          const existingUser = await prisma.user.findFirst({
            where: {
              cnpj: value,
            },
          });
          if (existingUser) {
            return this.createError({
              message: "CNPJ already in use",
            });
          }

          const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
          return cnpjRegex.test(value);
        }),

      responsiblePersonCpf: yup
        .string()
        .strict(true)
        .typeError("responsible person cpf must be a string")
        .test(
          "is-cpf-responsible-required",
          "cpf responsible must be required when have cnpj",
          function (value) {
            const cnpj = this.resolve(yup.ref("cnpj"));
            if (cnpj && !value) {
              return this.createError({
                message: "cpf responsible must be required when have cnpj",
              });
            } else if (!cnpj && value) {
              return this.createError({
                message:
                  "responsible person cpf is only necessary if there is a cnpj",
              });
            }
            return true;
          }
        )
        .test(
          "is-cpf-responsible-valid",
          "invalid preson responsible cpf format",
          async function (value) {
            if (!value) {
              return true;
            }

            const existingUser = await prisma.user.findFirst({
              where: {
                responsiblePersonCpf: value,
              },
            });
            if (existingUser) {
              return this.createError({
                message: "CPF already in use",
              });
            }

            const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
            return cpfRegex.test(value);
          }
        ),

      cellPhone: yup
        .string()
        .strict(true)
        .typeError("cellPhone must be a string")
        .required("cellPhone must be required")
        .matches(this.cellPhoneRegex, "Invalid cellPhone format"),

      phone: yup
        .string()
        .strict(true)
        .typeError("phone must be a string")
        .required("phone must be required")
        .matches(this.phoneRegex, "Invalid landing phone format"),

      email: yup
        .string()
        .strict(true)
        .typeError("email must be a string")
        .required("email must be required")
        .matches(this.emailRegex, "invalid email format"),

      postalCode: yup
        .string()
        .strict(true)
        .typeError("postal code must be a string")
        .required("cep must be required")
        .matches(this.postalCodeRegex, "invalid CEP format"),

      street: yup
        .string()
        .strict(true)
        .typeError("street must be a string")
        .required("street must be required")
        .min(3, "street must have at least 3 char"),

      houseNumber: yup
        .number()
        .strict(true)
        .typeError("house number must be a number")
        .required("house number must be required")
        .positive("house number must be positive")
        .integer("house number must be integer"),

      complement: yup
        .string()
        .min(3, "complement must have at least 3 char")
        .strict(true)
        .typeError("complement must be a string"),

      city: yup
        .string()
        .strict(true)
        .typeError("city must be a string")
        .min(3, "city must have at least 3 char")
        .required("city must be required"),

      state: yup
        .string()
        .strict(true)
        .typeError("state must be a string")
        .required("state must be required"),
    });
  }

  async validateForm(formData: IFormData): Promise<void> {
    try {
      await this.validateSchemaForm.validate(formData, { abortEarly: false });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = error.errors;
        throw errors;
      } else {
        throw "Unknown error occurred";
      }
    }
  }
}

export default new UserValidator();
