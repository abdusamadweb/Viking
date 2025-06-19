import React, {useEffect} from 'react';
import {Button, Form, Modal, Select} from "antd";
import {validateMessages} from "../../../assets/scripts/global.js";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-hot-toast";
import {$adminResp} from "../../../api/config.js";


// fetch
const fetchEdit = async (body) => {
    const { data } = await $adminResp.post('/transaction/update-transaction', body)
    return data
}


const AddOrUpdateModal = ({ modal, setModal, selectedItem, setSelectedItem, refetch }) => {

    const [form] = Form.useForm()


    // mutate
    const muEdit = useMutation({
        mutationFn: fetchEdit,
        onSuccess: (res) => {
            toast.success(res.message)

            refetch()
        },
        onError: (err) => {
            toast.error(`Ошибка: ${err.response?.data?.message || err.message}`)
        }
    })

    const onFormSubmit = (values) => {
        const body = {
            ...values,
            trans_id: selectedItem.id,
        }

        console.log(body)
        muEdit.mutate(body)
    }


    // form
    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue(selectedItem)
        } else {
            form.resetFields()
        }
    }, [form, selectedItem])


    console.log(selectedItem)


    return (
        <Modal
            rootClassName='admin-modal'
            className='main-modal'
            title={modal === 'add' ? "Qo'shish" : "O'zgartirish"}
            open={modal !== 'close'}
            onCancel={() => {
                setModal('close')
                setSelectedItem(null)
            }}
        >
            <Form
                onFinish={onFormSubmit}
                layout='vertical'
                validateMessages={validateMessages}
                form={form}
            >
                {
                    modal === 'edit' ?
                        <>
                            <Form.Item
                                name='status'
                                label='Status'
                                rules={[{ required: true, message: '' }]}
                            >
                                <Select
                                    size='large'
                                    placeholder="Status"
                                    options={[
                                        {
                                            label: 'reject',
                                            value: 'reject',
                                        },
                                        {
                                            label: 'accept',
                                            value: 'accept',
                                        }
                                    ]}
                                />
                            </Form.Item>
                        </>
                        :
                        <>

                        </>
                }

                <div className='end mt1'>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size='large'
                        // loading={addOrEditMutation?.isPending}
                    >
                        Tasdiqlash
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default AddOrUpdateModal;