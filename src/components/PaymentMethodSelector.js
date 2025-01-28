import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const PaymentMethodSelector = ({isOpen, setIsOpen, subItems, isSelected, setIsSelected, selectedSubItemIndex, selectedLists, setSelectedLists}) => {

  return (
    <div className="relative w-full">
      <div className={isSelected || isOpen? "p-[2px] rounded-full bg-[conic-gradient(from_225deg_at_50%_50%,_#ffc876,_#79fff7,_#9f53ff,_#ff98e2,_#ffc876)]":"p-[2px] rounded-full bg-[#2f2f2f]"}>
        <button 
          onClick={() => setIsOpen(7)}
          className="flex items-center gap-3 px-4 py-2.5 rounded-full text-white bg-[#181818] w-full"
        >
          <div className="w-7 h-7 rounded-full flex items-center justify-center">
            <img 
              src={subItems[selectedLists[selectedSubItemIndex]].icon }
              alt="token"
              className="w-7 h-7"
            />
          </div>
          <div className="flex-1 text-left ">
            <div className="font-semibold">{subItems[selectedLists[selectedSubItemIndex]].method}</div>
            <div className="text-xs text-gray-400">{subItems[selectedLists[selectedSubItemIndex]].label}</div>
          </div>
          {subItems.length>1 && <ChevronDown className="w-5 h-5 text-gray-400" />}
        </button>
      </div>

      {isOpen && subItems.length>1 && (
        <div className="z-[1001] absolute w-full mt-[-10px] p-[2px] bg-[conic-gradient(from_225deg_at_50%_50%,_#ffc876,_#79fff7,_#9f53ff,_#ff98e2,_#ffc876)] rounded-xl">          
            <div className="max-h-64 overflow-y-auto rounded-xl bg-[#181818]">
                {
                    subItems.map((item, index) => 
                        <div key={index}>
                            <button 
                            onClick={() => {
                                setSelectedLists(selectedLists.map((item, i) => i==selectedSubItemIndex? index : item));
                                setIsSelected(selectedSubItemIndex);
                                setIsOpen(7);
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 w-full text-white bg-[#181818]"
                            >
                                <div className="w-7 h-7 rounded-full flex items-center justify-center">
                                    <img 
                                    src={item.icon}
                                    alt="ETH token"
                                    className="w-7 h-7"
                                    />
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="font-semibold">{item.method}</div>
                                    <div className="text-xs text-gray-400">{item.label}</div>
                                </div>
                            </button>
                            <div className="border-[2px] border-[#2f2f2f]"></div>
                        </div>
                    )
                }
            </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;