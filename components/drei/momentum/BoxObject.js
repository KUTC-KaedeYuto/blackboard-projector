import { Box } from "@react-three/drei";

export default function BoxObject({position, size, color}){
    return (<>
        <Box position={position} args={[size.x, size.y, 1]}>
            <meshStandardMaterial color={color} />
        </Box>
    </>);
}