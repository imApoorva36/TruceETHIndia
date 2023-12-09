import s from './listitem.module.css'

export default function ListItem ({ data }) {
    return (
        <div className={s.item}>
            <div className={s.left}>
                <img
                    src = {"https://api.dicebear.com/7.x/identicon/svg?seed=" + data.owner + data.id}
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