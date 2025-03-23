import React, { useContext, useState } from 'react'
import { createContext } from 'react'

const StatContext =createContext();

export const useStat=()=>{
 const stat= useContext(StatContext);
 return stat;
}

const StatProvider = ({children}) => {
   const [transactionStat,setTransactionStat]=useState(0)
    const [incomeStat,setIncomeStat]=useState(0)
    const [expenseStat,setExpenseStat]=useState(0)
  return (
    <StatContext.Provider value={{transactionStat,setTransactionStat,expenseStat,setExpenseStat,incomeStat,setIncomeStat}}>
      {children}
    </StatContext.Provider>
  )
}

export default StatProvider
