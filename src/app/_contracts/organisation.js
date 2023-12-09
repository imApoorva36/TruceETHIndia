import { ethers } from "ethers"
import ABI from './OrganisationABI.json'

export default function Organisation (eth, signed) {
    let provider = new ethers.providers.Web3Provider(eth)
    return new ethers.Contract(
        "0x7E4386552449c9E34C74a157A06066DB56eFb372",
        ABI.abi,
        signed ? provider.getSigner() : provider
    )
}