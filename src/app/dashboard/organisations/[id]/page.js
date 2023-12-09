"use client"

import { sendFunds } from "@/app/_helpers/organisation"
import { useState } from "react"

export default function Organisation ({ params }) {
    let [ value, setValue ] = useState("")

    async function handleSendMoney (e) {
        e.preventDefault()

        let res = await sendFunds(params.id, value, window.ethereum)
        console.log(res)
    }

    return (
        <form onSubmit = {handleSendMoney}>
            <input type="text" value = {value} onChange={e => setValue(e.target.value)}/>
            <button type="submit">Send</button>
        </form>
    )
}