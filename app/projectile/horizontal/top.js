import { useContext, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { Vector3 } from "three";
import LabeledRange from "@/components/bootstrap_wrapper/LabeledRange";
import Graph from "@/components/Graph";
import { DataContext } from "./page";
import FloatingWindow from "@/components/FloatingWindow";
import { ShowUIContext } from "../layout";

export default function Top() {

    const y_ref = useRef();
    const vx_ref = useRef();
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
    const { showGraph } = useContext(ShowUIContext);

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

    return (
        <div>
            <FloatingWindow initialPos={{ x: 10, y: 40 }} >
                <div
                    style={{ width: "200px", background: "#fff", display: "inline-block" }}
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
                        <Form.Check type="switch" label="XYグリッドを表示" onChange={(e) => {
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
                </div>
            </FloatingWindow>
            {
                showGraph && <FloatingWindow initialPos={{ x: 220, y: 40 }} >
                    {
                        getGraph(graphType)
                    }
                </FloatingWindow>
            }
        </div>
    );
}