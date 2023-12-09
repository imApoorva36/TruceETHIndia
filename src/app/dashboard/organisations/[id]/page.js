"use client"
import { getOrganizationDetails, createCategory} from '@/app/_helpers/organisation'
import s from './organisation.module.css'
import { useEffect, useState } from "react"
import Modal from './paymodal'

export default function Organisation ({ params }) {
    let [ details, setDetails ] = useState(null)
    let [isModalOpen, setIsModalOpen] = useState(-1);
    let [selectedCategory, setSelectedCategory] = useState('');

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
                    })
                }

            setDetails(data)
        }

        getData()
    }, [])
    const openModal = (category, i) => {
        setSelectedCategory(category);
        setIsModalOpen(i);
      };
    
      // Function to close the modal
      const closeModal = () => {
        setIsModalOpen(-1);
        setSelectedCategory('');
      };
    return (
        <div className={s.organisation}>
            {
                details != null ?
                <>
                    <div className={s.header}>
                        <img src={"https://api.dicebear.com/7.x/identicon/svg?seed=" + details.owner} alt="" />
                        <h1>{details.name}</h1>
                    </div>
                    <div className={s.details}>
                        <div className={s.detailsleft}>
                            <h2><span>Owner:</span> {details.owner}</h2>
                            <p>{details.description}</p>
                        </div>
                    </div>
                    <div className={s.income}>
                        <div className={s.head}>
                            <h2>Income Analysis</h2>
                            <button className={s.formalButton} onClick={createCategory}>Add an income Category ? </button>
                        </div><br />
                        <div className={s.table}>
                            <div className={s.heading}>
                                <span>S. No.</span>
                                <span>Category</span>
                                <span>Income</span>
                            </div>
                            {
                                details.incomeCategories.map((d, i) => (
                                    <div>
                                        <span>{i+1}.</span>
                                        <span>{d.name}</span>
                                        <span>{d.amount} ETH 
                                        <button id='modal-root' onClick={() => openModal(d.name, i)}>Payment</button>
                                            <div>
                                            <Modal isOpen={isModalOpen == i} closeModal={closeModal} category={selectedCategory} />
                                            </div>
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className={s.income}>
                        <h2>Expenditure Analysis</h2><br />
                        <div className={s.head}>
                            <button className={s.formalButton} onClick={createCategory}>Add an expenditure  Category ? </button>
                        </div><br />
                        <div className={s.table}>
                            <div className={s.heading}>
                                <span>S. No.</span>
                                <span>Category</span>
                                <span>Expenditure</span>
                            </div>
                            {
                                details.incomeCategories.map((d, i) => (
                                    <div>
                                        <span>{i+1}.</span>
                                        <span>{d.name}</span>
                                        <span>{d.amount} ETH 
                                        <button id='modal-root' onClick={() => openModal(d.name, i)}>Payment</button>
                                            <div>
                                            <Modal isOpen={isModalOpen == i} closeModal={closeModal} category={selectedCategory} />
                                            </div>
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