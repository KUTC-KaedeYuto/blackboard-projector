import { useState, useEffect } from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';

export default function MathjaxWrapper ({args=[]}) {
  const [equations, setEquations] = useState([]);

  useEffect(() => {
    setEquations(args);
  }, []);

  return (
    <div style={{ background: "#fff"}}>
      <MathJaxContext version={2}>
        {equations.map((s, i) => (
          <SelectEquation key={`equations${i}`} equation={s} />
        ))}
      </MathJaxContext>
    </div>
  );
};


function SelectEquation({ equation }) {
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
      style={{ color: color }}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {`\\begin{align}${equation}\\end{align}`}
    </MathJax>
  );
}