'use client'


import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <title>
          ここにタイトルが入ります
        </title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
