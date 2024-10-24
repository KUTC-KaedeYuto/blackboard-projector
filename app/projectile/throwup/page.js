"use client"

import MyBall from "@/components/drei/projectile/MyBall";
import BaseSpace, { CameraSetter } from "@/components/drei/projectile/BaseSpace";
import { Html } from "@react-three/drei";
import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Vector3 } from "three";
import LabeledRange from "@/components/bootstrap_wrapper/LabeledRange";
import Graph from "@/components/drei/projectile/Graph";
import { ballColor, ballRadius, trailCooltime } from "../ballConfig";

export default function Page() {
    const y_ref = useRef();
    const vy_ref = useRef();
    const trail_ref = useRef();
    const [active, setActive] = useState(false);
    const [ballInfo, setBallInfo] = useState({
        position: new Vector3(0, 10, 0),
        velocity: new Vector3(0, 10, 0)
    });
    const [cameraPos, setCameraPos] = useState({
        x: 0,
        y: 5,
        z: 20
    });
    const [init, setInit] = useState(false);
    const [show_trail, setShowTrail] = useState(true);
    const [showGrid, setShowGrid] = useState(false);
    const [graphType, setGraphType] = useState(0);
    const [graphData, setGraphData] = useState([]);
    const [graphArg, setGraphArg] = useState({});

    const getGraph = (type) => {
        const h = graphArg.y;
        const v0 = graphArg.vy;
        const g = 9.8;
        const vmax = Math.sqrt(Math.pow(v0, 2) + 2 * g * h);

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
        <BaseSpace showGrid={showGrid}>
            <CameraSetter camera_pos={cameraPos} camera_lookAt={new Vector3(cameraPos.x, cameraPos.y, 0)} />
            <MyBall
                pos={ballInfo.position}
                velocity={ballInfo.velocity}
                radius={ballRadius}
                color={ballColor}
                show_trail={show_trail}
                trail_cooltime={trailCooltime}
                onChange={setBallInfo}
                active={active}
                init={{ init, setInit }}
                renderGraph={true}
                updateGraph={(t, info) => {
                    setGraphData([...graphData, {
                        t,
                        data: info
                    }]);
                }}
            />
            <Html calculatePosition={() => [0, 150]} style={{ width: "200px", background: "#fff" }} zIndexRange={[999, 0]} className="p-2" >
                <Form>
                    <Form.Label>初期位置-Y</Form.Label>
                    <LabeledRange min={5} max={100} step={1} defaultValue={10} ref={y_ref} />
                    <Form.Label>初期速度-Y</Form.Label>
                    <LabeledRange min={5} max={30} step={1} defaultValue={10} ref={vy_ref} />
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
                    <Form.Check type="switch" label="XYグリッドを表示" onChange={(e) => {
                        setShowGrid(e.target.checked);
                    }} />
                </Form>
                <Button variant="primary" onClick={() => {
                    let new_ballInfo = { ...ballInfo };
                    let p = ballInfo.position, v = ballInfo.velocity;
                    new_ballInfo.position = new Vector3(p.x, +y_ref.current.value, p.z);
                    new_ballInfo.velocity = new Vector3(v.x, +vy_ref.current.value, v.z);
                    setBallInfo(new_ballInfo);
                    setShowTrail(trail_ref.current.checked);
                    setInit(true);
                    setGraphData([]);
                    const yMax = +y_ref.current.value + 0.5 * Math.pow(+vy_ref.current.value, 2) / 9.8;
                    setCameraPos({
                        x: 0,
                        y: yMax / 2,
                        z: yMax * 1.5
                    });
                    setGraphArg({
                        y: +y_ref.current.value,
                        vy: +vy_ref.current.value
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