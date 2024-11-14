import { useState } from "react";
import Button from "react-bootstrap/Button";

export default function PlayButton({ onClick }) {
    const [playing, setPlaying] = useState(false);

    return (
        <Button variant="primary" style={{
            width: "6rem"
        }} onClick={() => {
            onClick();
            setPlaying(!playing);
        }}>
            {
                playing ? "一時停止" : "再生"
            }
        </Button>
    );
}