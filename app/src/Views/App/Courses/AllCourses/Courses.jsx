import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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
import { CoursesColumns } from "./CoursesColumns";
import DeleteCourseModal from "../../../../Modals/Courses/DeleteCourseModal/DeleteCourseModal";

const Courses = () => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Courses.AllCourses;

  const request = useRequest();
  const searchParams = useQuery();

  const {
    closeModal: closeDeleteModal,
    openModal: openDeleteModal,
    show: showDeleteModal,
    data: deleteCourseData,
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
      getEndpoint(Endpoints.Courses.allCourses.getAll),
      {
        page,
        offset,
        search,
      }
    )
      .then((res) => {
        setData(res.courses);
        setTotalPages(res.totalPages);
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  const handleCloseDeleteBook = (refresh) => {
    if (refresh) fetchData();
    closeDeleteModal();
  };

  return (
    <>
      {/* Modals */}
      <DeleteCourseModal
        show={showDeleteModal}
        onClose={handleCloseDeleteBook}
        data={deleteCourseData}
      />

      {/* Content */}
      <GeneralLayout
        title={ViewStrings.title}
        rightSection={
          data.length > 0 && (
            <Button size="sm" as={Link} to={Paths[Views.new_course].path}>
              {ViewStrings.addCourse}
            </Button>
          )
        }
      >
        <PanelLayout loaded={loaded}>
          <ReactTable
            emptyData={{
              text: "No Courses found",
              buttonText: "+ New Course",
              to: Paths[Views.new_course].path,
              description: "Do you want to create new Course?",
              subDescription: "Press de following button",
            }}
            totalPages={totalPages}
            fetching={fetching}
            onEventChange={fetchData}
            data={data}
            columns={CoursesColumns(openDeleteModal)}
          />
        </PanelLayout>
      </GeneralLayout>
    </>
  );
};

export default Courses;
