import {useState, useEffect} from 'react';

export function useLocalStorageState(initialvalue,key){
    const [value, setValue] = useState(function(){
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialvalue
      }); 

      useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
      },[value,key])

      return [value, setValue]
}