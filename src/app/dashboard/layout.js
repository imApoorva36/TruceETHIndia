"use client"

import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
import s from './layout.module.css'

export default function DashboardLayout ({ children }) {
    let router = useRouter()
    let segment = useSelectedLayoutSegment()

    return (
        <main className={s.layout}>
            <div className={s.left}>
                <h1>OrgETH</h1>
                <ul>
                    <li className = {segment == "explore" ? s.active : ""} onClick = {() => router.push("/dashboard/explore")}>Explore</li>
                    <li className = {segment == "organisations" ? s.active : ""}>Your Organisations</li>
                    <li className = {segment == "create" ? s.active : ""} onClick = {() => router.push("/dashboard/create")}>Create Organisation</li>
                </ul>
            </div>
            <div className={s.right}>
                {children}
            </div>
        </main>
    )
}