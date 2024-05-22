import React from 'react'

const useref = () => {
    let email = useRef();
    let password = useRef();
 
    function handle(){
        let data = {
            email: email.current.value,
            password: password.current.value,
          };
          console.log(data);
    }

  return (
   <div>
     <input type="text" ref={email} />
    <input type="text" ref={password}/>
    <button onClick={handle}>submit</button>
   </div>
  )
}

export default useref