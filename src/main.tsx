import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TonConnectUIProvider, THEME } from "@tonconnect/ui-react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
// this manifest is used temporarily for development purposes

const manifestUrl =
  "https://twa-ton-bot-app.vercel.app/tonconnect-manifest.json";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider
    manifestUrl={manifestUrl}
    uiPreferences={{ theme: THEME.DARK }}
    actionsConfiguration={{
      twaReturnUrl: `https://t.me/ads_mebook_bot/start`,
    }}
  >
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </TonConnectUIProvider>
);
