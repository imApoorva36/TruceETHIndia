"use client"

import { useEffect, useState } from "react"
import useWallet from "../_helpers/wallet"
import s from "./dashboard.module.css"
// import { useRouter } from "next/router"
import { createOrganisation, getOrganisations, getOrganizationsByAddress, sendFunds } from "../_helpers/organisation"

export default function Dashboard () {
    let [ wallet, login, logout ] = useWallet()
    let [ orgs, setOrgs ] = useState([])
    // let router = useRouter()
    let [ name, setName ] = useState("")
    let [ id, setId ] = useState("")

    async function handleGet () { 
        let value = await getOrganisations(wallet, window.ethereum)
        console.log(value)
    }

    async function handleSubmit (e) {
        e.preventDefault()

        let hash = await createOrganisation(wallet, name, "description", window.ethereum)
        console.log(hash)
    }

    async function byID () {
        let res = await getOrganizationsByAddress(wallet, window.ethereum)
        console.log(res)
    }

    async function handleSendMoney (e) {
        e.preventDefault()
        let res = await sendFunds(wallet, id, "0.001", window.ethereum)
        console.log(res)
    }

    return (
        <main className={s.dashboard}>
            <form onSubmit={handleSubmit}>
                <input type="text" value = {name} onChange = {e => setName(e.target.value)} />
                <button type="submit">Submit</button>
            </form>

            <button onClick={handleGet}>get</button>
            <button onClick={byID}>BY ID</button>

            <br /><br /><br />

            <form onSubmit = {handleSendMoney}>
                <input type="text" value = {id} onChange={e => setId(e.target.value)}/>
                <button type="submit">Send</button>
            </form>
        </main>

    )
}