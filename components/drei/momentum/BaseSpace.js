import { Color, Vector3 } from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Box, Html, OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { ContextShowMenu } from '@/app/layout';

export function CameraSetter({ camera_pos = new Vector3(0, 10, 40), camera_lookAt = new Vector3(0, 10, 0) }) {
    const { camera } = useThree();
    useFrame(() => {
        camera.position.set(camera_pos.x, camera_pos.y, camera_pos.z);
        camera.lookAt(camera_lookAt.x, camera_lookAt.y, camera_lookAt.z);
    });
    return null;
}

export default function BaseSpace({ children }) {

    const { setShowMenu } = useContext(ContextShowMenu);

    return (
        <div className="App text-center" style={{ height: "100%" }}>
            <Canvas
                shadows
                gl={{
                    alpha: true,
                    antialias: true
                }}
                onCreated={({ scene }) => {
                    scene.background = new Color('#000');
                }}
            >
                <fog attach="fog" args={["#000", 500, 1000]} />

                {/* <PerspectiveCamera makeDefault position={[10, 10, 10]} /> */}
                {/* <OrbitControls></OrbitControls> */}
                <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100}/>
                
                <axesHelper args={[5]} />
                <ambientLight color={0xffffff} intensity={1} />


                <Box args={[1000, 0.1, 1]} position={[0, 0, 0]} rotation={[0, 0, 0]} >
                    <meshStandardMaterial color={"#eeeeee"} />
                </Box>

                {/* 地面 */}

                {children}
                <Html
                    calculatePosition={() => [0, 0]}
                    style={{
                        width: "50vw",
                        textAlign: "left",
                    }}
                    zIndexRange={[999, 0]}
                >
                    <Button variant='outline-secondary' className='ml-2' onClick={() => { setShowMenu(true) }}>メニューを表示</Button>

                </Html>
            </Canvas>
        </div>
    );
}