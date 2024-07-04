"use client"

import MyBall from "@/components/drei/MyBall";
import BaseSpace from "@/components/top/BaseSpace";
import { Html } from "@react-three/drei";
import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Vector3 } from "three";
import LabeledRange from "@/components/bootstrap_wrapper/LabeledRange";

export default function Page() {
  const y_ref = useRef();
  const vy_ref = useRef();
  const [active, setActive] = useState(false);
  const [ballInfo, setBallInfo] = useState({
    position: new Vector3(0, 10, 0),
    velocity: new Vector3(0, 10, 0)
  });
  const [init, setInit] = useState(false);

  return (
    <BaseSpace>
      <MyBall
        pos={ballInfo.position}
        velocity={ballInfo.velocity}
        radius={1}
        color="#f00"
        show_trail
        trail_cooltime={0.2}
        onChange={setBallInfo}
        active={active}
        init={{init, setInit}} />
      <Html calculatePosition={() => [0, 150]} style={{ width: "200px", height: "300px", background: "#fff" }} zIndexRange={[999, 0]} >
        <Form>
          <Form.Label>初期位置-Y</Form.Label>
          <LabeledRange min={5} max={100} step={1} defaultValue={10} ref={y_ref} />
          <Form.Label>初期速度-Y</Form.Label>
          <LabeledRange min={5} max={30} step={1} defaultValue={10} ref={vy_ref} />
        </Form>
        <Button variant="primary" onClick={() => {
          let new_ballInfo = { ...ballInfo };
          // new_ballInfo.position.y = +y_ref.current.value;
          // new_ballInfo.velocity.y = +vy_ref.current.value;
          let p = ballInfo.position, v = ballInfo.velocity;
          new_ballInfo.position = new Vector3(p.x, +y_ref.current.value, p.z);
          new_ballInfo.velocity = new Vector3(v.x, +vy_ref.current.value, v.z);
          setBallInfo(new_ballInfo);
          setInit(true);
        }}>適用</Button>
        <Button variant="primary" onClick={(e) => {
          setActive(!active);
          if (e.target.innerHTML === "再生") e.target.innerHTML = "一時停止";
          else e.target.innerHTML = "再生";
        }}>再生</Button>
      </Html>
    </BaseSpace>
  );
}