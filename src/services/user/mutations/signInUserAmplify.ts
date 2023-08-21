import { ISignInUser } from "@/src/interfaces/ISignInUser";
import { Auth } from "aws-amplify";

export default async function signInUserAmplify({
  email,
  password,
}: ISignInUser) {
  return await Auth.signIn({
    username: email,
    password,
  });
}
