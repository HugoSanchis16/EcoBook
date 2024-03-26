import { useState } from "react";

const useModalManager = () => {

    const [show, setShow] = useState(false);
    const [data, setData] = useState({});

    const openModal = (payload) => {
        setData(payload)
        setShow(true);
    };

    const closeModal = () => {
        setShow(false);
        setData({})
    }

    return {
        show,
        openModal,
        closeModal,
        data
    }
};

export default useModalManager;