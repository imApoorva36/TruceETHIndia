import { ethers } from "ethers"
import ABI from './OrganisationABI.json'

export default function Organisation (eth, signed) {
    let provider = new ethers.providers.Web3Provider(eth)
    return new ethers.Contract(
        "0x59A7bFD7fC5c37a560C93651Fd3B8b1DeE6A4077",
        ABI.abi,
        signed ? provider.getSigner() : provider
    )
}