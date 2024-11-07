import { Color, DirectionalLightHelper, Vector3 } from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Helper, PerspectiveCamera, Grid } from '@react-three/drei';
import { Plane } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';

export function CameraSetter({ camera_pos = new Vector3(0, 10, 40), camera_lookAt = new Vector3(0, 10, 0) }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.set(camera_pos.x, camera_pos.y, camera_pos.z);
    camera.lookAt(camera_lookAt.x, camera_lookAt.y, camera_lookAt.z);
  });
  return null;
}

function BaseSpace({ showGrid, children }) {


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
        <PerspectiveCamera makeDefault position={[0, 10, 0]} />
        <OrbitControls />
        {/* <axesHelper args={[50]} /> */}
        <ambientLight color={0xffffff} intensity={1} />
        <directionalLight
          color={0xffffff}
          position={[50, 50, -50]}
          intensity={3}
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-left={-100}
          shadow-camera-right={100}
          shadow-camera-top={-100}
          shadow-camera-bottom={100}
          shadow-camera-near={0.5}
          shadow-camera-far={500}
        >
          {/* <Helper type={DirectionalLightHelper} /> */}
        </directionalLight>
        <directionalLight color={0xffffff} position={[-1000, 1000, 1000]} intensity={2} />

        <Plane args={[1000, 1]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <meshStandardMaterial color="#999" />
        </Plane>

        {/* 地面 */}
        {
          showGrid && <Grid
            cellSize={5}
            cellColor={new Color(0x444444)}
            cellThickness={1}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            sectionSize={10}
            sectionColor={new Color(0x666666)}
            sectionThickness={1.1}
            fadeDistance={10000}
            infiniteGrid
          />
        }

        {children}
      </Canvas>
    </div>
  );
}


export default BaseSpace;
