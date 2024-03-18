import { CardImg, Image } from "react-bootstrap";
import { AiFillGithub, AiFillTwitterCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import IconButton from "../../../../Components/Buttons/IconButton";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";

const ProfileView = () => {
  const { isMobileView } = useSelector((state) => state.Config);

  return (
    <GeneralLayout title="Profile">
      <PanelLayout className="p-0 pb-2">
        <div className="position-relative" style={{ marginBottom: 75 }}>
          <div
            style={{ height: "20vw", minHeight: 200, maxHeight: 500 }}
            className="position-relative overflow-hidden"
          >
            <CardImg
              className="rounded-0 position-absolute top-50 start-50 translate-middle"
              src="https://picsum.photos/1024/768"
            />
          </div>
          <Image
            src="https://picsum.photos/128/128"
            className="position-absolute top-100 translate-middle rounded-circle shadow"
            style={{ left: isMobileView ? "50%" : 100 }}
          />
        </div>

        {/* Content */}
        <div className="d-flex flex-column align-items-center align-items-lg-start w-100 px-1 px-5 mb-2">
          <h2>Jose Sanchis</h2>
          <div className="d-flex mb-2">
            <Image
              src={`https://www.countryflagicons.com/SHINY/32/ES.png`}
              style={{ width: 24, height: 24 }}
            />
            <p className="ms-1 mb-0 text-muted">Spain, Valencia</p>
          </div>
          <div className="d-flex flex-column flex-md-row align-items-center mt-2 mt-md-0 mb-2">
            <IconButton
              title="Twitter"
              link="https://twitter.com/josesanchis16"
              Icon={AiFillTwitterCircle}
            />
            <IconButton
              title="GitHub"
              link="https://github.com/josesanchis16"
              Icon={AiFillGithub}
            />
          </div>
        </div>
      </PanelLayout>
    </GeneralLayout>
  );
};

export default ProfileView;
