"use client"

import BaseSpace from "@/components/drei/momentum/BaseSpace";
import BoxObject from "@/components/drei/momentum/BoxObject";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Vector2, Vector3 } from "three";

export default function Page(){
    

    return (
        <BaseSpace>
            <Inner />
        </BaseSpace>
    );
}

function Inner(){
    return (<>
        <BoxObject position={new Vector3(1, 1, 0)} size={new Vector2(1, 1)} color={`#f00`} />
    </>);
}