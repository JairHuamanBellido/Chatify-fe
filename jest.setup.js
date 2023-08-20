import "@testing-library/jest-dom";
import React from "react";

jest.mock("@aws-amplify/ui-react", () => ({
  Authenticator: {
    Provider: ({ children }) => {
      return <>{children}</>;
    },
  },
}));

jest.mock("@tanstack/react-query", (rest) => ({
  QueryClientProvider: ({ children }) => {
    return <>{children}</>;
  },
  QueryClient: jest.fn(),
  useMutation: jest.fn()
}));
