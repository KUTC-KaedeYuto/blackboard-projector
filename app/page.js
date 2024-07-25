'use client'

import { useContext } from "react";
import { ContextShowMenu } from "./layout";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ListGrop from "react-bootstrap/ListGroup";

export default function Home() {
  const { setShowMenu } = useContext(ContextShowMenu);
  return (
      <Container className="my-4">
        <h2>なんかタイトルっぽいやつ</h2>
        <div className="d-flex my-3">
          <Container>
            <h4>力学</h4>
            <ListGrop>
              <ListGrop.Item href="/projectile/freefall/" action >自由落下</ListGrop.Item>
              <ListGrop.Item href="/projectile/throwup/" action >鉛直投げ上げ</ListGrop.Item>
              <ListGrop.Item href="/projectile/horizontal/" action >水平投射</ListGrop.Item>
              <ListGrop.Item href="/projectile/oblique/" action >斜方投射</ListGrop.Item>
            </ListGrop>
          </Container>
          <Container>
            <h4>{"力学(その他)"}</h4>
            <ListGrop>
              <ListGrop.Item href="/projectile/monkeyhunting/" action >モンキーハンティング</ListGrop.Item>
            </ListGrop>
          </Container>
          <Container>
            <h4>運動量</h4>
            <ListGrop>
              <ListGrop.Item href="/momentum/test" action >てすと</ListGrop.Item>
            </ListGrop>
          </Container>
        </div>
        <Button variant="primary" onClick={() => setShowMenu(true)} >メニューを表示</Button>
      </Container>
  );
}
