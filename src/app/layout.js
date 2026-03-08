import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lokeshwar V | Data Engineer",
  description:
    "Data Engineer portfolio featuring ETL systems, AI retrieval agents, Milvus vector search, and Azure cloud automation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
