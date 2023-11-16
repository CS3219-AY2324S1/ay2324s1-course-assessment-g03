import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
  Query,
  QueryKey,
} from "@tanstack/react-query";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { globalToastOptions, theme } from "@/theme";
import "@fontsource-variable/inter";
import { Toast } from "./components/Toast/Toast.tsx";

// To show toasts outside of react components (e.g. in react-query's global onError)
const { ToastContainer, toast } = createStandaloneToast({ theme });

const errorHandler = ({
  error,
  query,
  type,
}: {
  error: unknown;
  query?: Query<unknown, unknown, unknown, QueryKey>;
  type?: string;
}) => {
  if (query?.meta?.skipGlobalErrorHandler) {
    return;
  }
  console.error(`Failed ${type}:`, error);
  toast({
    render: ({ onClose }) => (
      <Toast
        status="error"
        message={
          error instanceof Error
            ? error.message
            : "An unexpected error has occurred"
        }
        onClose={onClose}
      />
    ),
    ...globalToastOptions.defaultOptions,
  });
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => errorHandler({ error, query, type: "query" }),
  }),
  mutationCache: new MutationCache({
    onError: error => errorHandler({ error, type: "mutation" }),
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer />
    <ChakraProvider theme={theme} toastOptions={globalToastOptions}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
