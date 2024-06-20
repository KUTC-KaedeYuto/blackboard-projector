'use client'

import { useContext } from "react";
import { ContextShowMenu } from "./layout";
import { Button } from "react-bootstrap";

export default function Home() {
  const { setShowMenu } = useContext(ContextShowMenu);
  return (
      // <App />
      <>
        <Button variant="primary" onClick={() => setShowMenu(true)} >メニューを表示</Button>
      </>
  );
}
