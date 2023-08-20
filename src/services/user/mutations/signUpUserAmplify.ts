import { ISignUpUser } from "@/src/interfaces/ISignUpUser";
import { Auth } from "aws-amplify";

export default async function signUpUserAmplify({
  email,
  name,
  password,
}: ISignUpUser) {
  return await Auth.signUp({
    password: password,
    username: email,
    attributes: {
      name,
    },
  });
}
