'use client'


import { Inter } from "next/font/google";
import "./globals.scss";
import { useState, createContext } from "react";
import MyOffcanvas from "@/components/top/MyOffcanvas";


const inter = Inter({ subsets: ["latin"] });

export const ContextShowMenu = createContext(null);


export default function RootLayout({ children }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <html lang="ja">
      <head>
        <title>
          ここにタイトルが入ります
        </title>
      </head>
      <body className={inter.className}>
        <ContextShowMenu.Provider value={{showMenu, setShowMenu}}>
          <MyOffcanvas />
          {children}
          
        </ContextShowMenu.Provider>
      </body>
    </html>
  );
}



