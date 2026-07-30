import React, { useState,useEffect } from 'react'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hook/useCurrencyinfo'
const App = () => {
 const [Amount, setAmount] = useState(0);
 const [From, setFrom] = useState("usd");
 const [To, setTo] = useState("inr");
const [ConvertedAmount, setConvertedAmount] = useState(0)

const currencyInfo = useCurrencyInfo(From);
const options = Object.keys(currencyInfo);


const convert = () =>{
  setConvertedAmount(Amount*currencyInfo[To]);
}

const swap=()=>{
 
  setFrom(To);
  setTo(From);
  setConvertedAmount(Amount);
  setAmount(ConvertedAmount);
}


useEffect(() => {
  if (currencyInfo[To]) {
    setConvertedAmount(Amount * currencyInfo[To]);
  }
}, [To, currencyInfo]);

  return (
    <div
            className="w-full h-screen flex flex-wrap items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage:'url("./src/assets/deleteable.jpg")',
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/20">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                           convert()
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                Amount={Amount}
                                onAmountChange={(val)=>setAmount(val)}
                                CurrencyOptions={options}
                                onCurrencyChange={(currency)=>{setAmount(Amount)
                                  setFrom(currency)
                                }}
                                selectedCurrency={From}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                                onClick={swap}
                            >
                                swap
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                Amount={ConvertedAmount}
                                onAmountChange={(val)=>setConvertedAmount(val)}
                                CurrencyOptions={options}
                                onCurrencyChange={(currency)=>{
                                 
                                  setTo(currency)
                                }}
                                selectedCurrency={To}
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                            Convert {From} To {To}
                        </button>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default App