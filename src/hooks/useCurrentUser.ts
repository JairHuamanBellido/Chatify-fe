import { atom, useAtom } from "jotai";

const configAtom = atom({ currentUserId: "", name: "", email: "" });

export default function useCurrentUser() {
  return useAtom(configAtom);
}
