"use client"

import { useState, useEffect } from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';


export default function Page () {
  const [susiki, setSusiki] = useState([]);

  useEffect(() => {
    setSusiki([
      `a = g = -9.8`,
      `v_{0y} &= v_{0}\\sin\\theta`,
      `v_{y} &= \\int_{0}^{t} a \\, dt + v_{0y} \\\\ &= -9.8t + v_{0}\\sin\\theta`,
      `y &= \\int_{0}^{t} v_{y} \\, dt + h \\\\ &= -4.9t^{2} + v_{0}t\\sin\\theta + h`
    ]);
  }, []);

  return (
    <div>
      <MathJaxContext version={2}>
        <h1>数式表示例</h1>
        {susiki.map((line, index) => (
          <Hover key={index} formula={line} />
        ))}
      </MathJaxContext>
    </div>
  );
};


function Hover({ formula }) {
  const [color, setColor] = useState("black");
  const [clicked, setClicked] = useState(false);

  const handleMouseEnter = () => { 
    if (!clicked) setColor("red"); 
  };
  const handleMouseLeave = () => { 
    if(!clicked) setColor("black"); 
  };

  const handleClick = ()=> {
    setClicked(!clicked);
    setColor(clicked ? "black" : "red");
  };

  return (
    <MathJax 
      style={{ color: color, marginBottom: "10px" }}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {`\\begin{align}${formula}\\end{align}`}
    </MathJax>
  );
}