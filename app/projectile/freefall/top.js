import Graph from "@/components/Graph";
import LabeledRange from "@/components/bootstrap_wrapper/LabeledRange";
import { useContext, useRef } from "react";
import { DataContext } from "./page";
import { Button, Form } from "react-bootstrap";
import { Vector3 } from "three";
import FloatingWindow from "@/components/FloatingWindow";
import { ShowUIContext } from "../layout";
import ApplyButton from "../../../components/top/ApplyButton";
import PlayButton from "../../../components/top/PlayButton";

export default function Top() {
    const y_ref = useRef();
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
    const { showGraph } = useContext(ShowUIContext)

    const getGraph = (type) => {
        switch (type) {
            case 0:
                return (<Graph title="y-tグラフ" size={{ width: 250, height: 250 }} data={{
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
                return (<Graph title="Vy-tグラフ" size={{ width: 250, height: 250 }} data={{
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
                            <Form.Label>グラフタイプ</Form.Label>
                            <Form.Select onChange={(e) => {
                                setGraphType(+e.target.value);
                            }}>
                                <option value={0}>y-t</option>
                                <option value={1}>Vy-t</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Check ref={trail_ref} type="switch" label="軌跡を表示" defaultChecked onChange={() => {
                            setShowTrail(false);
                        }} />
                        <Form.Check type="switch" label="XYグリッドを表示" onChange={(e) => {
                            setShowGrid(e.target.checked);
                        }} />
                    </Form>
                    <ApplyButton onClick={() => {
                        let new_ballInfo = {
                            position: new Vector3(0, +y_ref.current.value, 0),
                            velocity: new Vector3(0, 0, 0)
                        };
                        setBallInfo(new_ballInfo);
                        setShowTrail(trail_ref.current.checked);
                        setInit(true);
                        setGraphData([]);
                        setCameraPos({
                            x: 0,
                            y: +y_ref.current.value / 4,
                            z: +y_ref.current.value * 2
                        });
                    }} />
                    <PlayButton onClick={() => {
                        setActive(!active);
                    }} />
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