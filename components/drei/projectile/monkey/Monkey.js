import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { Box, Html } from "@react-three/drei";


const G = -9.80;

export default function Monkey({ pos, onChange, graphUpdateTime, renderGraph = false, updateGraph = () => { }, active = true, init = { init: false, setInit: () => { } }, hit=false }) {
    const ref = useRef();
    const time = useRef(0);
    const graph_cooltime = useRef(0);
    const velocity = useRef(new Vector3());

    useEffect(() => {
        time.current = 0;
        velocity.current = new Vector3();
    }, [init.init]);

    useFrame((state, delta) => {
        if (!(active && delta < 0.1 && ref.current.position.y >= 0)) return;

        velocity.current.y += G * delta;
        let self = ref.current;
        const v = velocity.current
        self.position.x += v.x * delta;
        self.position.y += v.y * delta;
        self.position.z += v.z * delta;

        const _v = new Vector3(v.x, v.y, v.z);

        if (renderGraph && graph_cooltime.current >= graphUpdateTime) {
            updateGraph(time.current, {
                position: self.position.clone(),
                velocity: _v
            });
            graph_cooltime.current -= graphUpdateTime;
        }
        time.current += delta;
        graph_cooltime.current += delta;
        onChange({
            position: self.position,
            velocity: _v
        });
    });

    const innerText = "サル";
    return (
        <>
            <Html
                position={[pos.x, pos.y, pos.z]}
                style={{
                    color: hit ? "#f00" : "#fff",
                    width: "max-content",
                    fontSize: "250%",
                    marginLeft: `-${innerText.length / 2}em`,
                    marginTop: "-2.5em",
                    textAlign:"center"
                }}
            >
                {
                    innerText
                }
            </Html>
            <Box position={[pos.x, pos.y, pos.z]} castShadow ref={ref} args={[5, 5, 5]}>
                <meshPhysicalMaterial color={0x91531d} metalness={0.5} roughness={0} />
            </Box>
        </>
    );
}