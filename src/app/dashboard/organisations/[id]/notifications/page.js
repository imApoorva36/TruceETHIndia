"use client"

import { useEffect, useState } from "react"
import s from "./notifications.module.css"
import { getOrganizationDetails } from "@/app/_helpers/organisation"

export default function Notifications ({ params }) {
    let [ group, setGroup ] = useState(null)

    useEffect(() => {
        async function getData () {
            let res = await getOrganizationDetails(params.getOrganizationDetails
                )
        }
        
    }, [])
    return <></>
}