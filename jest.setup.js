import "@testing-library/jest-dom";
import React from "react";

jest.mock("@aws-amplify/ui-react", () => ({
  Authenticator: {
    Provider: ({ children }) => {
      return <>{children}</>;
    },
  },
  useAuthenticator: jest.fn(),
}));

jest.mock("@tanstack/react-query", (rest) => ({
  QueryClientProvider: ({ children }) => {
    return <>{children}</>;
  },
  QueryClient: jest.fn(),
  useMutation: jest.fn(),
  useQuery: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: jest.fn(),
}));
