import { useContext, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Vector3 } from "three";
import Graph from "@/components/drei/projectile/Graph";
import LabeledRange from "@/components/bootstrap_wrapper/LabeledRange";
import { DataContext } from "./page";

export default function Top() {
    const _theta = Math.atan(5/8);
    const v_ref = useRef();
    const trail_ref = useRef();

    const data = useContext(DataContext);
    const [active, setActive] = data.active;
    const [bulletInfo, setBulletInfo] = data.bulletInfo;
    const [monkeyInfo, setMonkeyInfo] = data.monkeyInfo;
    const [cameraPos, setCameraPos] = data.cameraPos;
    const [graphType, setGraphType] = data.graphType;
    const setInit = data.init[1];
    const setShowTrail = data.showTrail[1];
    const setShowGrid = data.showGrid[1];
    const [graphData, setGraphData] = data.graphData;
    const [hit, setHit] = data.hit;
    const initialMonkeyPos = data.initialMonkeyPos;

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
                <Form.Check type="switch" label="XYグリッドを表示" onChange={(e) => {
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
          </div>
          {
              getGraph(graphType)
          }
        </>
    );
}