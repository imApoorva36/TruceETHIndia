import { useState } from "react"
import s from "./addcategory.module.css"
import { createExpenditureCategory } from "@/app/_helpers/organisation"

export default function AddExpenditure ({ open, close, orgid }) {
    let [ name, setName ] = useState("")

    async function submit () {
        if (name == "") return

        let res = await createExpenditureCategory(orgid, name, window.ethereum)
        setName("")
        close()
    }

    return (
        <div className={`${s.container} ${open ? s.open : ""}`} onClick = {e => close()}>
            <div className={s.modal} onClick = {e => e.stopPropagation()}>
                <h1>Add Expenditure Category</h1>
                <form>
                    <input value = {name} onChange = {e => setName(e.target.value)}></input>
                    <div onClick = {submit} className="button bright">Add</div>
                </form>
            </div>
        </div>
    )
}