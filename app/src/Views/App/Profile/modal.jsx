import React, { useRef } from "react";
import { Modal, Button } from "react-bootstrap";

const ImageModal = ({ show, onHide, onSelectImage }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onSelectImage(file);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Select Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <Button onClick={handleFileSelect}>Select Image</Button>
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
