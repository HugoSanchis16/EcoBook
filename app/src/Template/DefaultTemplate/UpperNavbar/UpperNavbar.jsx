import LanguageSelector from "../../../Components/LanguageSelector/LanguageSelector";
import ToggleSideBarButton from "../../../Components/ToggleSideBarButton/ToggleSideBarButton";
import { Configuration } from "../../../Config/app.config";
import useModalManager from "../../../Hooks/useModalManager";
import NotificationModal from "../../../Modals/NotificationModal/NotificationModal";
import ProfileDropdown from "./Components/ProfileDropdown";

const { height } = Configuration.theme.general.navbar;

const UpperNavbar = () => {
  const {
    show: showNotificationModal,
    closeModal: closeNotificationModal,
    openModal: openNotificationModal,
  } = useModalManager();

  return (
    <div className="bg-transparent">
      {/* Modal */}
      <NotificationModal
        show={showNotificationModal}
        onClose={closeNotificationModal}
      />

      {/* Content */}
      <div
        style={{ height }}
        className="p-2 d-flex justify-content-between align-items-center w-100"
      >
        {/* Right side */}
        <div className="d-flex align-items-center">
          <ToggleSideBarButton />
        </div>

        {/* Left side */}
        <div className="d-flex align-items-center">
          <LanguageSelector showFlag={true} />

          {/* Profile */}
          <ProfileDropdown />
        </div>
      </div>
    </div>
  );
};

export default UpperNavbar;
