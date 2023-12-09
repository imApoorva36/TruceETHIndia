import { useState } from "react"
import s from "./addcategory.module.css"
import { createCategory } from "@/app/_helpers/organisation"

export default function AddIncome ({ open, close, orgid }) {
    let [ name, setName ] = useState("")

    async function submit () {
        if (name == "") return

        let res = await createCategory(orgid, name, window.ethereum)
        setName("")
        close()
    }

    return (
        <div className={`${s.container} ${open ? s.open : ""}`} onClick = {e => close()}>
            <div className={s.modal} onClick = {e => e.stopPropagation()}>
                <h1>Add Fuding Category</h1>
                <form>
                    <input value = {name} onChange = {e => setName(e.target.value)}></input>
                    <div onClick = {submit} className="button bright">Add</div>
                </form>
            </div>
        </div>
    )
}