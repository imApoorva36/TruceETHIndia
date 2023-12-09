"use client"

import { createOrganisation } from "@/app/_helpers/organisation"
import s from "./create.module.css"
import { useState } from "react"
import useWallet from "@/app/_helpers/wallet"
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi"
import { ethers } from "ethers"
import InputSettings from "./InputSettings"

export default function Create () {
    let [ name, setName ] = useState("")
    let [ wallet, login, logout ] = useWallet()
    let [ description, setDescription ] = useState("")
    let [ loadingChannel, setLoadingChannel ] = useState(0)
    let [ groups, setGroups ] = useState([])


    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();


    async function handleSubmit (e) {
        e.preventDefault()
        setLoadingChannel(1)
        // userAlice.channel.create({options})

        const userAlice = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });


         // Create a channel
        try {    
            const response = await userAlice.channel.create({
                name: name,
                description: description,
                icon: "https://api.dicebear.com/7.x/identicon/svg?seed=" + wallet,
                url: "https://ethglobal.com/",
            })

            setLoadingChannel(2)
        } catch (err) {
            console.log("Error: ", err)
        }
    }

    async function createGroups () {
        let groupDetails = [...groups]
        groupDetails.slice(0, -1)
        const userAlice = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });

        const createChannelSettingRes = await userAlice.channel.setting(groupDetails.map(group => (
            {
                type: 1, // Boolean type
                default: 0,
                description: group,
            }
        )));

    }

    return (
        <div className={s.create}>
            <form onSubmit={handleSubmit}>
                <input type="text" value = {name} onChange = {e => setName(e.target.value)} disabled = {loadingChannel == 2}/>
                <textarea value={description} onChange={e => setDescription(e.target.value)} disabled = {loadingChannel == 2}></textarea>
                <button type="submit" disabled = {loadingChannel == 2}>Submit</button>
            </form>
            <br />
            { loadingChannel == 1 ? "Loading..." : null}

            {
                loadingChannel == 2 ?
                <>
                    <h2>Add Groups for Notifications</h2>
                    <InputSettings
                        groups = {groups}
                        setGroups = {setGroups}
                    />
                    <button onClick = {createGroups}>Create</button>
                </>
                : null
            }
        </div>
    )
}