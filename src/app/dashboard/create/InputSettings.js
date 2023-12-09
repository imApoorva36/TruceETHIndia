import { useEffect } from 'react'
import s from './/inputsettings.module.css'

export default function InputSettings ({ groups, setGroups }) {
    useEffect(() => {
        let n = groups.length

        if (n == 0 || groups[n-1] != "") {
            let newGroups = [...groups]
            newGroups.push("")
            setGroups(newGroups)
            return
        }

        if (n>1 && groups[n-2] == "") {
            let newGroups = [...groups]
            newGroups.pop()
            setGroups(newGroups)
        }
    }, [ groups ])

    return (
        <div className={s.settings}>
            { 
                groups.map((group, i) => (
                    <input 
                        type="text" 
                        value = {group} 
                        onChange = {e => setGroups(groups.map((g, j) => i == j ? e.target.value : g))}
                        key = {i}
                    />
                ))
            }
        </div>
    )
}