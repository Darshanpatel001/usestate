
import { useState } from 'react';
import Multipalusestate from './component/Multipalusestate';
import Singalelineusestate from './component/Singalelineusestate';
function App() {
  // [vairable,fonaction]
   const [count, setcount] = useState(0);
   const [color, setcolor] = useState("blue")
   const [width, setwidth] = useState("200px")
   const [height, setheight] = useState("200px")
  return (
      <>
    <div>
      <h1>{count}</h1>
      <button onClick={() => setcount(count + 1)}>+</button>
      <button onClick={() => setcount(count - 1)}>-</button>
      <div style={{backgroundColor:`${color}` , height:`${height}`, width:`${width}`}}>
      </div>
      <button onClick={()=>setcolor("red" , setwidth("500px"), setheight("500px") )}>change_color</button>
  </div>
  <Multipalusestate/>
  <Singalelineusestate/>
  </>
  );
}

export default App;