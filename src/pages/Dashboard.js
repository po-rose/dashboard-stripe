import React, { useState, useEffect, useRef } from "react"
import PaymentMethodSelector from "../components/PaymentMethodSelector"
import SelectItems from "../utils/SelectItems"
import { useAppKit } from '@reown/appkit/react'
import { auth, signInWithGoogle, logout } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import "react-toastify/dist/ReactToastify.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function Dashboard() {
  const [lastSelectedItem, setLastSelectedItem] = useState(0)
  const [selectedItem, setSelectedItem] = useState(7)
  const [selectedLists, setSelectedLists] = useState( [0, 0, 0, 0, 0, 0, 0 ] )
  const [isLogined, setIsLogined] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const { open, close } = useAppKit();

  const [user, loading, error] = useAuthState(auth);
  const stripe = useStripe();
  const elements = useElements();

  const payRef = useRef(null);

    const handleLoginWithGmail = () => {
        signInWithGoogle()
        // alert(JSON.stringify(user)); 
    }

    const handleBuyNow = () => {}

    const handleBuyNowWithCard = () => {
        payRef.current.click();
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const cardElement = elements.getElement(CardElement);
        const { clientSecret } = await fetch('https://your-wordpress-site.com/wp-json/your-plugin/v1/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 1000, currency: 'usd' }) // Adjust amount and currency as needed
        }).then((res) => res.json());

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
            card: cardElement,
            billing_details: {
                name: 'Customer Name',
            },
            },
        });

        if (error) {
            document.getElementById('payment-error').textContent = error.message;
        } else if (paymentIntent.status === 'succeeded') {
            alert('Payment succeeded!');
        }
    }

    useEffect(() => {
        alert(JSON.stringify(user));
        if (user) {
            setIsLogined(true);
            // alert(JSON.stringify(user));
        }
        else setIsLogined(false);
    }, [user]);

    

  return (
    <div className="min-h-screen bg-[#0a0b1e] text-white pt-8">  
        <div className="flex justify-between items-start mb-2 mx-auto max-w-[1064px]">
            <div>
                <div className="text-gray-400 text-sm">USDT Raised</div>
                <div className="text-2xl font-bold">$10,561,609.12</div>
            </div>
            <div className="text-right">
                <div className="text-gray-400 text-sm">Holders</div>
                <div className="text-2xl font-bold">15,966</div>
            </div>
        </div> 
        <div className="max-w-[1064px] mx-auto space-y-8 bg-[#181818] py-14 px-20 border-[#2f2f2f]  border-2">           

            {/* Token Rate */}
            <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                <span>1 TICS =</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">$</div>
                <span>0.05513968 USD</span>
            </div>
            </div>

            {/* Progress Bar */}
            <div className="relative">
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />
                </div>
                <div className="absolute right-1/4 -top-1 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white" />
                <div className="absolute right-1/4 top-6 bg-[#1a1b2e] p-4 rounded-3xl border border-gray-800">
                    <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    <span>437,086,723 TICS</span>
                    </div>
                    <div className="text-sm text-purple-400">Tokens Sold</div>
                </div>
                <div className="absolute right-0 top-6 text-right">
                    <div className="text-lg font-semibold">10%</div>
                    <div className="text-sm text-gray-400">Increase On Next Phase</div>
                </div>
            </div>

            {/* Purchase Steps */}
            <div className="space-y-8 pt-20">
                <div className="space-y-4">
                    <h2 className="text-xl">
                    <span className="text-gray-400">Step 1</span> - Select the payment method
                    </h2>        
                    <div className="flex w-full flex-wrap justify-center">
                        {
                            selectedLists.map((item, index) => (
                                <div key={index} className="w-1/3" onClick={() => 
                                    {
                                        setSelectedItem(selectedItem==index? 7:index);
                                        SelectItems[index].length<2 && setLastSelectedItem(index);
                                    } 
                                }>
                                    <div className="p-2">
                                        <PaymentMethodSelector subItems={SelectItems[index]} isOpen={selectedItem==index? true : false} setIsOpen ={setSelectedItem} selectedSubItemIndex={index} selectedLists={selectedLists} setSelectedLists={setSelectedLists} isSelected={lastSelectedItem==index?? true} setIsSelected={setLastSelectedItem}/>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            lastSelectedItem==6 && 
                            <div className=" flex-1 my-[10px] mx-2 p-[2px] rounded-full bg-[#2f2f2f] flex items-center hover:bg-[conic-gradient(from_225deg_at_50%_50%,_#ffc876,_#79fff7,_#9f53ff,_#ff98e2,_#ffc876)]">
                                <div className="flex items-center gap-3 px-4 py-[20px] rounded-full bg-[#333333] w-full">
                                    {/* <input type="text" className="bg-transparent w-full focus:outline-none" value={cardNumber} placeholder="Card Number" onChange={(e)=>setCardNumber(e.target.value)}/>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full">
                                            <img 
                                                src="/assets/icons/CARD.png"
                                                alt="token"
                                                className="w-7 h-7"
                                            />
                                        </div>
                                    </div> 
                                    <CardElement className="w-full bg-transparent"/>*/}
                                        <form onSubmit={handleSubmit}  className="w-full bg-transparent">
                                          <CardElement className="w-full bg-transparent"/>
                                          <button type="submit" disabled={!stripe} className="hidden" ref={payRef}>
                                            Pay
                                          </button> 
                                        </form>
                                </div>
                            </div>
                        }
                    </div>    
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl">
                    <span className="text-gray-400">Step 2</span> - Enter the amount of token you would like to purchase
                    </h2>
                    <div className="flex gap-4">
                        <div className="flex-1 p-[2px] rounded-full bg-[#2f2f2f] flex items-center hover:bg-[conic-gradient(from_225deg_at_50%_50%,_#ffc876,_#79fff7,_#9f53ff,_#ff98e2,_#ffc876)]">
                            <div className="flex items-center gap-3 p-4 rounded-full text-white bg-black w-full">
                                <input type="number" defaultValue="0" className="bg-transparent w-full focus:outline-none" />
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full">
                                    <img 
                                        src={SelectItems[lastSelectedItem][selectedLists[lastSelectedItem]].icon }
                                        alt="token"
                                        className="w-7 h-7"
                                    />
                                    </div>
                                    <span>{SelectItems[lastSelectedItem][selectedLists[lastSelectedItem]].method}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center px-4">=</div>
                        <div className="flex-1 p-[2px] rounded-full bg-[#2f2f2f] flex items-center hover:bg-[conic-gradient(from_225deg_at_50%_50%,_#ffc876,_#79fff7,_#9f53ff,_#ff98e2,_#ffc876)]">
                            <div className="flex items-center gap-3 p-4 rounded-full text-white bg-black w-full">
                                <input type="number" defaultValue="0" className="bg-black w-full focus:outline-none" />                        
                                <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                                    <span>TICS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Connect Wallet button */}
            <div className="flex justify-center w-full">
                {
                lastSelectedItem==6 ? 
                    <div className="p-[2px] w-1/3 rounded-full bg-[conic-gradient(from_225deg_at_50%_50%,_#ffc876,_#79fff7,_#9f53ff,_#ff98e2,_#ffc876)] flex justify-center">
                        <button 
                        type="submit"
                        className="flex items-center w-full gap-3 px-4 py-2.5 rounded-full text-white bg-[#181818] hover:bg-[rgba(0,0,0,0)] hover:text-[#2f2f2f] text-xl justify-center" onClick={isLogined? handleBuyNowWithCard : handleLoginWithGmail}>                  
                            {isLogined? "Buy Now" : "Login With Gmail" }      
                        </button>
                    </div>
                    :
                    <div className="p-[2px] w-1/3 rounded-full bg-[conic-gradient(from_225deg_at_50%_50%,_#ffc876,_#79fff7,_#9f53ff,_#ff98e2,_#ffc876)] flex justify-center" onClick={isConnected? handleBuyNow : open}>
                        <button 
                        className="flex items-center w-full gap-3 px-4 py-2.5 rounded-full text-white bg-[#181818] hover:bg-[rgba(0,0,0,0)] hover:text-[#2f2f2f] text-xl justify-center" >                  
                            {isConnected? "Buy Now" : "Connect Wallet"}                      
                        </button>
                    </div>
                }
            </div>

            {/* Help Link */}
            <div className="text-center">
                <a href="#" className="text-gray-400 hover:text-white inline-flex items-center gap-2">
                    How to buy? <span className="text-pink-500">→</span>
                </a>
            </div>
            <div className="p-[2px] w-1/3 rounded-full bg-[conic-gradient(from_225deg_at_50%_50%,_#ffc876,_#79fff7,_#9f53ff,_#ff98e2,_#ffc876)] flex justify-center" onClick={() => logout()}>
                <button 
                className="flex items-center w-full gap-3 px-4 py-2.5 rounded-full text-white bg-[#181818] hover:bg-[rgba(0,0,0,0)] hover:text-[#2f2f2f] text-xl justify-center" >                  
                    Logout                      
                </button>
            </div>
        </div>
    </div>
  )
}
