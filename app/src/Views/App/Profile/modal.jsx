import React, { useRef } from "react";
import { Modal, Button } from "react-bootstrap";

const ImageModal = ({ show, onHide, onSelectImage }) => {
  const fileInputRef = useRef(null);

  // Función para manejar la selección de archivo
  const handleFileSelect = () => {
    fileInputRef.current.click(); // Abre el selector de archivos al hacer clic en el botón oculto
  };

  // Función para manejar el cambio de archivo seleccionado
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Obtiene el primer archivo seleccionado
    onSelectImage(file); // Llama a la función onSelectImage con el archivo seleccionado
    onHide(); // Cierra el modal después de seleccionar el archivo
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Select Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Input oculto para seleccionar archivo */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* Botón para abrir el selector de archivos */}
        <Button onClick={handleFileSelect}>Select Image</Button>
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
