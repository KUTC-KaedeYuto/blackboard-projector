'use client'
import { Button } from "react-bootstrap";
import PageDivider from "../../components/PageDivider";
import FloatingWindow from "../../components/FloatingWindow";

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
        </>
    );
}