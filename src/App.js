import './App.scss';
import { Color } from 'three';
import MyBall from './components/MyBall';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { useRef, useState, createContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Button, Col, Row } from 'react-bootstrap';
import { Vector3 } from 'three';
import Graph from './components/Graph';

export const graphContext = createContext(null);

function App() {
  const light_ref = useRef();
  const [ballInfo, setBallInfo] = useState({
    position: new Vector3(0, 100, 0),
    velocity: new Vector3(5, 0, 0)
  });
  

  const pos_ref = {x: useRef(), y: useRef(), z: useRef()};
  const velocity_ref = {x: useRef(), y: useRef(), z: useRef()};

  const [graphData, setGraphData] = useState([]);

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
        <fog attach="fog" args={["#fff", 500, 1000]} />
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
        <graphContext.Provider value={{graphData, setGraphData}}>
          <MyBall pos={ballInfo.position} velocity={ballInfo.velocity} radius={1} color="#f00" onChange={setBallInfo} trail_cooltime={0.2} renderGraph/>
        </graphContext.Provider>
        <Html
          calculatePosition={() => [0, 0]}
          style={{
            width: "50vw",
            textAlign:"left"
          }}
        >
          
          <div>
            {`座標: [${ballInfo.position.x}, ${ballInfo.position.y}, ${ballInfo.position.z}]`}
          </div>
          <div>
            {`速度: [${ballInfo.velocity.x}, ${ballInfo.velocity.y}, ${ballInfo.velocity.z}]`}
          </div>
          
          <Form.Group className='mb-2' controlId='InitialPositionInput'>
            <Form.Text>初期位置</Form.Text>
            <Row>
              <Col>
                <Form.Label>x</Form.Label>
                <Form.Control type='number' ref={pos_ref.x} defaultValue={ballInfo.position.x}></Form.Control>
              </Col>
              <Col>
                <Form.Label>y</Form.Label>
                <Form.Control type='number' ref={pos_ref.y} defaultValue={ballInfo.position.y}></Form.Control>
              </Col>
              <Col>
                <Form.Label>z</Form.Label>
                <Form.Control type='number' ref={pos_ref.z} defaultValue={ballInfo.position.z} ></Form.Control>
              </Col>
            </Row>            
          </Form.Group>
          <Form.Group className='mb-2' controlId='InitialPositionInput'>
            <Form.Text>初期速度</Form.Text>
            <Row>
              <Col>
                <Form.Label>x</Form.Label>
                <Form.Control type='number' ref={velocity_ref.x} defaultValue={ballInfo.velocity.x}></Form.Control>
              </Col>
              <Col>
                <Form.Label>y</Form.Label>
                <Form.Control type='number' ref={velocity_ref.y} defaultValue={ballInfo.velocity.y}></Form.Control>
              </Col>
              <Col>
                <Form.Label>z</Form.Label>
                <Form.Control type='number' ref={velocity_ref.z} defaultValue={ballInfo.velocity.z} ></Form.Control>
              </Col>
            </Row>            
          </Form.Group>
          
          <Button varitant="primary" onClick={() => {
            setBallInfo({
              position: new Vector3(+pos_ref.x.current.value, +pos_ref.y.current.value, +pos_ref.z.current.value),
              velocity: new Vector3(+velocity_ref.x.current.value, +velocity_ref.y.current.value, +velocity_ref.z.current.value)
            });
          }}>適用</Button>
        </Html>
        {
          graphData.length === 0 ? "" : <><Graph 
          position={{x: 0, y:350}}
          size={{width: 250, height: 250}}
          title="y-tグラフ"
          drawLine
          data={{
            x: graphData.map((d) => d.t),
            y: graphData.map((d) => d.data.position.y),
            x_range: {
              min: 0,
              max: 30
            },
            y_range: {
              min: 0,
              max: 150
            }
          }}
        />
        <Graph position={{x: 0, y:630}} title="v-tグラフ" size={{width: 250, height: 250}} data={{
            x: graphData.map((d) => d.t),
            y: graphData.map((d) => d.data.velocity.y),
            x_range: {
              min: 0,
              max: 30
            },
            y_range: {
              min: -75,
              max: 75
            }
          }} />
        </>
        }
        
      </Canvas>
    </div>
  );
}


export default App;
