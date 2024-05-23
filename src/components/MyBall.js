import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Vector3 } from "three";

const G = -9.80;
const speed = 1 / 10;
const e = 0.8;

export default function MyBall({pos, velocity, radius, color, onChange}){
    let vy = useRef(velocity.y); 
    const [update, setUpdate] = useState(true);
    const ref = useRef();
    useFrame((state, delta) => {
        if(velocity.y != 0){
            vy.current = velocity.y;
            velocity.y = 0;
        }
        if (!(update && delta < 0.1)) return 
        vy.current += G * delta;
        let self = ref.current;
        self.position.x += velocity.x * delta;
        self.position.y += vy.current * delta;
        self.position.z += velocity.z * delta;
        
        if(self.position.y < radius) {
            console.log(vy.current);
            vy.current = -vy.current * e;
            self.position.y = radius;
            if(vy.current < radius * 0.5) setUpdate(false);
            
        
        }
        onChange({
            position: self.position,
            velocity: new Vector3(velocity.x, vy.current, velocity.z)
        });
    });
    return (
        <mesh position={[pos.x, pos.y, pos.z]} castShadow ref={ref}>
            <sphereGeometry args={[radius, 32, 32]} />
            <meshStandardMaterial color={color} metalness={0.5} roughness={0.0} />
        </mesh>
    );
}