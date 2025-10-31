import {Transaction} from "@/components/columns";
import {Cause} from "@/components/columns";

export const coincard = [
    {
        "id": 1,
        "title": "Total Donation",
        "description": "500 Tokens",
        "buttonText": "DONATE MORE",
    }
]

type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const payments: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
    },
    // ...
]

export const data: Transaction[] = [
    { id: "190019001900", receiver: "Fulkopi Cares NGO", country: "Bangladesh", tokens: 1000 },
    { id: "190019001900", receiver: "Fulkopi Cares NGO", country: "Bangladesh", tokens: 2000 },
    { id: "190019001900", receiver: "Fulkopi Cares NGO", country: "Bangladesh", tokens: 3000 },
    { id: "190019001900", receiver: "Fulkopi Cares NGO", country: "Bangladesh", tokens: 4000 },
    { id: "190019001900", receiver: "Fulkopi Cares NGO", country: "Bangladesh", tokens: 5000 },
    { id: "190019001900", receiver: "Fulkopi Cares NGO", country: "Bangladesh", tokens: 5000 },
    { id: "190019001900", receiver: "Fulkopi Cares NGO", country: "Bangladesh", tokens: 5000 },
]



export const causeData: Cause[] = [
    { cause: "Disaster Relief", tokens: 1000 },
    { cause: "Education", tokens: 900 },
]

export const beneficiaryData: Cause[] = [
    { cause: "Disaster Relief", tokens: 1000 },
    { cause: "Education", tokens: 900 },
]