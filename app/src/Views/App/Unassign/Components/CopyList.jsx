import { useContext, useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ReactTable from "../../../../Components/Table/Table";
import { Configuration } from "../../../../Config/app.config";
import {
  Endpoints,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";
import { Paths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import { StringsContext } from "../../../../Context/strings.context";
import useLoaded from "../../../../Hooks/useLoaded";
import useNotification from "../../../../Hooks/useNotification";
import useQuery from "../../../../Hooks/useQuery";
import useRequest from "../../../../Hooks/useRequest";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import useModalManager from "../../../../Hooks/useModalManager";
import { StudentsColumns } from "../../Students/AllStudents/StudentsColumns";
import DeleteStudentModal from "../../../../Modals/Students/DeleteStudentsModal/DeleteStudentModal";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";
import CopyItem from "./CopyItem";
import IconButton from "../../../../Components/Buttons/IconButton";
import { BsUpcScan } from "react-icons/bs";
import UnassignCopyModal from "../../../../Modals/Unassign/UnassignCopyModal.jsx/UnassignCopyModal";

const CopyList = ({ data, setData }) => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Unassign.step2;

  const request = useRequest();

  const {
    closeModal: closeUnassignModal,
    openModal: openUnassignModal,
    show: showDeleteModal,
    data: UnassignDataModal,
  } = useModalManager();

  const { showNotification: errorNotification } = useNotification();

  const { startFetching, finishFetching, fetching, loaded } = useLoaded();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    startFetching();
    return await request("get", getEndpoint(Endpoints.unassign.search.copies), {
      nia: data.nia,
    })
      .then((res) => {
        setData({ ...data, copies: res.data });
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  const handleCloseUnassignCopy = (refresh) => {
    if (refresh) fetchData();
    closeUnassignModal();
  };

  return (
    <>
      {/* Modals */}
      <UnassignCopyModal
        show={showDeleteModal}
        onClose={handleCloseUnassignCopy}
        data={UnassignDataModal}
      />

      <SectionLayout title="Books pending return" loaded={loaded}>
        <ListGroup>
          {data.copies?.map((item, idx) => (
            <ListGroupItem key={idx}>
              <CopyItem
                item={item}
                openUnassignModal={() =>
                  openUnassignModal({ uniqid: item.uniqid, nia: data.nia })
                }
              />
            </ListGroupItem>
          ))}
        </ListGroup>
      </SectionLayout>
    </>
  );
};

export default CopyList;
