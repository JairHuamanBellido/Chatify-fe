import { useAtom } from "jotai";
import { ApplicationTheme } from "../themes";
import { atomWithStorage } from "jotai/utils";

type Config = {
  theme: ApplicationTheme;
};
const configAtom = atomWithStorage<Config>("theme-config", {
  theme: "default",
});

export function useTheme() {
  return useAtom(configAtom);
}
