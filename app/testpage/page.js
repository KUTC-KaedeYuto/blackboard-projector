'use client'
import { Button } from "react-bootstrap";
import PageDivider from "../../components/PageDivider";
import FloatingWindow from "../../components/FloatingWindow";
import { useState } from "react";

export default function Page() {
    return (
        <PageDivider top={<Top />} bottom={<Button>click me</Button>} ></PageDivider>
    );
}

function Top(){
    return (
        <>
            topだよー
            <FloatingWindow initialPos={{
                x: 10,
                y: 10
            }} size={{
                width: 200,
                height: 200
            }} >
                FloatingWindowだよ
            </FloatingWindow>
            <FloatingWindow initialPos={{
                x: 300,
                y: 100
            }} resize={true}>
                <div style={{
                    width: "max-content"
                }} id="test">
                    
                </div>
                <Button onClick={() => {
                    document.querySelector("#test").innerText += "a";
                }}>aa</Button>
            </FloatingWindow>
        </>
    );
}