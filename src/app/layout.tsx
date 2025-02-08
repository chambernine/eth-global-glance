import PrivyClientProvider from "@/providers/privy-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <PrivyClientProvider>
            {children}
            <Toaster />
          </PrivyClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
