import "react-phone-number-input/style.css";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Facets",
  description: "Dig deep into connections"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <link rel="icon" href="dist/images/favicon.png" sizes="any" />
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
