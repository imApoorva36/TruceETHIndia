"use client"

import { useEffect, useState } from "react"
import s from "./notify.module.css"
import { ethers } from "ethers"
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi"
import { useRouter } from "next/navigation"

export default function Notify ({ params }) {
    let [ title, setTitle ] = useState("")
    let [ body, setBody ] = useState("")
    let [ groups, setGroups ] = useState([])
    let [ selected, setSelected ] = useState([])
    let router = useRouter()

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    useEffect(() => {
        async function getData () {
            const userAlice = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });

            let info = await userAlice.channel.info()
            let settings = JSON.parse(info.channel_settings)

            setGroups(settings.map(setting => setting.description))
        }

        getData()
    }, [])

    async function handleSend () {
        const userAlice = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });

        const sendNotifRes = await userAlice.channel.send(["*"], {
            notification: { title, body },
            payload: { category: selected[0] }
        })

        alert("Notification sent!")
        router.push("/dashboard/organisations/"+params.id)
    }

    function handleClick (i) {
        let index = selected.indexOf(i)
        if (index == -1) {
            setSelected([...selected, i])
            return
        }
        let newSelected = [...selected]
        newSelected.splice(index, 1)
        setSelected(newSelected)
    }

    return (
        <div className={s.notify}>
            <h1>Milestone Notification</h1>

            <form>
                <input placeholder = "Title" type="text" value = {title} onChange = {e => setTitle(e.target.value)} />
                <textarea placeholder="Message" type="text" value = {body} onChange = {e => setBody(e.target.value)} rows = {4}/>
                <div className={s.checkboxes}>
                    {
                        groups.map((g, i) => {
                            return (
                                <div className={s.checkbox} onClick={() => handleClick(i+1)}>
                                    <input type = "checkbox" checked = {selected.includes(i+1)} />
                                    {g}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="button bright" onClick={handleSend}>Send</div>
            </form>
        </div>
    )
}