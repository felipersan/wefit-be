class UserValidator {
  private setError(errors: Array<any>) {
    if (errors.length > 0) {
      throw {
        message: errors
      }
    }
  }

  validateForm ( announcement:any ){
    
  }
}

export default new UserValidator()
