import userRepository from "../repositories/user.repositories";
import addressRepository from "../repositories/adress.repositories";
import { IFormData } from "../validators/user.validator";

class UserService {
  async registryUser(formData: IFormData) {

    const fieldsToAdressTable = ['postalCode', 'street', 'houseNumber', 'city', 'state', 'complement']

    const userFields = {...formData}
    const addressFields = {}


    for (let [key, value] of Object.entries(userFields)) {
      if (fieldsToAdressTable.includes(key)){
        addressFields[key] = value
        delete userFields[key]
      }
      if (!value){
        delete userFields[key]
      }
    }

    userRepository.create(userFields).then(({id})=>{
      addressRepository.create(addressFields, id)
    })
    
  }
}

export default new UserService();
