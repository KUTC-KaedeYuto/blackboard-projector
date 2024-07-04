"use client"

import LabeledRange from "@/components/bootstrap_wrapper/LabeledRange";
import MyBall from "@/components/drei/MyBall";
import BaseSpace, { CameraSetter } from "@/components/top/BaseSpace";
import { Html, Grid, Box } from "@react-three/drei";
import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Vector3, Color } from "three";
import { toRadians } from "@/lib/mathutil";


export default function Page(){
    const y_ref = useRef();
    const deg_ref = useRef();
    const v_ref = useRef();
    const trail_ref = useRef();
    const [active, setActive] = useState(false);
    const [ballInfo, setBallInfo] = useState({
        position: new Vector3(0, 10, 0),
        velocity: new Vector3(15 * Math.cos(toRadians(45)), 15 * Math.sin(toRadians(45)), 0)
    });
    const [show_trail, setShowTrail] = useState(true);
    const [init, setInit] = useState(false);
    const [showGrid, setShowGrid] = useState(true);

    return (
        <BaseSpace>
            <CameraSetter camera_pos={new Vector3(10, 10, 40)} camera_lookAt={new Vector3(10, 10, 0)} />
            {
                showGrid && <Grid 
                    cellSize={2}
                    cellColor={new Color(0xfffffff)}
                    cellThickness={1}
                    rotation={[Math. PI / 2, 0, 0]}
                    position={[0, 0, 0]}
                    sectionSize={10}
                    sectionColor={new Color(0xfffffff)}
                    sectionThickness={1.5}
                    fadeDistance={10000}
                    infiniteGrid
            />
            }
            
            <MyBall 
                pos={ballInfo.position}
                velocity={ballInfo.velocity}
                radius={1}
                color="#f00"
                show_trail={show_trail}
                trail_cooltime={0.2}
                onChange={setBallInfo}
                active={active}
                init={{init, setInit}} />
            <Html 
                calculatePosition={() => [0, 150]} 
                style={{
                    width: "200px",  
                    background: "#fff"
                }} 
                zIndexRange={[999, 0]} 
                className="p-2"
            >
                <Form>
                    <Form.Group>
                        <Form.Label>初期位置-Y</Form.Label>
                        <LabeledRange min={5} max={100} step={1} defaultValue={10} ref={y_ref} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>角度</Form.Label>
                        <LabeledRange min={0} max={90} step={1} defaultValue={45} ref={deg_ref} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>初速度</Form.Label>
                        <LabeledRange min={5} max={20} step={1} defaultValue={15} ref={v_ref} />
                    </Form.Group>
                    <Form.Check ref={trail_ref} type="switch" label="軌跡を表示" defaultChecked />
                    <Form.Check type="switch"  label="XYグリッドを表示" defaultChecked onChange={(e) => {
                        setShowGrid(e.target.checked);
                    }}/>
                </Form>
                <Button variant="primary" onClick={() => {
                    let new_ballInfo = {
                        position: new Vector3(0, 0, 0),
                        velocity: new Vector3(0, 0, 0)
                    };

                    new_ballInfo.position.y = +y_ref.current.value;
                    const v_0 = +v_ref.current.value;
                    const theta = toRadians(+deg_ref.current.value);
                    new_ballInfo.velocity.x = v_0 * Math.cos(theta);
                    new_ballInfo.velocity.y = v_0 * Math.sin(theta);
                    setBallInfo(new_ballInfo);
                    setShowTrail(trail_ref.current.checked);
                    setInit(true);
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