import * as yup from "yup";

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

type ConditionalSchema<T> = {
  is: (value: any, context: any) => boolean;
  then: yup.Schema<T>;
  otherwise: yup.Schema<T>;
};

class UserValidator {
  private cnpjRegex: RegExp;
  private cpfRegex: RegExp;
  private validateSchemaForm: any;

  constructor() {
    this.cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    this.cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    this.validateSchemaForm = yup.object().shape({
      name: yup
        .string()
        .required("name must be required")
        .min(3, "name must have at least 3 characters"),

      cnpj: yup.string().matches(this.cnpjRegex, "invalid cnpj format"),
      cpf: yup
        .string()
        .matches(this.cpfRegex, "invalid cpf format")
        .test(
          "is-cpf-required",
          "CPF é obrigatório quando CNPJ está vazio",
          function (value, ctx) {
            const cnpj = this.resolve(yup.ref("cnpj"));
            ctx.createError({ message: 'SKU missing correct prefix' })
          }
        ),
      responsiblePersonCpf: yup
        .string()
        .matches(this.cpfRegex, "invalid cpf format"),
    });
  }

  async validateForm(formData: IFormData): Promise<void> {
    try {
      await this.validateSchemaForm.validate(formData, {abortEarly:false});
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = error.errors;
        throw errors;
      } else {
        throw 'Unknown error occurred';
      }
    }
  }
}

export default new UserValidator();
