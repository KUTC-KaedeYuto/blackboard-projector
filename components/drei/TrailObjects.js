import { Instance, Instances } from "@react-three/drei";



export default function TrailObjects({radius, color, pos}){
    return (<>
        <Instances limit={1000} range={1000}>
            <sphereGeometry args={[radius*0.5, 32, 32]}/>
            <meshBasicMaterial transparent opacity={0.5} color={color}/>
        {
            pos.map((p, i) => <Instance position={[p.x, p.y, p.z]} key={`TrailInstance#${i}`} />)
        }
        </Instances>
    </>);
}
