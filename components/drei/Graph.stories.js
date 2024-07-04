import Graph from "@/components/drei/Graph";
import { Canvas } from "@react-three/fiber";
import { Color } from "three";



export default {
    component: Graph,
    title: "グラフ描画用コンポーネント",
    argTypes:{
        title:{
            description: "グラフ上部に表示されるタイトル"
        },
        position:{
            "position.x":{
                control: {
                    type: "range",
                    min: 10,
                    max: 1000,
                    step: 1
                }
            }
        },
        size:{
            control:{
                type:"object"
            },
            description: "グラフのサイズを指定可能"
        },
        drawLine:{
            contorl:{
                type: "boolean"
            },
            description: "データ間に直線を引くかどうかを指定可能"
        },
        data:{
            control:{
                type: "object"
            },
            description: "グラフで描画するデータを指定可能"
        }
    }
}

const Template = args => <div style={{background:"#888"}}><Canvas style={{
    height: "500px"
}} camera={{
    position: [0, 0, 0],
    fov:50
}} onCreated={(scene) => {
    scene.background = new Color("#fff");
}}><Graph {...args} ></Graph></Canvas></div>

export const graph= Template.bind({});
graph.args = {
    title : "タイトル",
    position: {x: 0, y: 0},
    size:{
        width: 250,
        height: 250
    },
    drawLine: true,
    data: {
        x: Array(50).fill(0).map((e, i) => i),
        y: Array(50).fill(0).map((e, i) => Math.sin(i * Math.PI * 2 / 25)),
        x_range:{
            min: 0,
            max: 50
        },
        y_range:{
            min: -1.5,
            max: 1.5
        }
    }
};