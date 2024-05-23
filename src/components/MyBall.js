import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Vector3 } from "three";
import TrailObjects from './TrailObjects';

const G = -9.80;
const speed = 1 / 10;
const e = 0.8;

export default function MyBall({pos, velocity, radius, color, onChange, trail_cooltime}){
    let vy = useRef(velocity.y); 
    const [update, setUpdate] = useState(true);
    const [trails, setTrails] = useState([]);
    const ref = useRef();
    const time = useRef(0);
    useFrame((state, delta) => {
        if(velocity.y != undefined){
            // setUpdate(true);
            // setTrails([]);
            console.log(velocity.y);
            vy.current = velocity.y;
            velocity.y = undefined;
        }
        if (!(update && delta < 0.1)) return 
        vy.current += G * delta;
        let self = ref.current;
        self.position.x += velocity.x * delta;
        self.position.y += vy.current * delta;
        self.position.z += velocity.z * delta;
        
        if(self.position.y < radius) {
            vy.current = -vy.current * e;
            self.position.y = radius;
            if(vy.current < radius * 0.5) setUpdate(false);
            
        
        }
        if(time.current >= trail_cooltime){
            setTrails([...trails, ref.current.position.clone()]);
            time.current -= trail_cooltime;
        }
        time.current += delta;
        onChange({
            position: self.position,
            velocity: new Vector3(velocity.x, vy.current, velocity.z)
        });
    });
    return (
        <>
        <mesh position={[pos.x, pos.y, pos.z]} castShadow ref={ref}>
            <sphereGeometry args={[radius, 32, 32]} />
            <meshStandardMaterial color={color} metalness={0.5} roughness={0.0} />
        </mesh>
        <TrailObjects radius={radius} color={color} pos={trails} />
        </>
    );
}