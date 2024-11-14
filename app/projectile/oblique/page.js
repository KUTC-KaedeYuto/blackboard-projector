"use client"

import { createContext, useRef, useState } from "react";
import { Vector3 } from "three";
import { toRadians } from "@/lib/mathutil";
import PageDivider from "../../../components/PageDivider";
import Top from "./top";
import Bottom from "./bottom";

export const DataContext = createContext(null);

export default function Page() {
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
    const [showTrail, setShowTrail] = useState(true);
    const [init, setInit] = useState(false);
    const [showGrid, setShowGrid] = useState(false);
    const [graphData, setGraphData] = useState([]);

    
    return (
        <DataContext.Provider value={{
            cameraPos: [cameraPos, setCameraPos],
            graphType: [graphType, setGraphType],
            graphData: [graphData, setGraphData],
            init: [init, setInit],
            showTrail: [showTrail, setShowTrail],
            showGrid: [showGrid, setShowGrid],
            active: [active, setActive],
            ballInfo: [ballInfo, setBallInfo]
        }} >
            <PageDivider top={<Top />} bottom={<Bottom />} />
        </DataContext.Provider>
    );
    
}