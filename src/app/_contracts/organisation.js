import { ethers } from "ethers"
import ABI from './OrganisationABI.json'

export default function Organisation (eth, signed) {
    let provider = new ethers.providers.Web3Provider(eth)
    return new ethers.Contract(
        "0x15fA8E056244EFe7C505F00ea91a7DDa6eBF9e16",
        ABI.abi,
        signed ? provider.getSigner() : provider
    )
}