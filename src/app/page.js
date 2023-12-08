"use client"

import useWallet from "./_helpers/wallet"
import s from "./home.module.css"

export default function Home () {
	let [ wallet, login, logout ] = useWallet()

	return (
		<main className = {s.home}>
			<div className = {s.content}>
				<h1>OrgETH</h1>
				<h2>Transparent spendings for organisations.</h2>
				<div className={s.buttons}>
					<div className={s.buttons}>
						{
							wallet == null
							?
							<>
								<div className="button bright" onClick={login}>Register</div>
								<div className="button minimal">Login</div>
							</>
							:
							<>
								<div className="button bright">Dashboard</div>
								<div className="button minimal" onClick={logout}>Logout</div>
							</>
						}
					</div>
				</div>
			</div>
		</main>
	)
}