"use client"

import Bullet from "@/components/drei/projectile/monkey/Bullet";
import BaseSpace, { CameraSetter } from "@/components/drei/projectile/BaseSpace";
import { Html, Grid } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Vector3, Color } from "three";
import Graph from "@/components/drei/projectile/Graph";
import Monkey from "@/components/drei/projectile/monkey/Monkey";
import LabeledRange from "@/components/bootstrap_wrapper/LabeledRange";
import { ballColor, ballRadius, trailCooltime } from "../../ballConfig";

const initialMonkeyPos = new Vector3(80, 50, 0);

export default function Page() {
    const _theta = Math.atan(5/8);
    const v_ref = useRef();
    const trail_ref = useRef();
    const [active, setActive] = useState(false);
    const [bulletInfo, setBulletInfo] = useState({
        position: new Vector3(),
        velocity: new Vector3(Math.cos(_theta), Math.sin(_theta), 0).multiplyScalar(50)
    });
    const [monkeyInfo, setMonkeyInfo] = useState({
        position: initialMonkeyPos.clone(),
        velocity: new Vector3()
    });
    const [cameraPos, setCameraPos] = useState({
        x: monkeyInfo.position.x / 2,
        y: monkeyInfo.position.y / 2,
        z: monkeyInfo.position.y * 1.75
    });
    const [graphType, setGraphType] = useState(0);
    const [init, setInit] = useState(false);
    const [show_trail, setShowTrail] = useState(true);
    const [showGrid, setShowGrid] = useState(true);
    const [graphData, setGraphData] = useState([]);
    const [hit, setHit] = useState(false);

    const getGraph = (type) => {
        switch (type) {
            case 0:
                return (<Graph position={{ x: 0, y: 630 }} title="y-tグラフ" size={{ width: 250, height: 250 }} data={{
                    x: graphData.map((d) => d.t),
                    y: graphData.map((d) => d.data.position.y),
                    x_range: {
                        min: 0,
                        max: 30
                    },
                    y_range: {
                        min: 0,
                        max: cameraPos.y * 4
                    }
                }} drawLine />);
            case 1:
                return (<Graph position={{ x: 0, y: 630 }} title="Vy-tグラフ" size={{ width: 250, height: 250 }} data={{
                    x: graphData.map((d) => d.t),
                    y: graphData.map((d) => d.data.velocity.y),
                    x_range: {
                        min: 0,
                        max: 30
                    },
                    y_range: {
                        min: -10 * Math.sqrt(10 * cameraPos.y * 4) / 7,
                        max: 10 * Math.sqrt(10 * cameraPos.y * 4) / 7
                    }
                }} drawLine />);
            default:
                return null;
        }
    }

    useEffect(() => {
        if(hit) return;
        const a = new Vector3().copy(bulletInfo.position);
        a.sub(monkeyInfo.position);
        setHit(a.length() <= 1);
    }, [monkeyInfo, bulletInfo]);

    return (
        <BaseSpace>
            <CameraSetter camera_pos={cameraPos} camera_lookAt={new Vector3(cameraPos.x, cameraPos.y, 0)} />
            {
                showGrid && <Grid
                    cellSize={2}
                    cellColor={new Color(0xfffffff)}
                    cellThickness={1}
                    rotation={[Math.PI / 2, 0, 0]}
                    position={[0, 0, 0]}
                    sectionSize={10}
                    sectionColor={new Color(0xfffffff)}
                    sectionThickness={1.5}
                    fadeDistance={10000}
                    infiniteGrid
                />
            }
            <Bullet
                pos={bulletInfo.position}
                velocity={bulletInfo.velocity}
                radius={ballRadius}
                color={ballColor}
                show_trail={show_trail}
                trail_cooltime={trailCooltime}
                onChange={setBulletInfo}
                renderGraph={true}
                updateGraph={(t, info) => {
                    setGraphData([...graphData, {
                        t,
                        data: info
                    }]);
                }}
                active={active}
                init={{ init, setInit }} />
            <Monkey pos={monkeyInfo.position} onChange={setMonkeyInfo} active={active} init={{init, setInit}} hit={hit} />
            <Html
                calculatePosition={() => [0, 150]}
                style={{ width: "200px", background: "#fff" }}
                zIndexRange={[999, 0]}
                className="p-2"
            >
                <Form>
                    <Form.Group>
                        <Form.Label>初期速度</Form.Label>
                        <LabeledRange min={30} max={150} step={1} defaultValue={50} ref={v_ref} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>グラフタイプ</Form.Label>
                        <Form.Select onChange={(e) => {
                            setGraphType(+e.target.value);
                        }}>
                            <option value={-1}>なし</option>
                            <option value={0}>y-t</option>
                            <option value={1}>Vy-t</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Check ref={trail_ref} type="switch" label="軌跡を表示" defaultChecked />
                    <Form.Check type="switch" label="XYグリッドを表示" defaultChecked onChange={(e) => {
                        setShowGrid(e.target.checked);
                    }} />
                </Form>
                <Button variant="primary" onClick={() => {
                    setShowTrail(trail_ref.current.checked);
                    setInit(true);
                    setGraphData([]);
                    setMonkeyInfo({
                        position: initialMonkeyPos.clone(),
                        velocity: new Vector3()
                    });
                    const v0 = +v_ref.current.value;
                    const theta = Math.atan(initialMonkeyPos.y / initialMonkeyPos.x);
                    setBulletInfo({
                        position: new Vector3(),
                        velocity: new Vector3(Math.cos(theta), Math.sin(theta), 0).multiplyScalar(v0)
                    });
                    setHit(false);
                }}>適用</Button>
                <Button variant="primary" onClick={(e) => {
                    setActive(!active);
                    if (e.target.innerHTML === "再生") e.target.innerHTML = "一時停止";
                    else e.target.innerHTML = "再生";
                }}>再生</Button>
            </Html>
            {
                getGraph(graphType)
            }

        </BaseSpace>
    );
}