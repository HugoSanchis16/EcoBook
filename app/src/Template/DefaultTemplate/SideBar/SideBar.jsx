import classNames from "classnames";
import { useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Form,
  FormControl,
  InputGroup,
  useAccordionButton,
} from "react-bootstrap";
import { BsChevronCompactDown, BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Configuration } from "../../../Config/app.config";
import { NavItems } from "../../../Constants/navitems.constants";
import { Paths } from "../../../Constants/paths.constants";
import { Views } from "../../../Constants/views.constants";
import useModalManager from "../../../Hooks/useModalManager";
import useSideBar from "../../../Hooks/useSideBar";
import SearcherModal from "../../../Modals/Searcher/SearcherModal";
import { setCurrentNavItemMenuSelectedAction } from "../../../Redux/actions/ConfigActions";
import SideBarBrand from "./SideBarBrand";
import SideBarItem from "./SideBarItem";

const SideBar = () => {
  const { push } = useHistory();

  const { closeModal, openModal, show } = useModalManager();

  const { isMobileView, currentNavItemSelected } = useSelector(
    (state) => state.Config
  );
  const dispatch = useDispatch();

  const { expanded } = useSideBar();
  const { rounded: roundedSideBar } = Configuration.theme.general.sidebar;
  const { backgroundColor } = Configuration.theme.general.sidebar;

  const [search, setSearch] = useState("");

  const sideBarClassName = classNames(
    "overflow-hidden d-flex flex-column justify-content-between shadow",
    backgroundColor,
    {
      "m-2 border rounded-lg": roundedSideBar,
    }
  );

  const handleSearch = (e) => {
    e && e.preventDefault();
    if (search) push(`${Paths[Views.search].path}?search=${search}`);
  };

  const getIcon = (icon) => {
    let iconCode = `&#x${icon};`;
    return `<i class="material-icons">${iconCode}</i>`;
  };

  const renderItem = (item, idx, dropdown = false) => (
    <SideBarItem key={idx} item={item} dropdown={dropdown} />
  );

  const renderDropdowns = (item, idx) => {
    function CustomToggle({ children, eventKey }) {
      const decoratedOnClick = useAccordionButton(eventKey, () => {
        let newCurrentEventKey = eventKey;
        if (currentNavItemSelected === eventKey) newCurrentEventKey = "-1";
        dispatch(setCurrentNavItemMenuSelectedAction(newCurrentEventKey));
      });

      const headerButtonClassNames = classNames(
        "w-100 pb-2 pt-3 px-2 text-start text-secondary shadow-none align-items-center d-flex sidebar-nav-item",
        {
          "justify-content-between": isMobileView || expanded,
          "justify-content-center": !expanded,
          "sidebar-nav-item-selected rounded-0 rounded-top":
            currentNavItemSelected === eventKey,
          rounded: currentNavItemSelected !== eventKey,
        }
      );

      return (
        <Button
          variant="link"
          className={headerButtonClassNames}
          onClick={decoratedOnClick}
        >
          {children}
        </Button>
      );
    }

    const chevronClassName = classNames({
      rotate180: currentNavItemSelected === `${idx}`,
    });

    return (
      <Card className="border-0" key={idx}>
        <Card.Header className="p-0 border-0 bg-transparent">
          <CustomToggle eventKey={`${idx}`}>
            <div
              className={`d-flex ${
                expanded || isMobileView
                  ? "justify-content-start"
                  : "justify-content-center"
              } align-items-center w-100`}
            >
              {Configuration.theme.general.sidebar.showIcons && (
                <div dangerouslySetInnerHTML={{ __html: getIcon(item.icon) }} />
              )}
              {expanded && <span className="ms-3 mb-1">{item.title}</span>}
            </div>
            {expanded && (
              <BsChevronCompactDown size={20} className={chevronClassName} />
            )}
          </CustomToggle>
        </Card.Header>
        <Accordion.Collapse eventKey={`${idx}`}>
          <Card.Body className="px-1 border">
            {item.children.map((subitem, subIdx) =>
              renderItem(subitem, subIdx, true)
            )}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    );
  };

  return (
    <>
      {/* Modal */}
      <SearcherModal onClose={closeModal} show={show} />

      {/* Content */}
      <div
        style={{
          height: roundedSideBar ? "calc(100vh - 1rem)" : "100vh",
          position: "sticky",
          top: 0,
        }}
        className={sideBarClassName}
      >
        <div>
          {/* Brand */}
          <div className="h-auto">
            <SideBarBrand />
          </div>

          {/* Items */}
          <div className="d-flex flex-column overflow-hidden">
            <div
              className="overflow-auto w-100 p-2"
              style={{
                height: `calc(100vh - ${85 + 50}px`,
              }}
            >
              {/* {expanded || isMobileView ? (
                <Form onSubmit={handleSearch}>
                  <InputGroup className="m-2 mb-3 w-auto border rounded">
                    <FormControl
                      onChange={(e) => setSearch(e.target.value)}
                      className="py-2 pl-3 border-0 shadow-none"
                      placeholder="Search"
                      aria-describedby="general-search"
                    />
                    <InputGroup.Text
                      id="general-search"
                      className="border-0 bg-transparent px-3"
                    >
                      <BsSearch size={18} />
                    </InputGroup.Text>
                  </InputGroup>
                </Form>
              ) : (
                <Button
                  variant="link"
                  onClick={openModal}
                  className="d-flex justify-content-center w-100 mb-3"
                >
                  <BsSearch size={18} />
                </Button>
              )} */}

              {NavItems().map((section, idx) => {
                const sectionClassName = classNames("w-100", {
                  "mb-3": expanded || isMobileView,
                });
                return (
                  <div key={idx} className={sectionClassName}>
                    {Configuration.theme.general.sidebar.groupSideBarItems &&
                      (expanded || isMobileView) && (
                        <small
                          className="mb-2 px-2 d-flex w-100 mb-1 p-1 border-bottom border-top"
                          style={{ color: "#999" }}
                        >
                          {section.title}
                        </small>
                      )}
                    <div className="px-2">
                      <Accordion activeKey={currentNavItemSelected} key={idx}>
                        {section.items.map((item, idx) =>
                          item.children
                            ? renderDropdowns(item, idx)
                            : renderItem(item, idx)
                        )}
                      </Accordion>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Policy privacy */}
        {expanded && (
          <div
            className="d-flex justify-content-center align-items-center w-100 flex-column"
            style={{
              height: 50,
            }}
          >
            <Button variant="link" as={Link} to="/privacy-policy">
              Privacy Policy
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
