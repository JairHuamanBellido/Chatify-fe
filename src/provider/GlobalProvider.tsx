import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Authenticator } from "@aws-amplify/ui-react";

const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}
export default function GlobalProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <Authenticator.Provider>{children}</Authenticator.Provider>
    </QueryClientProvider>
  );
}
