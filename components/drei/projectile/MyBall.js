import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import TrailObjects from './TrailObjects';
import { Sphere } from "@react-three/drei";


const G = -9.80;
const e = 1;

export default function MyBall({ pos, velocity, radius, color, onChange, show_trail = false, trail_cooltime = 0.2, renderGraph = false, updateGraph = () => { }, active = true, init = { init: false, setInit: () => { } } }) {
    const vy = useRef(velocity.y);
    // const [update, setUpdate] = useState(active);
    const [trails, setTrails] = useState([]);

    const ref = useRef();
    const time = useRef(0);
    const trail_time = useRef(0);

    useEffect(() => {
        vy.current = velocity.y;
        // setUpdate(active);
        // active = true;
    }, [pos, velocity]);

    useEffect(() => {
    }, [init.init]);

    useFrame((state, delta) => {
        // if (!(update && delta < 0.1)) return;
        if (!(active && delta < 0.1)) return;
        if(init.init){
            vy.current = velocity.y;
            console.log(velocity.y);
            setTrails([]);
            time.current = 0;
            init.setInit(false);
        }

        vy.current += G * delta;
        let self = ref.current;
        self.position.x += velocity.x * delta;
        self.position.y += vy.current * delta;
        self.position.z += velocity.z * delta;

        if(self.position.y < radius) {
            // vy.current = -vy.current * e;
            self.position.y = radius;
            // if(vy.current < radius * 0.5) setUpdate(false);


        }
        if (trail_time.current >= trail_cooltime) {
            if (show_trail) setTrails([...trails, ref.current.position.clone()]);
            if (renderGraph) updateGraph(time.current, {
                position: self.position.clone(),
                velocity: new Vector3(velocity.x, vy.current, velocity.z)
            });
            trail_time.current -= trail_cooltime;
        }
        time.current += delta;
        trail_time.current += delta;
        onChange({
            position: self.position,
            velocity: new Vector3(velocity.x, vy.current, velocity.z)
        });
    });
    return (
        <>
            <Sphere position={[pos.x, pos.y, pos.z]} castShadow ref={ref} args={[radius, 32, 32]}>
                <meshPhysicalMaterial color={color} metalness={0} roughness={0.2} />
            </Sphere>
            <TrailObjects radius={radius} color={color} pos={trails} />
        </>
    );
}