import MyBall from "@/components/drei/projectile/MyBall";
import BaseSpace, { CameraSetter } from "@/components/drei/projectile/BaseSpace";
import { useContext } from "react";
import { ballColor, ballRadius, trailCooltime } from "../ballConfig";
import { DataContext } from "./page";
import { Vector3 } from "three";

export default function Bottom() {
    const data = useContext(DataContext);
    const active = data.active[0];
    const [ballInfo, setBallInfo] = data.ballInfo;
    const cameraPos = data.cameraPos[0];
    const [graphData, setGraphData] = data.graphData;
    const [init, setInit] = data.init;
    const showTrail = data.showTrail[0];
    const showGrid = data.showGrid[0];

    return (
        <BaseSpace showGrid={showGrid}>
            <CameraSetter camera_pos={cameraPos} camera_lookAt={new Vector3(0, cameraPos.y, 0)} />
            <MyBall
                pos={ballInfo.position}
                velocity={ballInfo.velocity}
                radius={ballRadius}
                color={ballColor}
                show_trail={showTrail}
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

        </BaseSpace>
    );
}