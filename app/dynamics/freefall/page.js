"use client"

import MyBall from "@/components/drei/MyBall";
import BaseSpace from "@/components/top/BaseSpace";

export default function Page(){
    return (
        <BaseSpace>
            <MyBall pos={{x: 0, y: 10, z: 0}} velocity={{x:0, y:0, z:0}} radius={1} color="#f00" trail_cooltime={0.2} onChange={() => {}}/>
            
        </BaseSpace>
    );
}