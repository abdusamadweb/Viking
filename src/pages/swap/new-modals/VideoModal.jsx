import React from 'react';
import {Modal} from "antd";
import {Tr} from "../../../components/translator/Tr.js";

const VideoModal = ({ modal, setModal }) => {
    return (
        <Modal
            rootClassName='main-modal'
            className='success-modal video-modal'
            open={modal === 'video'}
            onCancel={() => setModal('close')}
            centered
            closeIcon={false}
        >
            <div>
                <p className="title"><Tr val='Как получить код?' /></p>
                <iframe
                    className='iframe'
                    allowFullScreen
                    src="https://www.youtube.com/embed/VQRLujxTm3c?si=GHXQUpaREsDmWhCZ"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                />
                <div className="btns">
                    <button className='btn' onClick={() => setModal('close')}><Tr val='Закрыть' /></button>
                </div>
            </div>
        </Modal>
    );
};

export default VideoModal;