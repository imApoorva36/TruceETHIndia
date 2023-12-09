import { ethers } from "ethers"
import ABI from './OrganisationABI.json'

export default function Organisation (eth, signed) {
    let provider = new ethers.providers.Web3Provider(eth)
    return new ethers.Contract(
        "0x7BEeCf9462C19B92f0037EeA0c2Ae1060486B927",
        ABI.abi,
        signed ? provider.getSigner() : provider
    )
}