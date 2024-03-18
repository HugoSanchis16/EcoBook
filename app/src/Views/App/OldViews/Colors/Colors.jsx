import { useState } from "react";
import { Button } from "react-bootstrap";
import Loader from "../../../../Components/Loader/Loader";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";

const ColorsView = () => {
  const [color, setColor] = useState("");

  const handleColor = (e) => {
    const { innerText } = e.target;
    setColor(innerText.toLowerCase());
  };

  return (
    <GeneralLayout title="Colors!">
      <PanelLayout className={`bg-${color}`}>
        <SectionLayout title="Buttons">
          <SectionLayout subtitle="Plain">
            <div className="d-flex flex-wrap mb-3">
              <Button
                onClick={handleColor}
                variant="primary"
                className="mb-0 m-1"
              >
                Primary
              </Button>
              <Button
                onClick={handleColor}
                variant="secondary"
                className="mb-0 m-1"
              >
                Secondary
              </Button>
              <Button
                onClick={handleColor}
                variant="success"
                className="mb-0 m-1"
              >
                Success
              </Button>
              <Button
                onClick={handleColor}
                variant="danger"
                className="mb-0 m-1"
              >
                Danger
              </Button>
              <Button
                onClick={handleColor}
                variant="warning"
                className="mb-0 m-1"
              >
                Warning
              </Button>
              <Button onClick={handleColor} variant="info" className="mb-0 m-1">
                Info
              </Button>
              <Button
                onClick={handleColor}
                variant="light"
                className="mb-0 m-1"
              >
                Light
              </Button>
              <Button onClick={handleColor} variant="dark" className="mb-0 m-1">
                Dark
              </Button>
              <Button onClick={handleColor} variant="link" className="mb-0 m-1">
                Link
              </Button>
              <Button
                onClick={handleColor}
                variant="transparent"
                className="mb-0 m-1"
              >
                Transparent
              </Button>
            </div>
          </SectionLayout>
          <SectionLayout subtitle="Outline">
            <div className="d-flex flex-wrap mb-3">
              <Button
                onClick={handleColor}
                variant="outline-primary"
                className="mb-0 m-1"
              >
                Primary
              </Button>
              <Button
                onClick={handleColor}
                variant="outline-secondary"
                className="mb-0 m-1"
              >
                Secondary
              </Button>
              <Button
                onClick={handleColor}
                variant="outline-success"
                className="mb-0 m-1"
              >
                Success
              </Button>
              <Button
                onClick={handleColor}
                variant="outline-danger"
                className="mb-0 m-1"
              >
                Danger
              </Button>
              <Button
                onClick={handleColor}
                variant="outline-warning"
                className="mb-0 m-1"
              >
                Warning
              </Button>
              <Button
                onClick={handleColor}
                variant="outline-info"
                className="mb-0 m-1"
              >
                Info
              </Button>
              <Button
                onClick={handleColor}
                variant="outline-light"
                className="mb-0 m-1"
              >
                Light
              </Button>
              <Button
                onClick={handleColor}
                variant="outline-dark"
                className="mb-0 m-1"
              >
                Dark
              </Button>
              <Button
                onClick={handleColor}
                variant="outline-link"
                className="mb-0 m-1"
              >
                Link
              </Button>
              <Button
                onClick={handleColor}
                variant="outline-transparent"
                className="mb-0 m-1"
              >
                Transparent
              </Button>
            </div>
          </SectionLayout>
          <SectionLayout subtitle="Gradient">
            <div className="d-flex flex-wrap mb-3">
              <Button
                onClick={handleColor}
                variant="primary"
                className="mb-0 m-1 bg-gradient"
              >
                Primary bg-gradient
              </Button>
              <Button
                onClick={handleColor}
                variant="secondary"
                className="mb-0 m-1 bg-gradient"
              >
                Secondary bg-gradient
              </Button>
              <Button
                onClick={handleColor}
                variant="success"
                className="mb-0 m-1 bg-gradient"
              >
                Success bg-gradient
              </Button>
              <Button
                onClick={handleColor}
                variant="danger"
                className="mb-0 m-1 bg-gradient"
              >
                Danger bg-gradient
              </Button>
              <Button
                onClick={handleColor}
                variant="warning"
                className="mb-0 m-1 bg-gradient"
              >
                Warning bg-gradient
              </Button>
              <Button
                onClick={handleColor}
                variant="info"
                className="mb-0 m-1 bg-gradient"
              >
                Info bg-gradient
              </Button>
              <Button
                onClick={handleColor}
                variant="light"
                className="mb-0 m-1 bg-gradient"
              >
                Light bg-gradient
              </Button>
              <Button
                onClick={handleColor}
                variant="dark"
                className="mb-0 m-1 bg-gradient"
              >
                Dark bg-gradient
              </Button>
            </div>
          </SectionLayout>
        </SectionLayout>
        <SectionLayout title="Background">
          <div className="d-flex flex-wrap">
            <Button
              onClick={handleColor}
              variant="primary"
              className="mb-0 m-1"
            >
              Primary
            </Button>
            <Button
              onClick={handleColor}
              variant="secondary"
              className="mb-0 m-1"
            >
              Secondary
            </Button>
            <Button
              onClick={handleColor}
              variant="success"
              className="mb-0 m-1"
            >
              Success
            </Button>
            <Button onClick={handleColor} variant="danger" className="mb-0 m-1">
              Danger
            </Button>
            <Button
              onClick={handleColor}
              variant="warning"
              className="mb-0 m-1"
            >
              Warning
            </Button>
            <Button onClick={handleColor} variant="info" className="mb-0 m-1">
              Info
            </Button>
            <Button onClick={handleColor} variant="light" className="mb-0 m-1">
              Light
            </Button>
            <Button onClick={handleColor} variant="dark" className="mb-0 m-1">
              Dark
            </Button>
            <Button onClick={handleColor} variant="body" className="mb-0 m-1">
              Body
            </Button>
            <Button onClick={handleColor} variant="white" className="mb-0 m-1">
              White
            </Button>
            <Button
              onClick={handleColor}
              variant="transparent"
              className="mb-0 m-1"
            >
              Transparent
            </Button>
          </div>
        </SectionLayout>
        <SectionLayout title="Loader">
          <div className="d-flex w-100">
            <Loader animation="grow" color="primary" />
            <Loader animation="grow" color="secondary" />
            <Loader animation="grow" color="success" />
            <Loader animation="grow" color="danger" />
            <Loader animation="grow" color="warning" />
            <Loader animation="grow" color="info" />
            <Loader animation="grow" color="light" />
            <Loader animation="grow" color="dark" />
            <div className="rounded p-1 px-2 bg-dark">
              <Loader animation="grow" color="white" />
            </div>
          </div>
          <div className="d-flex w-100">
            <Loader color="primary" />
            <Loader color="secondary" />
            <Loader color="success" />
            <Loader color="danger" />
            <Loader color="warning" />
            <Loader color="info" />
            <Loader color="light" />
            <Loader color="dark" />
            <div className="rounded p-1 px-2 bg-dark">
              <Loader color="white" />
            </div>
          </div>
        </SectionLayout>
      </PanelLayout>
    </GeneralLayout>
  );
};

export default ColorsView;
