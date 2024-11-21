'use client'
import { Button, Container, Form } from "react-bootstrap";
import PageDivider from "../../components/PageDivider";
import FloatingWindow from "../../components/FloatingWindow";
import { createContext, useState } from "react";
import LabeledRange from "@/components/bootstrap_wrapper/LabeledRange";

export default function Page() {

    return (
        <PageDivider top={<Top />} bottom={<Bottom />} ></PageDivider>
    );
}

function Top() {
    const [fontSize, setFontSize] = useState(12);
    const [color, setColor] = useState("#000000");

    return (
        <>
            <FloatingWindow initialPos={{
                x: 10,
                y: 10
            }} size={{
                width: 200,
                height: 200,
            }} >
                <div style={{ color: "#fff", width: "100%", height: "100%", fontSize: `${fontSize}px` }}>
                    あ
                </div>

            </FloatingWindow>
            <FloatingWindow initialPos={{
                x: 300,
                y: 100
            }} size={{
                width: 200,
                height: 200,
            }} >
                <div style={{ color, width: "100%", height: "100%", fontSize: `${fontSize}px`  }}>
                    あ
                </div>
            </FloatingWindow>
            <Form>
                <Form.Label>文字サイズ</Form.Label>
                <LabeledRange min={5} max={128} step={1} defaultValue={12} onChange={(e) => {
                    console.log(e);
                    setFontSize(+e.target.value);
                }} />
                <Form.Control type="color" onChange={(e) => {
                    setColor(e.target.value);
                }} />
            </Form>
        </>
    );
}

function Bottom() {
    return (
        <div
            style={{
                background: "#000",
                width: "100%",
                height: "100%"
            }}
        >

        </div>
    );
}