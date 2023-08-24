import { atom, useAtom } from "jotai";

const configAtom = atom({ currentUserId: "" });

export default function useCurrentUser() {
  return useAtom(configAtom);
}
