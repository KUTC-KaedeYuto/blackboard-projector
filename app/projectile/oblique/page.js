"use client"

import LabeledRange from "@/components/bootstrap_wrapper/LabeledRange";
import MyBall from "@/components/drei/projectile/MyBall";
import BaseSpace, { CameraSetter } from "@/components/drei/projectile/BaseSpace";
import { Html, Grid } from "@react-three/drei";
import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Vector3, Color } from "three";
import { toRadians } from "@/lib/mathutil";
import Graph from "@/components/drei/projectile/Graph";
import { ballColor, ballRadius, trailCooltime } from "../ballConfig";

export default function Page() {
    const y_ref = useRef();
    const deg_ref = useRef();
    const v_ref = useRef();
    const trail_ref = useRef();
    const [active, setActive] = useState(false);
    const [ballInfo, setBallInfo] = useState({
        position: new Vector3(0, 10, 0),
        velocity: new Vector3(15 * Math.cos(toRadians(45)), 15 * Math.sin(toRadians(45)), 0)
    });
    const [cameraPos, setCameraPos] = useState({
        x: 10,
        y: 10,
        z: 40
    });
    const [graphType, setGraphType] = useState(0);
    const [show_trail, setShowTrail] = useState(true);
    const [init, setInit] = useState(false);
    const [showGrid, setShowGrid] = useState(true);
    const [graphData, setGraphData] = useState([]);
    const [graphArg, setGraphArg] = useState({});

    const getGraph = (type) => {
        const h = graphArg.y;
        const v0 = graphArg.vy;
        const g = 9.8;
        const vmax = Math.sqrt(Math.pow(v0, 2) + 2 * g * h);

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
                        max: h + 0.5 * Math.pow(v0, 2) / g
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
                        min: -vmax,
                        max: vmax
                    }
                }} drawLine />);
            default:
                return null;
        }
    }

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

            <MyBall
                pos={ballInfo.position}
                velocity={ballInfo.velocity}
                radius={ballRadius}
                color={ballColor}
                show_trail={show_trail}
                trail_cooltime={trailCooltime}
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
                    setGraphData([]);
                    const yMax = +y_ref.current.value + 0.5 * Math.pow(v_0 * Math.sin(theta), 2) / 9.8;
                    setCameraPos({
                        x: 10,
                        y: yMax / 2,
                        z: yMax * 1.5
                    });
                    setGraphArg({
                        y: +y_ref.current.value,
                        vy: v_0 * Math.sin(theta)
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