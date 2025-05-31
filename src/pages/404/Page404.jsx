import './Page404.scss'
import React from 'react';
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";

const Page404 = () => {

    const navigate = useNavigate()


    return (
        <div className="p404 page">
            <div className="container">
                <Result
                    status="404"
                    // title="404"
                    // subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}
                />
            </div>
        </div>
    );
};

export default Page404;