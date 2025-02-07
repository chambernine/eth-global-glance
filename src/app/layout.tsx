import PrivyClientProvider from "@/providers/privy-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PrivyClientProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </PrivyClientProvider>
      </body>
    </html>
  );
}
