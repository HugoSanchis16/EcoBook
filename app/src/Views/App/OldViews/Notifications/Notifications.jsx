import { useState } from "react";
import { Button, Dropdown, FormCheck } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import useNotification from "../../../../Hooks/useNotification";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";

const Notifications = () => {
  const [theme, setTheme] = useState("secondary");

  const { showNotification: topLeft } = useNotification(
    theme,
    "top-left",
    "desc"
  );
  const { showNotification: topCenter } = useNotification(
    theme,
    "top-center",
    "desc"
  );
  const { showNotification: topRight } = useNotification(
    theme,
    "top-right",
    "desc"
  );
  const { showNotification: middleLeft } = useNotification(
    theme,
    "middle-left",
    "desc"
  );
  const { showNotification: middleCenter } = useNotification(
    theme,
    "middle-center",
    "desc"
  );
  const { showNotification: middleRight } = useNotification(
    theme,
    "middle-right",
    "desc"
  );
  const { showNotification: bottomLeft } = useNotification(
    theme,
    "bottom-left",
    "desc"
  );
  const { showNotification: bottomCenter } = useNotification(
    theme,
    "bottom-center",
    "desc"
  );
  const { showNotification: bottomRight } = useNotification(
    theme,
    "bottom-right",
    "desc"
  );

  const [showCloseButton, setShowCloseButton] = useState(false);

  const renderButton = (position = "", html = "") => {
    const split = position.split("-");
    const pos = split[0] === "top" ? 0 : split[0] === "middle" ? 50 : 100;
    const side = split[1] === "left" ? 0 : split[1] === "center" ? 50 : 100;
    const txt = position.replaceAll("-", " ");

    const handlePosition = () => {
      switch (position) {
        case "top-left":
          topLeft(html || txt, showCloseButton);
          break;
        case "top-center":
          topCenter(html || txt, showCloseButton);
          break;
        case "top-right":
          topRight(html || txt, showCloseButton);
          break;
        case "middle-left":
          middleLeft(html || txt, showCloseButton);
          break;
        case "middle-center":
          middleCenter(html || txt, showCloseButton);
          break;
        case "middle-right":
          middleRight(html || txt, showCloseButton);
          break;
        case "bottom-left":
          bottomLeft(html || txt, showCloseButton);
          break;
        case "bottom-center":
          bottomCenter(html || txt, showCloseButton);
          break;
        case "bottom-right":
          bottomRight(html || txt, showCloseButton);
          break;
        default:
          topRight(html || txt, showCloseButton);
      }
    };

    return (
      <Button
        variant="dark"
        style={{ textTransform: "capitalize" }}
        className={`
                position-absolute 
                ${
                  pos === 100
                    ? "bottom-0"
                    : pos === 50
                    ? `top-${pos} ${side !== 50 ? "translate-middle-y" : ""}`
                    : `top-${pos}`
                }
                ${
                  side === 100
                    ? "end-0"
                    : side === 50
                    ? `start-${side} ${
                        pos !== 50 ? "translate-middle-x" : "translate-middle"
                      }`
                    : `start-${side}`
                }
                rounded-sm border-0`}
        onClick={handlePosition}
      >
        {txt}
      </Button>
    );
  };

  const notificationContent = () => (
    <div
      className="position-relative d-flex justify-content-center align-items-center bg-secondary w-100"
      style={{ height: 50 }}
    >
      <p className="mb-0 text-white">Custom Text!</p>
    </div>
  );

  return (
    <GeneralLayout
      title="Notifications"
      rightSection={
        <div className="d-flex justify-content-end align-items-center w-100">
          <FormCheck
            className="me-3"
            checked={showCloseButton}
            onChange={(e) => setShowCloseButton(e.target.checked)}
            type="switch"
            label="Show close button"
          />
          <Dropdown>
            <DropdownToggle
              variant={`outline-${theme}`}
              style={{ textTransform: "capitalize" }}
            >
              {theme}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => setTheme("primary")}>
                Primary
              </DropdownItem>
              <DropdownItem onClick={() => setTheme("secondary")}>
                Secondary
              </DropdownItem>
              <DropdownItem onClick={() => setTheme("success")}>
                Success
              </DropdownItem>
              <DropdownItem onClick={() => setTheme("info")}>Info</DropdownItem>
              <DropdownItem onClick={() => setTheme("warning")}>
                Warning
              </DropdownItem>
              <DropdownItem onClick={() => setTheme("danger")}>
                Danger
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      }
    >
      <PanelLayout>
        <SectionLayout title="Simple" subtitle="Simple notifications">
          <div
            className="border position-relative rounded p-2 mt-4"
            style={{ height: 200 }}
          >
            {renderButton("top-left")}
            {renderButton("top-center")}
            {renderButton("top-right")}
            {renderButton("middle-left")}
            {renderButton("middle-center")}
            {renderButton("middle-right")}
            {renderButton("bottom-left")}
            {renderButton("bottom-center")}
            {renderButton("bottom-right")}
          </div>
        </SectionLayout>
        <SectionLayout title="HTML" subtitle="Notifications with HTML Content">
          <div
            className="border position-relative rounded p-2 mt-4"
            style={{ height: 200 }}
          >
            {renderButton("top-left", notificationContent())}
            {renderButton("top-center", notificationContent())}
            {renderButton("top-right", notificationContent())}
            {renderButton("middle-left", notificationContent())}
            {renderButton("middle-center", notificationContent())}
            {renderButton("middle-right", notificationContent())}
            {renderButton("bottom-left", notificationContent())}
            {renderButton("bottom-center", notificationContent())}
            {renderButton("bottom-right", notificationContent())}
          </div>
        </SectionLayout>
      </PanelLayout>
    </GeneralLayout>
  );
};

export default Notifications;
