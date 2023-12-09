"use client"
import { getOrganizationDetails, createCategory} from '@/app/_helpers/organisation'
import s from './organisation.module.css'
import { useEffect, useState } from "react"
import Modal from './paymodal'
import useWallet from '@/app/_helpers/wallet'
import { useRouter } from 'next/navigation'
import AddIncome from './AddIncome'
import AddExpenditure from './AddExpenditure'

export default function Organisation ({ params }) {
    let router = useRouter()

    let [ details, setDetails ] = useState(null)
    let [ isIModalOpen, setIsIModalOpen] = useState(-1);
    let [ selectedICategory, setSelectedICategory] = useState('');
     
    let [ isEModalOpen, setIsEModalOpen] = useState(-1);
    let [ selectedECategory, setSelectedECategory] = useState('');

    let [ addIncome, setAddIncome ] = useState(false)
    let [ addExpenditure, setAddExpenditure] = useState(false)
    
    let [ wallet, login, logout ] = useWallet()

    let owner = wallet == details?.owner

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
                }),
                expenditureCategories: res[6].map((name, i) => {
                    let amt = res[7][i]
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

    const openIModal = (category, i) => {
        setSelectedICategory(category);
        setIsIModalOpen(i);
      };
    
      // Function to close the modal
      const closeIModal = () => {
        setIsIModalOpen(-1);
        setSelectedICategory('');
      };

    const openEModal = (category, i) => {
        setSelectedECategory(category);
        setIsEModalOpen(i);
      };
    
      // Function to close the modal
      const closeEModal = () => {
        setIsEModalOpen(-1);
        setSelectedECategory('');
      };
    return (
        <div className={s.organisation}>
            
            <AddIncome
                open = {addIncome} 
                close = {() => setAddIncome(false)} 
                orgid = {params.id}
            />

            <AddExpenditure
                open = {addExpenditure} 
                close = {() => setAddExpenditure(false)} 
                orgid = {params.id}
            />

            {
                details != null ?
                <>
                    <div className={s.header}>
                        <div className={s.left}>
                            <img src={"https://api.dicebear.com/7.x/identicon/svg?seed=" + details.owner} alt="" />
                            <h1>{details.name}</h1>
                        </div>
                        <div className={s.right}>
                            <div className="button minimal" onClick={() => router.push(`/dashboard/organisations/${params.id}/notifications`)}>
                                Opt-in
                            </div>
                        </div>
                    </div>
                    <div className={s.details}>
                        <div className={s.detailsleft}>
                            <h2><span>Owner:</span> {details.owner}</h2>
                            <p>{details.description}</p>
                        </div>
                    </div>
                    <div className={s.income}>
                        <div className={s.head}>
                            <h2>Fund Analysis</h2>
                            <div className="button bright" onClick={() => setAddIncome(true)}>Add Funding Category</div>
                        </div><br />
                        <div className={s.table}>
                            <div className={s.heading}>
                                <span>S. No.</span>
                                <span>Category</span>
                                <span>Amount</span>
                            </div>
                            {
                                details.incomeCategories.map((d, i) => (
                                    <div key = {i}>
                                        <span>{i+1}.</span>
                                        <span>{d.name}</span>
                                        <span className={s.pay_button}>{d.amount} ETH 
                                            { owner ? null : 
                                                <>
                                                    <div onClick={() => openIModal(d.name, i)}>
                                                        <span className="material-symbols-outlined">
                                                            currency_rupee
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <Modal isOpen={isIModalOpen == i} closeModal={closeIModal} category={selectedICategory} catid = {i} orgid = {params.id} />
                                                    </div>
                                                </>
                                            }
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={s.income}>
                        <div className={s.head}>
                            <h2>Expenditure Analysis</h2>
                            <div className="button bright" onClick={() => setAddExpenditure(true)}>Add Expenditure Category</div>
                        </div><br />
                        <div className={s.table}>
                            <div className={s.heading}>
                                <span>S. No.</span>
                                <span>Category</span>
                                <span>Expenditure</span>
                            </div>
                            {
                                details.expenditureCategories.map((d, i) => (
                                    <div key = {i}>
                                        <span>{i+1}.</span>
                                        <span>{d.name}</span>
                                        <span className={s.pay_button}>{d.amount} ETH 
                                            {
                                                owner ? 
                                                <>
                                                    <div onClick={() => openEModal(d.name, i)}>
                                                        <span className="material-symbols-outlined">
                                                            currency_rupee
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <Modal isOpen={isEModalOpen == i} closeModal={closeEModal} category={selectedECategory} catid = {i} orgid = {params.id} />
                                                    </div>
                                                </>
                                                : null
                                            }
                                        </span>
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