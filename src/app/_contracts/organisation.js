import { ethers } from "ethers"
import ABI from './OrganisationABI.json'

export default function Organisation (eth, signed) {
    let provider = new ethers.providers.Web3Provider(eth)
    return new ethers.Contract(
        "0xDC27EC3413aAada135F76a8121B4f671A14B1C06",
        ABI.abi,
        signed ? provider.getSigner() : provider
    )
}