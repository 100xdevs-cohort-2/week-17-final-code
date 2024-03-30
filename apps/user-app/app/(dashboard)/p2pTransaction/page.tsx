import { SendMoney } from "../../../components/SendMoneyCard";

export default async function() {

    return <div className="w-screen h-screen flex items-center justify-center">
        <div className="w-1/3">
            <div>
                <SendMoney />
            </div>
        </div>
    </div>
}