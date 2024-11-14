"use client"

import { createContext, useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import Top from "./top";
import Bottom from "./bottom";
import PageDivider from "../../../../components/PageDivider";

const initialMonkeyPos = new Vector3(80, 50, 0);
export const DataContext = createContext(null);

export default function Page() {
    const _theta = Math.atan(5/8);
    const [active, setActive] = useState(false);
    const [bulletInfo, setBulletInfo] = useState({
        position: new Vector3(),
        velocity: new Vector3(Math.cos(_theta), Math.sin(_theta), 0).multiplyScalar(50)
    });
    const [monkeyInfo, setMonkeyInfo] = useState({
        position: initialMonkeyPos.clone(),
        velocity: new Vector3()
    });
    const [cameraPos, setCameraPos] = useState({
        x: monkeyInfo.position.x / 2,
        y: monkeyInfo.position.y / 2,
        z: monkeyInfo.position.y * 1.75
    });
    const [graphType, setGraphType] = useState(0);
    const [init, setInit] = useState(false);
    const [showTrail, setShowTrail] = useState(true);
    const [showGrid, setShowGrid] = useState(false);
    const [graphData, setGraphData] = useState([]);
    const [hit, setHit] = useState(false);

    return (
        <DataContext.Provider value={{
            cameraPos: [cameraPos, setCameraPos],
            graphType: [graphType, setGraphType],
            graphData: [graphData, setGraphData],
            init: [init, setInit],
            showTrail: [showTrail, setShowTrail],
            showGrid: [showGrid, setShowGrid],
            active: [active, setActive],
            bulletInfo: [bulletInfo, setBulletInfo],
            monkeyInfo: [monkeyInfo, setMonkeyInfo],
            hit: [hit, setHit],
            initialMonkeyPos: initialMonkeyPos
        }} >
            <PageDivider top={<Top />} bottom={<Bottom />} />
        </DataContext.Provider>
    );
}