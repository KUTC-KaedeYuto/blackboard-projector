"use client"

import MyBall from "@/components/drei/projectile/MyBall";
import BaseSpace, { CameraSetter } from "@/components/drei/projectile/BaseSpace";
import { Html, Grid } from "@react-three/drei";
import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Vector3, Color } from "three";
import LabeledRange from "@/components/bootstrap_wrapper/LabeledRange";

export default function Page() {
    const y_ref = useRef();
    const vx_ref = useRef();
    const trail_ref = useRef();
    const [active, setActive] = useState(false);
    const [ballInfo, setBallInfo] = useState({
        position: new Vector3(0, 10, 0),
        velocity: new Vector3(15, 0, 0)
    });
    const [cameraPos, setCameraPos] = useState({
        x: 10,
        y: 10,
        z: 20
    });
    const [graphType, setGraphType] = useState(0);
    const [init, setInit] = useState(false);
    const [show_trail, setShowTrail] = useState(true);
    const [showGrid, setShowGrid] = useState(true);
    const [graphData, setGraphData] = useState([]);

    const getGraph = (type) => {
        switch(type){
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

    return (
        <BaseSpace>
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
            <CameraSetter
                camera_pos={cameraPos}
                camera_lookAt={new Vector3(cameraPos.x, cameraPos.y, 0)}
            />
            <MyBall
                pos={ballInfo.position}
                velocity={ballInfo.velocity}
                radius={1}
                color="#f00"
                show_trail={show_trail}
                trail_cooltime={0.2}
                onChange={setBallInfo}
                renderGraph={true}
                updateGraph={(t, info) => {
                    setGraphData([...graphData, {
                        t,
                        data: info
                    }]);
                }}
                active={active}
                init={{ init, setInit }} />
            <Html
                calculatePosition={() => [0, 150]}
                style={{ width: "200px", background: "#fff" }}
                zIndexRange={[999, 0]}
                className="p-2"
            >
                <Form>
                    <Form.Group>
                        <Form.Label>初期位置-Y</Form.Label>
                        <LabeledRange min={5} max={100} step={1} defaultValue={10} ref={y_ref} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>初期速度-X</Form.Label>
                        <LabeledRange min={5} max={20} step={1} defaultValue={10} ref={vx_ref} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>グラフタイプ</Form.Label>
                        <Form.Select onChange={(e) => {
                            setGraphType(+e.target.value);
                        }}>
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
                    const new_pos = new Vector3(0, 0, 0);
                    const new_vel = new Vector3(0, 0, 0);
                    new_pos.y = +y_ref.current.value;
                    new_vel.x = +vx_ref.current.value;
                    setBallInfo({
                        position: new_pos,
                        velocity: new_vel
                    });
                    setShowTrail(trail_ref.current.checked);
                    setInit(true);
                    setGraphData([]);
                    setCameraPos({
                        x: 0,
                        y: +y_ref.current.value / 4,
                        z: +y_ref.current.value * 2
                    });
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

