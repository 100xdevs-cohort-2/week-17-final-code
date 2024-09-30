"use client"
import { useState } from "react"
import { TextInput } from "@repo/ui/textinput"
import { Button } from "@repo/ui/button"
import updateBalance from "../app/lib/actions/updateBalance"


export default function ({balance }:{balance:number,locked:number}){
    const [amount ,setAmount] = useState<string>("")
    const [number ,setNumber] = useState<string>("")
    const [error,SetError] = useState({
        error:"",
        isError:false
    })

 async function handleClick(){

 const  res = await   updateBalance(number,amount,balance)
 if(!res.status){
  console.log(res.error, "error")
  SetError(prev=>({
      ...prev,
      error:res.msg,
      isError:true
  }))
}else{
  SetError(prev=>({
    ...prev,
    error:"",
    isError:false
  }))
  window.location.reload()
}
 }

   return  <div id="transfer section" className="bg-white p-12 rounded-lg border-black border flex flex-col gap-4">
    {error.isError&&<div className="text-sm rounded-lg font-semibold text-black p-2 bg-[rgba(255,85,85,0.5)]">{error.error}</div>}
    <TextInput label="Phone Number" placeholder="Phone Number" type="number"  onChange={(e)=>{
     setNumber(e.target.value)
    }}/>
    <TextInput label="Amount" placeholder="Amount" type="number"  onChange={(e)=>{
     setAmount(e.target.value+"00")
    }}/>
   <Button  onClick={handleClick}>Send</Button>
   </div>
}