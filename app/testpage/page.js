'use client'
import { Button } from "react-bootstrap";
import PageDivider from "../../components/PageDivider";


export default function Page() {
    return (
        <PageDivider top={"container1"} bottom={<Button>click me</Button>} ></PageDivider>
    );
}