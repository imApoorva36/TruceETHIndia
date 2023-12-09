import { ethers } from 'ethers'
import Organisation from '../_contracts/organisation'

export async function getOrganisations (wallet, eth) {
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

export async function getOrganizationDetailsByAddress (wallet, eth) {
    let org = Organisation(eth, false)

    const res = await org.getOrganizationDetailsByAddress(wallet)

    return res
}