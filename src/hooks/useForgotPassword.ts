import { atom, useAtom } from "jotai";

const forgotPasswordAtom = atom({
  email: "",
  step: 1,
});

export function useForgotPassword() {
  return useAtom(forgotPasswordAtom);
}
