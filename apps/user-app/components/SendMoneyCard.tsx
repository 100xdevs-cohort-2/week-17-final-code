"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";


export const SendMoney = () => {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState(0)

    return <div className="h-[90vh]">
        <Card title="Send">
            <div className="w-full">
                <TextInput label={"Number"} placeholder={"Number"} onChange={(value) => {
                    setNumber(value)
                }} />

                <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
                    setAmount(Number(value))
                }} />

                <div className="flex justify-center pt-4">
                    <Button onClick={async () => {
                        await p2pTransfer(number, amount * 100)
                    }}>
                        Send
                    </Button>
                </div>
            </div>
        </Card>
    </div>
}