import LabeledRange from "@/components/bootstrap_wrapper/LabeledRange";
import { useContext, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Vector3 } from "three";
import { toRadians } from "@/lib/mathutil";
import Graph from "@/components/drei/projectile/Graph";
import { DataContext } from "./page";

export default function Top() {
    const y_ref = useRef();
    const deg_ref = useRef();
    const v_ref = useRef();
    const trail_ref = useRef();

    const data = useContext(DataContext);
    const [active, setActive] = data.active;
    const [ballInfo, setBallInfo] = data.ballInfo;
    const [graphType, setGraphType] = data.graphType;
    const [graphData, setGraphData] = data.graphData;
    const [cameraPos, setCameraPos] = data.cameraPos;
    const setInit = data.init[1];
    const setShowTrail = data.showTrail[1];
    const setShowGrid = data.showGrid[1];
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
        <>
            <div
                style={{
                    width: "200px",
                    background: "#fff",
                    display: "inline-block"
                }}
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
                    <Form.Check type="switch" label="XYグリッドを表示" onChange={(e) => {
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
            </div>
            {
                getGraph(graphType)
            }
        </>
    );
}