import './Card.scss'
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import humo from '../../assets/images/humo-icon.svg';
import uzcard from '../../assets/images/uzcard-icon.svg';
import card from '../../assets/images/card-icon.svg';
import DeleteModal from "./modals/DeleteModal.jsx";
import AddDrawer from "./modals/AddDrawer.jsx";
import {$resp} from "../../api/config.js";
import {useQuery} from "@tanstack/react-query";
import CardEmpty from "./CardEmpty.jsx";
import {useCrud} from "../../hooks/useCrud.jsx";
import {Form} from "antd";
import {addOrEdit, deleteData} from "../../api/crud.js";


// fetch
const fetchCards = async () => {
    const { data } = await $resp.post(`/user-card/my-cards?page=1&limit=30`)
    return data
}


const Card = () => {

    const [form] = Form.useForm()
    const navigate = useNavigate()

    const [modal, setModal] = useState('close')
    const [selItem, setSelItem] = useState(null)


    // fetch
    const { data: cards, refetch } = useQuery({
        queryKey: ['cards'],
        queryFn: fetchCards,
        keepPreviousData: true,
    })


    // add & edit
    const {
        addOrEditMutation,
        deleteMutation
    } = useCrud('user-card', {
        refetch,
        form,
        setModal,
        setSelItem,
        addOrEdit,
        deleteData
    })

    const onFormSubmit = (values) => {
        const body = {
            ...values,
        }

        addOrEditMutation.mutate({
            values: body,
            selItem
        })
    }

    const deleteItem = (id) => {
        deleteMutation.mutate(id)
    }


    // form
    useEffect(() => {
        if (selItem) {
            form.setFieldsValue(selItem)
        } else {
            form.resetFields()
        }
    }, [form, selItem])


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
                                                    <img src={i.icon || card} alt="humo"/>
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
                    <ul className="list flex-column g1">
                        <li className="item">
                            <div className="row align-center g10">
                                <div className="imgs">
                                    <img src={humo} alt="humo"/>
                                </div>
                                <div>
                                    <p className="name">Основная карта</p>
                                    <span className="number">**** **** 3215</span>
                                </div>
                            </div>
                            <div className="btns">
                                <button className="btn" onClick={() => setModal('edit')}>
                                <i className="fa-solid fa-pen"/>
                                </button>
                                <button className="btn" onClick={() => setModal('delete')}>
                                    <i className="fa-solid fa-trash-can"/>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <DeleteModal modal={modal} setModal={setModal} />
            <AddDrawer
                modal={modal}
                setModal={setModal}

            />
        </div>
    );
};

export default Card;