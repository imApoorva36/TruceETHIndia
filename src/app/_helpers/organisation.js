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

export async function getOrganizationDetails (id, eth) {
    let org = Organisation(eth, false)
    return await org.getOrganizationDetails(id)
}

export async function createCategory (org_id, name, eth) {
    let org = Organisation(eth, true)

    const txHash = await org.createCategory(org_id, name, {
        gasLimit: 300000
    })

}

export async function sendFunds (org_id, cat_id, amt, eth) {
    let org = Organisation(eth, true)
    return await org.sendFunds(org_id, cat_id, {
        value: ethers.utils.parseEther(amt)
    })
}


export async function createExpenditureCategory (org_id, name, eth) {
    let org = Organisation(eth, true)

    const txHash = await org.createExpenditureCategory(org_id, name, {
        gasLimit: 300000
    })

}

export async function OrganisationExpenditure (org_id, cat_id, amt, det_addr, eth) {
    let org = Organisation(eth, true)

    const txHash = await org.OrganizationSpend(org_id, cat_id, det_addr, parseFloat(amt) * Math.pow(10, 18), {
        gasLimit: 300000
    })
}
