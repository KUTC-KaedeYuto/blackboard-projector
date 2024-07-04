import { Color } from 'three';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { ContextShowMenu } from '@/app/layout';
import { Plane } from '@react-three/drei';


function BaseSpace({children}) {
  
  const {setShowMenu} = useContext(ContextShowMenu);

  return (
    <div className="App text-center" style={{height: "100%"}}>
      <Canvas
        shadows
        gl={{
          alpha:true,
          antialias:true
        }}
        camera={{position: [0,10,40], fov: 50}}
        onCreated={({scene}) => {
          scene.background = new Color('#000');
        }}
      >
        <fog attach="fog" args={["#000", 500, 1000]} />
        {/* <OrbitControls/> */}
        <axesHelper args={[5]} />
        <ambientLight color={0xffffff} intensity={1} />
        <directionalLight
          color={0xffffff}
          position={[50, 50, -50]} 
          intensity={3}
          castShadow 
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-left={-20}
          shadow-camera-right={50}
          shadow-camera-top={20}
          shadow-camera-bottom={-50}
          shadow-camera-near={0.5}
          shadow-camera-far={500}
          
        />

        <Plane args={[1000, 1000]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <meshStandardMaterial color="#7fd14b" />
        </Plane>
        
        {/* 地面 */}

        {children}
        <Html
          calculatePosition={() => [0, 0]}
          style={{
            width: "50vw",
            textAlign:"left",
          }}
          zIndexRange={[999, 0]}
        >
          <Button variant='outline-secondary' className='ml-2' onClick={() => {setShowMenu(true)}}>メニューを表示</Button>
          
        </Html>
      </Canvas>
    </div>
  );
}


export default BaseSpace;
