import { useFrame } from "@react-three/fiber";
import { useContext, useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import TrailObjects from './TrailObjects';
import { Sphere } from "@react-three/drei";


const G = -9.80;
const e = 0.8;

export default function MyBall({pos, velocity, radius, color, onChange, show_trail=false, trail_cooltime=0.2, renderGraph=false, active=true, init={init: false, setInit: () => {}}}){
    let vy = useRef(velocity.y);
    // const [update, setUpdate] = useState(active);
    const [trails, setTrails] = useState([]);
    // const {graphData, setGraphData} = useContext(graphContext);
    const ref = useRef();
    const time = useRef(0);

    useEffect(() => {
         vy.current = velocity.y;
        // setUpdate(active);
        // active = true;
    }, [pos, velocity]);

    useEffect(() => {
        setTrails([]);
        init.setInit(false);
    }, [init.init]);

    useFrame((state, delta) => {
        // if (!(update && delta < 0.1)) return;
        if (!(active && delta < 0.1)) return;
        
        vy.current += G * delta;
        let self = ref.current;
        self.position.x += velocity.x * delta;
        self.position.y += vy.current * delta;
        self.position.z += velocity.z * delta;
        
        

        if(self.position.y < radius) {
            vy.current = -vy.current * e;
            self.position.y = radius;
            // if(vy.current < radius * 0.5) setUpdate(false);
            
        
        }
        if(show_trail && time.current >= trail_cooltime){
            setTrails((e) => [...e, ref.current.position.clone()]);
            if(renderGraph){
                if(graphData.length === 0) setGraphData([{
                    t: time.current, 
                    data:{
                        position: self.position.clone(),
                        velocity: velocity
                    }
                }]);
                else setGraphData([...graphData, {
                    t: graphData[graphData.length - 1].t + time.current,
                    data:{
                        position: self.position.clone(),
                        velocity: velocity
                    }
                }]);
            }
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
        <Sphere position={[pos.x, pos.y, pos.z]} castShadow ref={ref} args={[radius, 32, 32]}>
            <meshPhysicalMaterial color={color} metalness={0.5} roughness={0} />
        </Sphere>
        <TrailObjects radius={radius} color={color} pos={trails} />
        </>
    );
}