import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import store from "@/redux/store";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={pageProps.session}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </SessionProvider>
      </QueryClientProvider>
    </Theme>
  );
}
