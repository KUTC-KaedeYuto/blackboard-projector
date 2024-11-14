import Bullet from "@/components/drei/projectile/monkey/Bullet";
import BaseSpace, { CameraSetter } from "@/components/drei/projectile/BaseSpace";
import { useContext, useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import Monkey from "@/components/drei/projectile/monkey/Monkey";
import { ballColor, ballRadius, trailCooltime } from "../../ballConfig";
import { DataContext } from "./page";


export default function Bottom() {
    const data = useContext(DataContext)
    const active = data.active[0];
    const [bulletInfo, setBulletInfo] = data.bulletInfo;
    const [monkeyInfo, setMonkeyInfo] = data.monkeyInfo;
    const cameraPos = data.cameraPos[0];
    const [init, setInit] = data.init;
    const showTrail = data.showTrail;
    const showGrid = data.showGrid;
    const [graphData, setGraphData] = data.graphData;
    const [hit, setHit] = data.hit;

    return (
        <BaseSpace showGrid={showGrid}>
            <CameraSetter camera_pos={cameraPos} camera_lookAt={new Vector3(cameraPos.x, cameraPos.y, 0)} />
            <Bullet
                pos={bulletInfo.position}
                velocity={bulletInfo.velocity}
                radius={ballRadius}
                color={ballColor}
                showTrail={showTrail}
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

        </BaseSpace>
    );
}