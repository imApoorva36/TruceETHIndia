import { ethers } from 'ethers'
import Organisation from '../_contracts/organisation'

export async function getOrganisations (eth) {
    let value = await Organisation(eth, false).getAllOrganizations()
    return value
}

export async function createOrganisation (wallet, name, desc, eth) {
    let org = Organisation(eth, true)

    const txHash = await org.registerOrganization(name, desc, wallet, {
        gasLimit: 300000
    })

    return txHash
}

export async function getOrganizationsByAddress (wallet, eth) {
    let org = Organisation(eth, false)

    const res = await org.getOrganizationsByAddress(wallet)

    return res
}

export async function sendFunds (id, amt, eth) {
    let org = Organisation(eth, true)
    return await org.sendFunds(id, {
        value: ethers.utils.parseEther(amt)
    })
}

export async function getOrganizationDetails (id, eth) {
    let org = Organisation(eth, false)
    return await org.getOrganizationDetails(id)
}