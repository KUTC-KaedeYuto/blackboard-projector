import { useEffect, useRef, useState } from "react";

export default function FloatingWindow({ children, initialPos, size, resize = false }) {
    const pmouse = useRef({ x: 0, y: 0 });
    const mouseDown = useRef(false);
    const [windowPos, setWindowPos] = useState(initialPos);
    const _windowPos = useRef(windowPos);
    const timeoutRef = useRef(null);
    const [showDummy, setShowDummy] = useState(false);
    const [dummyPos, setDummyPos] = useState({ x: 0, y: 0 });
    const childrenRef = useRef();
    const [windowSize, setWindowSize] = useState({
        width: size?.width,
        height: size?.height
    });
    const [mouseMoveTrigger, setMouseMoveTrigger] = useState(false);

    const map = (x, min, max) => {
        return Math.min(max, Math.max(min, x));
    }

    const handleMouseDown = (e) => {
        mouseDown.current = true;
        setShowDummy(true);
        const bound = e.target.getBoundingClientRect();
        _windowPos.current = {
            x: bound.x,
            y: bound.y,
        }
        setDummyPos(_windowPos.current);
        pmouse.current = {
            x: e.clientX,
            y: e.clientY
        };
    };
    const handleMouseMove = (e) => {
        if (mouseDown.current) {

            _windowPos.current = {
                x: map(_windowPos.current.x + (e.clientX - pmouse.current.x), 0, window.innerWidth - windowSize.width),
                y: map(_windowPos.current.y + (e.clientY - pmouse.current.y), 0, window.innerHeight - windowSize.height - 20)
            }
            setDummyPos(_windowPos.current);
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            timeoutRef.current = setTimeout(() => {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
                setWindowPos(_windowPos.current);
            }, 500);
        }
        pmouse.current = {
            x: e.clientX,
            y: e.clientY
        }
    };
    const handleMouseUp = () => {
        mouseDown.current = false;
        setShowDummy(false);

        setWindowPos(_windowPos.current);
    };

    useEffect(() => {
        const a = (e) => {
            setMouseMoveTrigger(e);
        };
        window.addEventListener("mousemove", a);
        window.addEventListener("mouseup", handleMouseUp);
        if (!(size?.width && size?.height)) {
            const bound = childrenRef.current.getBoundingClientRect();
            setWindowSize(bound);
        }
        if (resize) {
            const observer = new ResizeObserver(() => {
                const bound = childrenRef.current.getBoundingClientRect();
                setWindowSize(bound);
                console.log("resized");
            });
            observer.observe(childrenRef.current);
        }
        return () => {
            window.removeEventListener("mousemove", a);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    useEffect(() => {
        handleMouseMove(mouseMoveTrigger);
    }, [mouseMoveTrigger]);


    return (
        <>
            <div style={{
                position: "absolute",
                top: windowPos.y,
                left: windowPos.x,
                userSelect: showDummy ? "none" : "auto",
                overflowX: "hidden",
                overflowY: "hidden",
                zIndex: 100
            }}
            >
                <div
                    style={{
                        height: "20px",
                        cursor: "move",
                        background: "#888"
                    }}
                    onMouseDown={handleMouseDown}
                ></div>
                <div style={{
                    width: windowSize.width !== undefined ? `${windowSize.width}px` : "max-content",
                    height: windowSize.height !== undefined ? `${windowSize.height}px` : "max-content",
                    overflowX: "hidden",
                    overflowY: "hidden"
                }}>
                    <div ref={childrenRef} style={{
                        width: "max-content",
                        height: "max-content",
                        margin: 0,
                        padding: 0
                    }}>
                        {children}
                    </div>
                </div>
            </div>
            <div style={{
                height: `${windowSize.height + 20}px`,
                width: `${windowSize.width}px`,
                cursor: "move",
                background: "#888",
                border: "solid 2px #fff",
                pointerEvents: "none",
                position: "absolute",
                top: dummyPos.y,
                left: dummyPos.x,
                display: showDummy ? "block" : "none",
                opacity: 0.5,
                zIndex: 99999
            }}></div>
        </>
    );
}