
import { useRef, useState } from "react";

export default function PageDivider({top, bottom}){
    const [height, setHeight] = useState(200);
    const [showSpacer, setShowSpacer] = useState(false);
    const [spacerHeight, setSpacerHeight] = useState(0);
    const _height = useRef(height);
    const timeoutRef = useRef(null);
    const mouseDown = useRef(false);
    const pmouse = useRef({
        x: 0,
        y: 0
    });
    const handleMouseDown = (e) => {
        mouseDown.current = true;
        setShowSpacer(true);
        _height.current = e.clientY - 10;
        setSpacerHeight(_height.current);
        pmouse.current = {
            x: e.clientX,
            y: e.clientY
        }
    };
    const handleMouseMove = (e) => {
        if (mouseDown.current) {
            _height.current = e.clientY - 10;
            setSpacerHeight(_height.current);
            if(timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            timeoutRef.current = setTimeout(() => {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
                setHeight(_height.current);
            }, 500);
        }
        pmouse.current = {
            x: e.clientX,
            y: e.clientY
        }
    };
    const handleMouseUp = () => {
        mouseDown.current = false;
        setShowSpacer(false);
    };

    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "#ccc"
            }}
            className="d-flex flex-column"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div style={{
                backgroundColor: "#eee",
                height: `${height}px`
            }}>
                {top}
            </div>
            <div
                onMouseDown={handleMouseDown}
            >
                <div style={{
                    height: "20px",
                    backgroundColor: "#222",
                    color: "#fff",
                    textAlign: "center",
                    userSelect: "none",
                    cursor: "ns-resize"
                }}>・・・</div>
            </div>
            <div>
                <div style={{
                    height: "20px",
                    width: "100%",
                    backgroundColor: "#222",
                    color: "#fff",
                    textAlign: "center",
                    userSelect: "none",
                    border: "solid 2px #fff",
                    pointerEvents: "none",
                    position: "absolute",
                    display: showSpacer ? "block" : "none",
                    opacity: "0.8",
                    top: `${spacerHeight}px`,
                    zIndex: 10000
                }}>・・・</div>
            </div>
            <div style={{
                height: "",
                backgroundColor: "#eee",
                overflowY: "hidden"
            }} className="flex-grow-1">
                {bottom}
            </div>
        </div>
    );
}