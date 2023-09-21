import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "react-query";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { globalToastOptions, theme } from "@/theme";

// To show toasts outside of react components (e.g. in react-query's global onError)
const { ToastContainer, toast } = createStandaloneToast({ theme });

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => {
      console.error("Failed query:", error);
      toast({
        ...globalToastOptions.defaultOptions,
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error has occurred",
        status: "error",
        isClosable: true,
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: error => {
      console.error("Failed mutation:", error);
      toast({
        ...globalToastOptions.defaultOptions,
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error has occurred",
        status: "error",
        isClosable: true,
      });
    },
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
