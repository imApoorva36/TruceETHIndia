"use client"

import { getOrganizationDetails } from '@/app/_helpers/organisation'
import s from './organisation.module.css'
import { useEffect, useState } from "react"

export default function Organisation ({ params }) {
    let [ details, setDetails ] = useState(null)

    useEffect(() => {
        async function getData () {
            let res = await getOrganizationDetails(params.id, window.ethereum)
                let data =  {
                    name: res[0],
                    description: res[1],
                    owner: res[2],
                    balance: parseInt(res[3]._hex) * Math.pow(10, -18),
                    incomeCategories: res[4].map((name, i) => {
                        let amt = res[5][i]
                        return {
                            name: name,
                            amount: (amt._hex) * Math.pow(10, -18)
                        }
                    })
                }

            setDetails(data)
        }

        getData()
    }, [])

    return (
        <div className={s.organisation}>
            {
                details != null ?
                <>
                    <div className={s.header}>
                        <img src={"https://api.dicebear.com/7.x/identicon/svg?seed=" + details.owner} alt="" />
                        <h1>{details.name}</h1>
                    </div>
                    <div className={s.details}>
                        <h2><span>Owner:</span> {details.owner}</h2>
                        <p>{details.description}</p>
                    </div>
                    <div className={s.income}>
                        <h2>Income Analysis</h2>
                        <div className={s.table}>
                            <div className={s.heading}>
                                <span>S. No.</span>
                                <span>Category</span>
                                <span>Income</span>
                            </div>
                            {
                                details.incomeCategories.map((d, i) => (
                                    <div>
                                        <span>{i+1}.</span>
                                        <span>{d.name}</span>
                                        <span>{d.amount} ETH</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </>
                : null
            }
        </div>
    )
}