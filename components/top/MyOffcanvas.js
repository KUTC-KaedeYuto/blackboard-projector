'use client'
import Offcanvas from "react-bootstrap/Offcanvas";
import { useContext, useEffect } from "react";
import { ContextShowMenu } from "@/app/layout"

export default function MyOffcanvas() {
  const {showMenu, setShowMenu} = useContext(ContextShowMenu);

  const handleClose = () => setShowMenu(false);

  return (
    <>
        <Offcanvas show={showMenu} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>
    </>
  );
}