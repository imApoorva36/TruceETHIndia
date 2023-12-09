"use client"

import s from './organisation.module.css'
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
        <div className={s.organisation}>
            
        </div>
    )
}