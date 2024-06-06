import Graph from "@/components/drei/Graph";
import { Canvas } from "@react-three/fiber";
import { Color } from "three";



export default {
    component: Graph,
    title: "グラフ描画用コンポーネント"
}

const Template = args => <Canvas onCreated={(scene) => {
    scene.background = new Color("#fff");
}}><Graph {...args} ></Graph></Canvas>

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