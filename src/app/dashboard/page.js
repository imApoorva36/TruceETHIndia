"use client"

import { useEffect, useState } from "react"
import useWallet from "../_helpers/wallet"
import s from "./dashboard.module.css"
// import { useRouter } from "next/router"
import { createOrganisation, getOrganisations, getOrganizationDetailsByAddress } from "../_helpers/organisation"

export default function Dashboard () {
    let [ wallet, login, logout ] = useWallet()
    let [ orgs, setOrgs ] = useState([])
    // let router = useRouter()
    let [ name, setName ] = useState("")

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
        let res = await getOrganizationDetailsByAddress(wallet, window.ethereum)
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
        </main>

    )
}