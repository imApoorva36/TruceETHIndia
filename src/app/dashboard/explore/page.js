"use client"

import { useEffect, useState } from "react"
import useWallet from "../../_helpers/wallet"
import s from "./dashboard.module.css"
import { createOrganisation, getOrganisations, getOrganizationsByAddress, sendFunds } from "../../_helpers/organisation"
import ListItem from "./ListItem"
// import { useRouter } from "next/router"

export default function Dashboard () {
    let [ wallet, login, logout ] = useWallet()
    let [ orgs, setOrgs ] = useState([])
    // let router = useRouter()
    let [ id, setId ] = useState("")

    useEffect(() => {
        async function getData () {
            let res = await getOrganisations(window.ethereum)
            let n = res[0].length
            let details = (new Array(n)).fill(false).map((e, i) => {
                return {
                    id: i,
                    name: res[0][i],
                    description: res[1][i],
                    owner: res[2][i],
                    balance: parseInt(res[3][i]._hex) * Math.pow(10, -18)
                }
            })


            setOrgs(details)
        }
        
        getData()
    }, [])

    async function handleGet () { 
        let value = await getOrganisations(window.ethereum)
        console.log(value)
    }



    async function byID () {
        let res = await getOrganizationsByAddress(wallet, window.ethereum)
        console.log(res)
    }



    return (
        <main className={s.dashboard}>
            {/*

            <button onClick={handleGet}>get</button>
            <button onClick={byID}>BY ID</button>

            <br /><br /><br />

            <form onSubmit = {handleSendMoney}>
                <input type="text" value = {id} onChange={e => setId(e.target.value)}/>
                <button type="submit">Send</button>
            </form> */}

            <h1>Explore Organisations</h1>
            <ul>
                {
                    orgs.map(data => <ListItem data = {data} key = {data.id} />)
                }
            </ul>
        </main>

    )
}