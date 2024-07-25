import { Html } from "@react-three/drei";
import { useEffect, useRef } from "react";


function InnerGraph({size, title, data, drawLine}){
    const canvas_ref = useRef();
    useEffect(() => {// Called when [data or drawLine] changed
        if(data.x_range === undefined) data.x_range = {}
        if(data.y_range === undefined) data.y_range = {}
        
        let x_min = data.x_range.min, x_max = data.x_range.max;
        let y_min = data.y_range.min, y_max = data.y_range.max;
        if(x_min === undefined) x_min = Math.min(...data.x);
        if(x_max === undefined) x_max = Math.max(...data.x);
        if(y_min === undefined) y_min = Math.min(...data.y);
        if(y_max === undefined) y_max = Math.max(...data.y);

        if(x_min === x_max){
            x_min -= 0.5;
            x_max += 0.5;
        }

        if(y_min === y_max){
            y_min -= 0.5;
            y_max += 0.5;
        }

        const canvas = canvas_ref.current;
        const ctx = canvas.getContext("2d");

        const width = canvas.width;
        const height = canvas.height;

        let points = [];

        for(let i = 0; i < data.x.length; i++){
            if(data.x[i] < x_min || x_max < data.x[i] || data.y[i] < y_min || y_max < data.y[i]) continue;
            points.push({
                x: 0.90 * width * (data.x[i] - x_min) / (x_max - x_min) + 0.05 * width,
                y: 0.90 * height * (1 - (data.y[i] - y_min) / (y_max - y_min)) + 0.05 * height
            });
        }
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, 500, 500);

        ctx.fillStyle = "#f00";
        ctx.strokeStyle = "#f00";
        ctx.lineWidth = 2;
        for(let i = 0; i < points.length; i++){
            let p = points[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.min(width, height) * 0.005 , 0, Math.PI * 2, true);
            ctx.fill();
            if(i >= 1 && drawLine){
                let prev_p = points[i - 1];
                ctx.beginPath();
                ctx.moveTo(prev_p.x, prev_p.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
            }
        }

    }, [data, drawLine]);

    
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                color: "#fff"
            }}
        >
            {title}
            <canvas ref={canvas_ref} width={size.width} height={size.height} style={{
                width: "100%",
                height: "100%"
            }}>
            </canvas>
        </div>
    );
}

export default function Graph({position, size, title, data, drawLine=false}){
    return (
        <Html
            calculatePosition={() => [position.x, position.y]}
            style={{
                width: `${size.width}px`,
                height: `max-content`,
                textAlign:"center",
                pointerEvents: "none"
            }}
        >
            <InnerGraph size={size} title={title} data={data} drawLine={drawLine}></InnerGraph>
        </Html>
    );
}

