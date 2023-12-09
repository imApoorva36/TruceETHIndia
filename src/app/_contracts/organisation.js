import { ethers } from "ethers"
import ABI from './OrganisationABI.json'

export default function Organisation (eth, signed) {
    let provider = new ethers.providers.Web3Provider(eth)
    return new ethers.Contract(
        "0x0d8d3fFBAf40eCd4958A53ba0AE72e1bD7083921",
        ABI.abi,
        signed ? provider.getSigner() : provider
    )
}