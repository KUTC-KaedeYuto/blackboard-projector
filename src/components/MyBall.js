import { useFrame } from "@react-three/fiber";
import { useRef, useState} from "react";

const G = -9.80;
const speed = 1 / 10;
const e = 0.8;

export default function({pos, velocity, radius, color}){
    const [vy , setVy] = useState(velocity.y);

    const ref = useRef();
    useFrame((state, delta) => {
        setVy(vy + G * delta);
        let self = ref.current;
        self.position.x += velocity.x * delta;
        self.position.y += vy * delta;
        self.position.z += velocity.z * delta;
        if(self.position.y < radius) {
            setVy(-vy * e - 0.01);
            self.position.y = radius;
        }
        
    });
    return (
        <mesh position={[pos.x, pos.y, pos.z]} castShadow ref={ref}>
            <sphereGeometry args={[radius, 32, 32]} />
            <meshStandardMaterial color={color} metalness={0.5} roughness={0.0} />
        </mesh>
    );
}