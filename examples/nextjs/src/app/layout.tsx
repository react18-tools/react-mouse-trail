import "./styles.css";
import "react18-loaders/dist/index.css";
import { Core } from "nextjs-darkmode";
import { Layout } from "@repo/shared/dist/server";
import { GlobalLoader, Header } from "@repo/shared";
import { Inter } from "next/font/google";
import Link from "next/link";
import { MouseTrail } from "react-mouse-trail";

const inter = Inter({ subsets: ["latin"] });

/** Root layout. */
export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Core />
        <Layout>
          <Header linkComponent={Link} />
          {children}
        </Layout>
        <GlobalLoader />
        <MouseTrail rgb={[0, 1, 0]} />
      </body>
    </html>
  );
}
