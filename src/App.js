import './App.css';
import { Color } from 'three';
import MyBall from './components/MyBall';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { useRef, useState } from 'react';
import { Controllers, Hands, Interactive, VRButton, XR} from '@react-three/xr';


function App() {
  const light_ref = useRef();
  const [log, setLog] = useState([]);
  const [vrSupported, setVrSupported] = useState(false);

  return (
    <div className="App" style={{height: "100%"}}>
      <VRButton id='vr_button'  hidden={!vrSupported}>
      {(status) => {setVrSupported(status !== "unsupported")}}
      </VRButton>
      <Canvas
        shadows
        gl={{
          alpha:true,
          antialias:true
        }}
        camera={{position: [0,10,40], fov: 50}}
        onCreated={({scene}) => {
          scene.background = new Color('#fff');
        }}
        onClick={() => {
          setLog([...log, "canvas clicked"]);
        }}
      >
      <XR>
        <Controllers />
        <Hands />
        <fog attach="fog" args={["#fff", 200, 300]} />
        <raycaster></raycaster>
        <OrbitControls/>
        <axesHelper args={[5]} />
        <ambientLight color={0xffffff} intensity={1} />
        <directionalLight 
          ref={light_ref}
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

        

        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[1000, 1000]} />
          <meshStandardMaterial color='#7fd14b' />
        </mesh>
        <Html
          transform position={[0, 1, 2]}
        >
          <h2>ログ</h2>
          {
            Array(log).map((l) => `<p>${l}<p/>`)
          }
        </Html>
        <MyBall pos={{x:0, y: 0.2, z: 0}} velocity={{x: 0, y: 9.8, z: 0}} radius={0.2} color="#f00"/>
        {/* <MyBall pos={{x: 5, y: 10, z: 0}} velocity={{x: 0, y: 0, z: 0}} radius={1} color="#f00"/> */}
        
        {
          new Array(20).fill(0).map((a, i) => {
            return <MyBall key={`${i}@Myball`} 
              pos={{x: 5 * (i - 9), y: 20, z: -30}} 
              velocity={{x: 0, y: i, z: 0}}
              radius={0.5} 
          color={new Color(`hsl(${18 * i}, 80%, 40%)`)}
             />
          })
        }
      </XR>
      </Canvas>
    </div>
  );
}

export default App;
