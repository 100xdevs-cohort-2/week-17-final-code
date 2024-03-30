"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { SendMoneyTo } from "../app/lib/actions/sendMoney";

export const SendMoney = () => {
    const [amount, setAmount] = useState(0);
    const [number, setNumber] = useState('');
    return <Card title="Send ">
    <div className="w-full">
        <TextInput label={"Number"} placeholder={"Number"} onChange={(value) => {
            setNumber(value);
        }} />
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
            setAmount(Number(value));
        }} />
        <div className="flex justify-center pt-4">
            <Button onClick={async() => {
                const res = await SendMoneyTo(number,amount);
                console.log(res.message);
            }}>
            Send Money
            </Button>
        </div>
    </div>
</Card>
}