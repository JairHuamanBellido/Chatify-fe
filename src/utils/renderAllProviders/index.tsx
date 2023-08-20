import GlobalProvider from "@/src/provider/GlobalProvider";
import { RenderResult, render } from "@testing-library/react";

export const renderAllProviders = (ui: React.ReactElement): RenderResult => {
  return render(ui, { wrapper: GlobalProvider });
};
