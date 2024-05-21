import "@mantine/core/styles.css";

import { MantineProvider, createTheme, virtualColor } from "@mantine/core";
import type { AppProps } from "next/app";

const theme = createTheme({});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Component {...pageProps} />
    </MantineProvider>
  );
}
