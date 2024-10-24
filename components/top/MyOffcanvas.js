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
              <ListGroup.Item href="./" action>Home</ListGroup.Item>
              <ListGroup.Item href="./projectile/freefall" action>自由落下</ListGroup.Item>
              <ListGroup.Item href="./projectile/throwup" action>鉛直投げ上げ</ListGroup.Item>
              <ListGroup.Item href="./projectile/horizontal" action>水平投射</ListGroup.Item>
              <ListGroup.Item href="./projectile/oblique" action>斜方投射</ListGroup.Item>
              <ListGroup.Item href="./projectile/monkeyhunting" action>モンキーハンティング</ListGroup.Item>
            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>
    </>
  );
}