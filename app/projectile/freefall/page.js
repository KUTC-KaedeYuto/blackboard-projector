"use client"

import MyBall from "@/components/drei/MyBall";
import BaseSpace from "@/components/top/BaseSpace";
import { Html } from "@react-three/drei";
import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Vector3 } from "three";

export default function Page(){
    const y_ref = useRef();
    const [active, setActive] = useState(false);
    const [ballInfo, setBallInfo] = useState({
        position: new Vector3(0, 10, 0),
        velocity: new Vector3(0, 0, 0)
    });
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
                active={active} />
            <Html calculatePosition={() => [0, 150]} style={{width: "200px", height: "300px"}} zIndexRange={[999, 0]} >
                <Form>
                    <Form.Label>初期位置-Y</Form.Label>
                    <Form.Range min={5} max={100} step={1} defaultValue={10} ref={y_ref} />
                </Form>
                <Button variant="primary" onClick={() => {
                    let new_ballInfo = {...ballInfo};
                    new_ballInfo.position.y = +y_ref.current.value;
                    setBallInfo(new_ballInfo);
                }}>適用</Button>
                <Button variant="primary" onClick={(e) => {
                    setActive(!active);
                    if(e.target.innerHTML === "再生") e.target.innerHTML = "一時停止";
                    else e.target.innerHTML = "再生";
                }}>再生</Button>
            </Html>
        </BaseSpace>
    );
}