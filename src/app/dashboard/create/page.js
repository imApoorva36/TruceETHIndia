"use client"

import { createOrganisation } from "@/app/_helpers/organisation"
import s from "./create.module.css"
import { useState } from "react"
import useWallet from "@/app/_helpers/wallet"
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi"
import { ethers } from "ethers"
import InputSettings from "./InputSettings"
import { useRouter } from "next/navigation"

export default function Create () {
    let [ name, setName ] = useState("")
    let [ wallet, login, logout ] = useWallet()
    let [ description, setDescription ] = useState("")
    let [ loadingChannel, setLoadingChannel ] = useState(0)
    let [ groups, setGroups ] = useState([])

    let router = useRouter()


    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();


    async function handleSubmit (e) {
        if (loadingChannel == 2) return

        e.preventDefault()
        setLoadingChannel(1)
        // userAlice.channel.create({options})

        let exists
        try {
            const userAlice = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING })
            let channel = await userAlice.channel.info()
            if (!channel) throw new Error()

            exists = true
        } catch {
            exists = false
        }

        if (!exists) {
            try {    
                const response = await userAlice.channel.create({
                    name: name,
                    description: description,
                    icon: "https://api.dicebear.com/7.x/identicon/svg?seed=" + wallet,
                    url: "https://ethglobal.com/",
                })
            } catch (err) {
                console.log("Error: ", err)
            }
        }

        let res = await createOrganisation(wallet, name, description, window.ethereum)
        setLoadingChannel(2)
    }

    async function createGroups () {
        const userAlice = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });

        const createChannelSettingRes = await userAlice.channel.setting(groups.slice(0, -1).map(group => (
            {
                type: 1, // Boolean type
                default: 0,
                description: group,
            }
        )))

        router.push("/dashboard")        
    }

    return (
        <div className={s.create}>
            <h1>Create Organisation</h1>
            <form>
                <input placeholder="Organisation Name" type="text" value = {name} onChange = {e => setName(e.target.value)} disabled = {loadingChannel == 2}/>
                <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} disabled = {loadingChannel == 2} rows={4}></textarea>
                <div onClick={handleSubmit} className={`button bright ${loadingChannel == 2 ? "disabled" : ""}`} type="submit">Submit</div>
            </form>
            <br />
            { loadingChannel == 1 ? "Loading..." : null}

            {
                loadingChannel == 2 ?
                <div className={s.notifications}>
                    <h2>Add Groups for Notifications</h2>
                    <InputSettings
                        groups = {groups}
                        setGroups = {setGroups}
                    />
                    <div className="button bright" onClick = {createGroups}>Create</div>
                </div>
                : null
            }
        </div>
    )
}