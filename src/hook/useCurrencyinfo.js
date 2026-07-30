import { useEffect,useState, } from "react";

function useCurrencyInfo(currency){
    const [CsrRate, setCsrRate] = useState({})
    useEffect(()=>{
      fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
      .then((res)=>res.json())//string->object
      .then((res)=> setCsrRate(res[currency]))//obj->value 

    },[currency])
     return CsrRate  
}



export default useCurrencyInfo;