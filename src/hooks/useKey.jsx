import {useEffect} from 'react';
export function useKey(key,action){
    useEffect(function(){
        function callback(e){
          if(e.code.toLowerCase() === key.toLowerCase()){
            action();
          } 
        }
        document.addEventListener("keydown",callback);
    
        return ()=>{
          console.log('Clean up')
          document.removeEventListener("keydown",callback);
        }
      },[action,key])
}