import { useFrame } from "@react-three/fiber";
import { useRef, useState} from "react";

const G = -9.80;
// const speed = 1 / 10;
const e = 0.8;

export default function MyBall({pos, velocity, radius, color}){
    const vy = useRef(); 
    const [update, setUpdate] = useState(true);
    vy.current = velocity.y;

    const ref = useRef();
    useFrame((state, delta) => {
        if(!(update && delta < 0.1)) return;
        vy.current += G * delta;
        let self = ref.current;
        self.position.x += velocity.x * delta;
        self.position.y += vy.current * delta;
        self.position.z += velocity.z * delta;
        if(self.position.y < radius) {
            vy.current = -vy.current * e;
            self.position.y = radius;
            if(vy.current < radius) setUpdate(false);
        }
    });
    return (
        <mesh position={[pos.x, pos.y, pos.z]} castShadow ref={ref}>
            <sphereGeometry args={[radius, 32, 32]} />
            <meshStandardMaterial color={color} metalness={0.5} roughness={0.0} />
        </mesh>
    );
}