import { useRouter } from 'next/navigation'
import s from './listitem.module.css'

export default function ListItem ({ data }) {
    let router = useRouter()

    return (
        <div className={s.item}>
            <div className={s.left} onClick={() => router.push("/dashboard/organisations/"+data.id)}>
                <img
                    src = {"https://api.dicebear.com/7.x/identicon/svg?seed=" + data.owner}
                    alt = ""
                />
                <div className={s.details}>
                    <h2>{data.name}</h2>
                    <p>{data.owner}</p>
                </div>
            </div>
            <div className={s.balance}>
                {data.balance} ETH
            </div>
        </div>
    )
}