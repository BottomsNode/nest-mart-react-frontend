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
      {/* for tank-stack-query for caching data, fetching bg-data*/}
      <QueryClientProvider client={queryClient}>
        {/* for redux persisting the data */}
        <PersistGate loading={null} persistor={persistor}>
          {/* tooltip is used for the hover effect for chart used in admin dashboard*/}
          <Tooltip.Provider delayDuration={1000}>
            {/* main App Routes file */}
            <AppRoutes />
          </Tooltip.Provider>
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  );
};
