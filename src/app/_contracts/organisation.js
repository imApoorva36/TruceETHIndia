import { ethers } from "ethers"
import ABI from './OrganisationABI.json'

export default function Organisation (eth, signed) {
    let provider = new ethers.providers.Web3Provider(eth)
    return new ethers.Contract(
        "0x58Ba5d5023DC47117aD800C5706D502388447be6",
        ABI.abi,
        signed ? provider.getSigner() : provider
    )
}