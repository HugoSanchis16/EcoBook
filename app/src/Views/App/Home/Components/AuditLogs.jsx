import {
  Badge,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Paths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";

const AuditLogs = () => {
  const CardOverlay = (props) => (
    <Tooltip className="bg-white" {...props}>
      <p className="mb-0">Test</p>
    </Tooltip>
  );

  return (
    <PanelLayout>
      <SectionLayout title="Last Activity">
        <ListGroup>
          <ListGroupItem>
            <div className="mb-2">
              <b>Jose Sanchis</b> created{" "}
              <OverlayTrigger
                trigger="hover"
                placement="auto"
                overlay={CardOverlay}
              >
                <Link to={Paths[Views.home].path} className="pointer fw-bold">
                  Canals Tournament
                </Link>
              </OverlayTrigger>
            </div>
            <div className="d-flex w-100 align-items-center justify-content-between">
              <Badge>Tournament</Badge>
              <small>17 hours ago</small>
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <div className="mb-2">
              <b>Jose Sanchis</b> created{" "}
              <OverlayTrigger
                trigger="hover"
                placement="auto"
                overlay={CardOverlay}
              >
                <Link to={Paths[Views.home].path} className="pointer fw-bold">
                  Xativa Tournament
                </Link>
              </OverlayTrigger>
            </div>
            <div className="d-flex w-100 align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <Badge>Prokan</Badge>
              </div>
              <small>2 days ago</small>
            </div>
          </ListGroupItem>

          <ListGroupItem>
            <div className="mb-2">
              <b>Jose Sanchis</b> created{" "}
              <OverlayTrigger
                trigger="hover"
                placement="auto"
                overlay={CardOverlay}
              >
                <Link to={Paths[Views.home].path} className="pointer fw-bold">
                  new organisation
                </Link>
              </OverlayTrigger>
            </div>
            <div className="d-flex w-100 align-items-center justify-content-between">
              <Badge>CareCompass</Badge>
              <small>3 days ago</small>
            </div>
          </ListGroupItem>
        </ListGroup>
      </SectionLayout>
    </PanelLayout>
  );
};

export default AuditLogs;
