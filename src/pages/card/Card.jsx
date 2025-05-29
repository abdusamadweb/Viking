import './Card.scss'
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import card from '../../assets/images/card-icon.svg';
import uzcard from '../../assets/images/uzcard-icon.svg';
import humo from '../../assets/images/humo-icon.svg';
import DeleteModal from "./modals/DeleteModal.jsx";
import AddDrawer from "./modals/AddDrawer.jsx";
import {$resp} from "../../api/config.js";
import {useMutation, useQuery} from "@tanstack/react-query";
import CardEmpty from "./CardEmpty.jsx";
import {deleteDataUser} from "../../api/crud.js";
import {toast} from "react-hot-toast";


// fetch
const fetchCards = async () => {
    const { data } = await $resp.get(`/user-card/my-cards?page=1&limit=30`)
    return data
}


const Card = () => {

    const navigate = useNavigate()

    const [modal, setModal] = useState('close')
    const [selItem, setSelItem] = useState(null)


    // fetch
    const { data: cards, refetch } = useQuery({
        queryKey: ['cards'],
        queryFn: fetchCards,
        keepPreviousData: true,
    })
    useEffect(() => {
        if (cards) localStorage.setItem('cards', JSON.stringify(cards?.data))
    }, [cards])


    // delete
    const deleteMutation = useMutation({
        mutationFn: () => deleteDataUser('user-card', selItem?.id),
        onSuccess: async () => {
            await refetch()
            toast.success('Ochirildi!')

            setSelItem(null)
            setModal('close')
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })

    const deleteItem = (id) => {
        deleteMutation.mutate(id)
    }


    return (
        <div className='card-page'>
            <div className="container">
                <div className="card-page__head">
                    <div className="titles row align-center between g10">
                        <div className="row align-center g1">
                            <button className='back' onClick={() => navigate(-1)}>
                                <i className="fa-solid fa-circle-chevron-left"/>
                            </button>
                            <span>Мои карты</span>
                        </div>
                        <button className="btn" onClick={() => setModal('add')}>
                            <i className="fa-solid fa-circle-plus"/>
                        </button>
                    </div>
                </div>
                <div className="card-page__body">
                    {
                        cards?.data?.length ?
                            <ul className="list flex-column g1">
                                {
                                    cards?.data?.map(i => (
                                        <li className='item' key={i.id}>
                                            <div className="row align-center g10">
                                                <div className="imgs">
                                                    <img src={i.card_img === 'humo' ? humo : i.card_img === 'uzcard' ? uzcard : card} alt="humo"/>
                                                </div>
                                                <div>
                                                    <p className="name">{ i.name || 'Основная карта' }</p>
                                                    <span className="number">{ i.number }</span>
                                                </div>
                                            </div>
                                            <div className="btns">
                                                <button className="btn" onClick={() => {
                                                    setSelItem(i)
                                                    setModal('edit')
                                                }}>
                                                    <i className="fa-solid fa-pen"/>
                                                </button>
                                                <button className="btn" onClick={() => {
                                                    setSelItem(i)
                                                    setModal('delete')
                                                }}>
                                                    <i className="fa-solid fa-trash-can"/>
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            :
                            <CardEmpty setModal={setModal} />
                    }
                </div>
            </div>

            <DeleteModal
                modal={modal}
                setModal={setModal}
                deleteItem={deleteItem}
                deleteMutation={deleteMutation}
            />
            <AddDrawer
                modal={modal}
                setModal={setModal}
                selItem={selItem}
                setSelItem={setSelItem}
                refetch={refetch}
            />
        </div>
    );
};

export default Card;