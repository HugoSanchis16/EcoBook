import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import FormControl from "../../../../Components/Form/FormControl/FormControl";
import { validateData } from "../../../../Config/GeneralFunctions";
import {
  Endpoints,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";
import { Paths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import { StringsContext } from "../../../../Context/strings.context";
import useNotification from "../../../../Hooks/useNotification";
import useRequest from "../../../../Hooks/useRequest";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";
import { EmailRegex, NiaRegex, PhoneRegexSpain } from "../../../../Utils/Regex";
import DeleteBookModal from "../../../../Modals/Books/DeleteBookModal/DeleteBookModal";
import useModalManager from "../../../../Hooks/useModalManager";
import { StudentTabs } from "../../../../Utils/StudentTabs";
import ReactTable from "../../../../Components/Table/Table";
import useLoaded from "../../../../Hooks/useLoaded";
import { HistoryColumns } from "./HistoryColumns";
import { Configuration } from "../../../../Config/app.config";
import useQuery from "../../../../Hooks/useQuery";

const StudentHistory = () => {
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Students.EditStudent;
  const GeneralStrings = Strings.General.App;

  const {
    closeModal: closeDeleteModal,
    openModal: openDeleteModal,
    show: showDeleteModal,
    data: deleteBookData,
  } = useModalManager();

  const request = useRequest();
  const { push } = useHistory();

  const { student_guid } = useParams();

  const { pathname, search } = useLocation();
  const searchParams = useQuery();
  const { startFetching, finishFetching, fetching, loaded } = useLoaded();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({});
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
      getEndpoint(Endpoints.Students.allStudents.getHistory),
      {
        guid: student_guid,
        page,
        offset,
        search,
      }
    )
      .then((res) => {
        setData(res.student);
        setTotalPages(res.totalPages);
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  const handleSubmit = () => {
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.Students.editStudent.update), {
        ...data,
      })
        .then(() => {
          successNotification(ViewStrings.messages.studentsUpdated);
          push(Paths[Views.students].path);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification("Check all input fields");
  };

  const checkForm = () => {
    const { nia, name, surnames, phone, email } = data;
    return (
      validateData([nia, name, surnames, phone, email]) &&
      PhoneRegexSpain.test(phone) &&
      NiaRegex.test(nia) &&
      EmailRegex.test(email)
    );
  };
  const handleCloseDeleteBook = (refresh) => {
    if (refresh) fetchData();
    closeDeleteModal();
  };
  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  return (
    <>
      {console.log(data)}
      {/* Modals */}
      <DeleteBookModal
        show={showDeleteModal}
        onClose={handleCloseDeleteBook}
        data={deleteBookData}
      />
      <GeneralLayout showBackButton title={ViewStrings.title}>
        <PanelLayout loaded={loaded} Tabs={StudentTabs}>
          <SectionLayout title="Student's history">
            <ReactTable
              emptyData={{
                text: "No history found",
                buttonText: "+ New Student",
                to: Paths[Views.new_student].path,
                description: "Do you want to create new Students?",
                subDescription: "Press de following button",
              }}
              
              totalPages={totalPages}
              fetching={fetching}
              onEventChange={fetchData}
              data={data}
              columns={HistoryColumns()}
            />
          </SectionLayout>
        </PanelLayout>
      </GeneralLayout>
    </>
  );
};

export default StudentHistory;
