import { ethers } from "ethers"
import ABI from './OrganisationABI.json'

export default function Organisation (eth, signed) {
    let provider = new ethers.providers.Web3Provider(eth)
    return new ethers.Contract(
        "0x40EAD338Ee286cA8fc18Bb5BaF7327499Fd26B3E",
        ABI.abi,
        signed ? provider.getSigner() : provider
    )
}