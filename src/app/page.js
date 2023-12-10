"use client"

import { useRouter } from "next/navigation"
import useWallet from "./_helpers/wallet"
import s from "./home.module.css"
import Design from "./Design"

export default function Home () {
	let [ wallet, login, logout ] = useWallet()
	let router = useRouter()

	return (
		<main className = {s.home}>
			<Design />
			<div className = {s.content}>
				<img src="/logo.png" alt="" />
				<h2>Tracking Expenses. &nbsp; Empowering Organizations.</h2>
				<div className={s.buttons}>
					<div className={s.buttons}>
						{
							wallet == null
							?
							<>
								<div className="button bright" onClick={login}>Login</div>
							</>
							:
							<>
								<div className="button bright" onClick={() => router.push("/dashboard")}>Dashboard</div>
								<div className="button minimal" onClick={logout}>Logout</div>
							</>
						}
					</div>
				</div>
			</div>
		</main>
	)
}