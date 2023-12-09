"use client"

import { useEffect, useState } from "react"
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";
import s from "./notifications.module.css"
import { getOrganizationDetails } from "@/app/_helpers/organisation"

export default function Notifications ({ params }) {
    let [ group, setGroup ] = useState(null)

    useEffect(() => {
        async function getData () {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const userAlice = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });
            const aliceSubscriptions = await userAlice.notification.subscriptions();
            console.log(aliceSubscriptions);

            const channelAddresses = aliceSubscriptions.map(subscription => subscription.channel);

            // Current wallet address (replace this with your actual wallet address)
            const currentWalletAddress = "0xf00b9A1a33703159D76255900535d9bccA431F5B";

            const isMatch = channelAddresses.some(address => address.toLowerCase() === currentWalletAddress.toLowerCase());

            if (isMatch) {
            console.log("Match found! The wallet address is subscribed to one of the channels.");
            } else {
            console.log("No match found. The wallet address is not subscribed to any of the channels.");
            }

        }  
        getData();   
    }, [])
    return <></>
}