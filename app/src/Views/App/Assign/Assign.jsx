import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { validateData } from "../../../Config/GeneralFunctions";
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import { Paths } from "../../../Constants/paths.constants";
import { Views } from "../../../Constants/views.constants";
import { StringsContext } from "../../../Context/strings.context";
import useNotification from "../../../Hooks/useNotification";
import useRequest from "../../../Hooks/useRequest";
import GeneralLayout from "../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../Layouts/PanelLayout/PanelLayout";
import StudentSection from "./Components/StudentSection";
import AssignmentSection from "./Components/AssignmentSection";

const Asign = () => {
  const { strings: Strings } = useContext(StringsContext);
  const GeneralStrings = Strings.General.App;
  const ViewStrings = Strings.Assign.NewAssign;

  const request = useRequest();
  const { push } = useHistory();

  const { book_guid } = useParams();

  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({ repeater: false });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    request(
      "get",
      getEndpoint(Endpoints.Courses.allCourses.getAllNamesToAssign)
    )
      .then((res) => {
        setCourses(res.courses);
      })
      .catch(errorNotification);
  };

  const handleSubmit = () => {
    if (checkForm()) {
      console.log({ data });
      request("post", getEndpoint(Endpoints.assign.create.assign), {
        ...data,
      })
        .then(() => {
          push(Paths[Views.students].path);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification("Check all input fields");
  };

  const checkForm = () => {
    const { nia, course } = data;

    console.log({ data });
    return validateData([nia, course]);
  };

  return (
    <GeneralLayout showBackButton title={ViewStrings.title}>
      <PanelLayout>
        {courses.length > 0 ? (
          <>
            <StudentSection data={data} setData={setData} />
            <AssignmentSection
              data={data}
              setData={setData}
              courses={courses}
            />
            <div className="d-flex justify-content-end w-100 align-items-center">
              <Button disabled={!checkForm()} onClick={handleSubmit}>
                {GeneralStrings.Create}
              </Button>
            </div>
          </>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center p-4">
            <p className="mb-4">
              Not courses available yet. Please create new courses.
            </p>
            <Button size="sm" as={Link} to={Paths[Views.new_course].path}>
              {ViewStrings.addCourse}
            </Button>
          </div>
        )}
      </PanelLayout>
    </GeneralLayout>
  );
};

export default Asign;
