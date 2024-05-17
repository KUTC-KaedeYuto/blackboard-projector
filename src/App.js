import './App.scss';
import { Color } from 'three';
import MyBall from './components/MyBall';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls} from '@react-three/drei';
import { useRef } from 'react';

function App() {
  const light_ref = useRef();
  return (
    <div className="App" style={{height: "100%"}}>
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
      >
        <fog attach="fog" args={["#fff", 200, 300]} />
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
        <MyBall pos={{x:0, y: 1, z: 0}} velocity={{x: 0, y: 9.8, z: 0}} radius={1} color="#f00"/>
        {/* <MyBall pos={{x: 5, y: 10, z: 0}} velocity={{x: 0, y: 0, z: 0}} radius={1} color="#f00"/> */}
        
        {/* {
          new Array(20).fill(0).map((a, i) => {
            return <MyBall key={`${i}@Myball`} 
              pos={{x: 5 * (i - 9), y: 20, z: -30}} 
              velocity={{x: 0, y: i, z: 0}}
              radius={0.5} 
          color={new Color(`hsl(${18 * i}, 80%, 40%)`)}
             />
          })
        } */}
        <Html
          calculatePosition={() => [0, 0]}
          style={{
            width: "300px",
            textAlign:"left"
          }}
        >
          ここに座標とか書けるよ<br></br>
          取得方法分からんけど
          
        </Html>
      </Canvas>
    </div>
  );
}

export default App;
