import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ReactTable from "../../../../Components/Table/Table";
import { Configuration } from "../../../../Config/app.config";
import {
  Endpoints,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import { StringsContext } from "../../../../Context/strings.context";
import useLoaded from "../../../../Hooks/useLoaded";
import useNotification from "../../../../Hooks/useNotification";
import useQuery from "../../../../Hooks/useQuery";
import useRequest from "../../../../Hooks/useRequest";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import useModalManager from "../../../../Hooks/useModalManager";
import { SubjectsColumns } from "./SubjectsColumns";
import DeleteSubjectModal from "../../../../Modals/Subjects/DeleteSubjectsModal/DeleteSubjectModal";

const Subjects = () => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Subjects.AllSubjects;

  const request = useRequest();
  const searchParams = useQuery();

  const {
    closeModal: closeDeleteModal,
    openModal: openDeleteModal,
    show: showDeleteModal,
    data: deleteSubjectData,
  } = useModalManager();

  const { pathname, search } = useLocation();

  const { showNotification: errorNotification } = useNotification();

  const { startFetching, finishFetching, fetching, loaded } = useLoaded();

  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async (
    page = 1,
    offset = Configuration.tables.defaultPageSize,
    search = searchParams.get("search")
  ) => {
    startFetching();
    return await request(
      "get",
      getEndpoint(Endpoints.Subjects.allSubjects.getAll),
      {
        page,
        offset,
        search,
      }
    )
      .then((res) => {
        setData(res.subjects);
        setTotalPages(res.totalPages);
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  const handleCloseDeleteSubject = (refresh) => {
    if (refresh) fetchData();
    closeDeleteModal();
  };

  return (
    <>
      {/* Modals */}
      <DeleteSubjectModal
        show={showDeleteModal}
        onClose={handleCloseDeleteSubject}
        data={deleteSubjectData}
      />

      {/* Content */}
      <GeneralLayout
        title={ViewStrings.title}
        rightSection={
          data.length > 0 && (
            <Button size="sm" as={Link} to={Paths[Views.new_subject].path}>
              {ViewStrings.addSubject}
            </Button>
          )
        }
      >
        <PanelLayout loaded={loaded}>
          <ReactTable
            emptyData={{
              text: "No Subjects found",
              buttonText: "+ New Subject",
              to: Paths[Views.new_subject].path,
              description: "Do you want to create new Subject?",
              subDescription: "Press de following button",
            }}
            totalPages={totalPages}
            fetching={fetching}
            onEventChange={fetchData}
            data={data}
            columns={SubjectsColumns(openDeleteModal)}
          />
        </PanelLayout>
      </GeneralLayout>
    </>
  );
};

export default Subjects;
