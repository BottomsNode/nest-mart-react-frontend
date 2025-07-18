import { type FC } from "react";
import { AppRoutes } from "./routes";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
import * as Tooltip from "@radix-ui/react-tooltip";


const queryClient = new QueryClient();

export const App: FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={null} persistor={persistor}>
          <Tooltip.Provider delayDuration={1000}>
            <AppRoutes />
          </Tooltip.Provider>
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  );
};
