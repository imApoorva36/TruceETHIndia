import { ethers } from "ethers"
import { useEffect, useState } from "react"
import Web3 from "web3"

export default function useWallet () {
    let [ address, setAddress ] = useState(localStorage.getItem("wallet_address"))

    function setWallet (address) {
        localStorage.setItem("wallet_address", address)
        setAddress(address)
    }

    async function login () {
        if (window.ethereum) {
            try {
              await window.ethereum.request({ method: 'eth_requestAccounts' });
              const web3 = new Web3(window.ethereum);
    
              const accounts = await web3.eth.getAccounts();
              setWallet(accounts[0])

            } catch (error) {
              throw new Error("Access Denied")
            }

        } else {
            throw new Error("Metamask not installed")
        }
    }

    async function logout () {
        setWallet(null)
    }
    return [ address, login, logout ]
}