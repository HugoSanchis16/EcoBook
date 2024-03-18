import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import EmojiButton from "../../Components/Buttons/EmojiButton";
import FormControl from "../../Components/Form/FormControl/FormControl";
import { Endpoints, getEndpoint } from "../../Constants/endpoints.contants";
import useNotification from "../../Hooks/useNotification";
import useRequest from "../../Hooks/useRequest";
import ModalLayout from "../../Layouts/ModalLayout/ModalLayout";

const NewWikiModal = ({ show, onClose }) => {
  const request = useRequest();

  const { board_guid } = useParams();

  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({
    title: "",
  });

  const handleSubmit = (e) => {
    e && e.preventDefault();
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.Board.wiki.newFile), {
        ...data,
        guid: board_guid,
      })
        .catch((err) => errorNotification(err.message))
        .finally(() => hideModal());
    } else errorNotification("Check required fields");
  };

  const handleText = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const hideModal = () => {
    onClose();
    setData({});
  };

  const checkForm = () => {
    const { title } = data;
    return !!title;
  };

  return (
    <ModalLayout
      show={show}
      onHide={hideModal}
      header={true}
      customHeader={
        <div className="d-flex align-items-center">
          <EmojiButton emoji="📄" />
          <Modal.Title className="ms-2">New File</Modal.Title>
        </div>
      }
      closeButton={true}
    >
      <div className="mb-2 w-100 d-flex flex-column align-items-center">
        <FormControl
          id="title"
          title="Title:"
          value={data.title}
          onChange={handleText}
          autoFocus={true}
          placeholder="Type a title..."
        />
      </div>
      <div className="d-flex justify-content-end">
        <Button variant="light" size="sm" onClick={hideModal}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!checkForm()}
          variant="light"
          size="sm"
        >
          Save
        </Button>
      </div>
    </ModalLayout>
  );
};

export default NewWikiModal;
