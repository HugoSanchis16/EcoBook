import { useState } from "react";

const useModalManager = () => {

    const [show, setShow] = useState(false);

    const openModal = () => {
        setShow(true);
    };

    const closeModal = () => {
        setShow(false);
    }

    return {
        show,
        openModal,
        closeModal,
    }
};

export default useModalManager;