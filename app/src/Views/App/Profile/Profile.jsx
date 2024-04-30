import { useContext, useEffect, useState } from "react";
import useRequest from "../../../Hooks/useRequest";
import useNotification from "../../../Hooks/useNotification";
import useLoaded from "../../../Hooks/useLoaded";
import PanelLayout from "../../../Layouts/PanelLayout/PanelLayout";
import GeneralLayout from "../../../Layouts/GeneralLayout/GeneralLayout";
import { StringsContext } from "../../../Context/strings.context";
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import FormControl from "../../../Components/Form/FormControl/FormControl";
import { validateData } from "../../../Config/GeneralFunctions";
import { Button, Image, Row, Col } from "react-bootstrap";
import { PhoneRegexSpain } from "../../../Utils/Regex";
import SectionLayout from "../../../Layouts/SectionLayout/SectionLayout";
import adventure from "./adventure.jpg";
import ImageModal from "./modal";

const Profile = () => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.User.Profile;
  const GeneralStrings = strings.General.App;

  const request = useRequest();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const { startFetching, finishFetching, fetching, loaded } = useLoaded();

  const [profile, setProfile] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    startFetching();
    return await request("get", getEndpoint(Endpoints.user.profile.get))
      .then((res) => {
        setProfile(res.profile);
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  const handleSubmit = () => {
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.user.editUser.update), {
        ...profile,
      })
        .then(() => {
          successNotification(ViewStrings.messages.profileUpdated);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification("Check all input fields");
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setProfile({ ...profile, [id]: value });
  };

  const checkForm = () => {
    const { name, surnames, phone } = profile;
    return validateData([name, surnames, phone]) && PhoneRegexSpain.test(phone);
  };

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const handleClick = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Función para manejar la selección de imagen
  const handleSelectImage = () => {
    // Aquí puedes implementar la lógica para seleccionar una imagen
    // Por ahora, solo cerraremos el modal
    handleCloseModal();
  };

  return (
    <>
      <ImageModal
        show={showModal}
        onHide={handleCloseModal}
        onSelectImage={handleSelectImage}
      />

      <GeneralLayout title={ViewStrings.title}>
        <PanelLayout loaded={loaded}>
          <Row className="row-styles">
            <Col xs={12} md={6} className="col-styles">
              <SectionLayout title={"Image Profile"}>
                <div className="d-flex justify-content-center ">
                  <div
                    className="bg-dark image-container d-flex justify-content-center position-relative rounded-circle "
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img
                      className="rounded-circle"
                      src={adventure}
                      alt="Profile"
                      style={{
                        minHeight: "100px",
                        width: "250px",
                        maxWidth: "300px",
                      }}
                    />
                    {hovered && (
                      <div
                        onClick={handleClick}
                        style={{
                          cursor: "pointer",
                          position: "absolute",
                          top: 0,
                          minHeight: "100px",
                          width: "250px",
                          maxWidth: "300px",
                          height: "100%",
                          backgroundColor: "#000000AA",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="overlay rounded-circle "
                      >
                        <p
                          style={{
                            fontSize: "18px",
                          }}
                          className="text-light"
                        >
                          Upload Image
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </SectionLayout>
            </Col>
            <Col xs={12} md={6} className="col-styles">
              <SectionLayout className="w-100" title="Basic user information">
                <FormControl
                  controlId="name"
                  maxLength={50}
                  showMaxLength
                  vertical={false}
                  value={profile.name}
                  title={ViewStrings.inputs.nameInput.title}
                  placeholder={ViewStrings.inputs.nameInput.placeholder}
                  onChange={handleInput}
                />
                <FormControl
                  controlId="surnames"
                  maxLength={50}
                  showMaxLength
                  vertical={false}
                  value={profile.surnames}
                  title={ViewStrings.inputs.surnameInput.title}
                  placeholder={ViewStrings.inputs.surnameInput.placeholder}
                  onChange={handleInput}
                />
                <FormControl
                  controlId="phone"
                  maxLength={9}
                  showMaxLength
                  vertical={false}
                  value={profile.phone}
                  title={ViewStrings.inputs.phoneInput.title}
                  placeholder={ViewStrings.inputs.phoneInput.placeholder}
                  onChange={handleInput}
                />
              </SectionLayout>
            </Col>
          </Row>

          <div className="d-flex justify-content-end w-100 align-items-center">
            <Button disabled={!checkForm()} onClick={handleSubmit}>
              {GeneralStrings.Update}
            </Button>
          </div>
        </PanelLayout>
      </GeneralLayout>
    </>
  );
};

export default Profile;
