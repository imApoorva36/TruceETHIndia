"use client"

import { createOrganisation } from "@/app/_helpers/organisation"
import s from "./create.module.css"
import { useState } from "react"
import useWallet from "@/app/_helpers/wallet"

export default function Create () {
    let [ name, setName ] = useState("")
    let [ wallet, login, logout ] = useWallet()

    async function handleSubmit (e) {
        e.preventDefault()

        let hash = await createOrganisation(wallet, name, "description", window.ethereum)
        console.log(hash)
    }

    return (
        <div className={s.create}>
            <form onSubmit={handleSubmit}>
                <input type="text" value = {name} onChange = {e => setName(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}