import MyBall from "@/components/drei/projectile/MyBall";
import { useContext } from "react";
import BaseSpace, { CameraSetter } from "@/components/drei/projectile/BaseSpace";
import { Vector3 } from "three";
import { ballColor, ballRadius, trailCooltime } from "../ballConfig";
import { DataContext } from "./page";

export default function Bottom() {
    const data = useContext(DataContext)
    const active = data.active[0];
    const [ballInfo, setBallInfo] = data.ballInfo;
    const cameraPos = data.cameraPos[0];
    const [init, setInit] = data.init;
    const show_trail= data.showTrail[0];
    const showGrid = data.showGrid[0];
    const [graphData, setGraphData] = data.graphData;

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
                renderGraph={true}
                updateGraph={(t, info) => {
                    setGraphData([...graphData, {
                        t,
                        data: info
                    }]);
                }}
                active={active}
                init={{ init, setInit }}
            />
        </BaseSpace>
    );
}