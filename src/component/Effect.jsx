import React, { useEffect, useState } from "react";
const Effect = () => {
    const [count, setCount] = useState(0);
  
    const [text, settext] = useState("Hello world");
  
    useEffect(() => {
      setInterval(() => {
        setCount(count + 1);
      }, 1000);
    }, [text]);
  
    return (
      <div>
        {count}
        {text}
        <button onClick={() => settext("hello there")}>click me</button>
      </div>
    );
  };
  
  export default Effect;