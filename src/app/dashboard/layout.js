"use client"

import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
import s from './layout.module.css'

export default function DashboardLayout ({ children }) {
    let segment = useSelectedLayoutSegment()

    return (
        <main className={s.layout}>
            <div className={s.left}>
                <h1>OrgETH</h1>
                <ul>
                    <li className = {segment == "explore" ? s.active : ""}>Explore</li>
                    <li className = {segment == "organisations" ? s.active : ""}>Your Organisations</li>
                </ul>
            </div>
            <div className={s.right}>
                {children}
            </div>
        </main>
    )
}