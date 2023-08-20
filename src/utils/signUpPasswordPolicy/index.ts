import PasswordValidator from "password-validator";

const signUpPasswordPolicy = new PasswordValidator();

signUpPasswordPolicy.is().min(8);
signUpPasswordPolicy.is().lowercase();
signUpPasswordPolicy.is().uppercase();
signUpPasswordPolicy.is().symbols();
signUpPasswordPolicy.is().digits(1);

export { signUpPasswordPolicy };
