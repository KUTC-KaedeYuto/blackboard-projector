'use client'
import Offcanvas from "react-bootstrap/Offcanvas";
import { useContext, useEffect } from "react";
import { ContextShowMenu } from "@/app/layout"
import { ListGroup } from "react-bootstrap";

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
            <ListGroup>
              <ListGroup.Item><a href="/">Home</a></ListGroup.Item>
              <ListGroup.Item><a href="/dynamics/freefall">自由落下</a></ListGroup.Item>
              
            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>
    </>
  );
}