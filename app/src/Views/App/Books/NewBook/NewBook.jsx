import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  useHistory,
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
import FormSwitch from "../../../../Components/Form/FormSwitch/FormSwitch";
import { IsbnRegex } from "../../../../Utils/Regex";
import FormSelect from "../../../../Components/Form/FormSelect/FormSelect";

const NewBook = () => {
  const { strings: Strings } = useContext(StringsContext);
  const GeneralStrings = Strings.General.App;
  const ViewStrings = Strings.Books.NewBook;

  const request = useRequest();
  const { push } = useHistory();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({});

  const [subjects, setSubjects] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    request("get", getEndpoint(Endpoints.Subjects.allSubjects.getAllNames))
      .then((res) => {
        setSubjects(res.subjects);
        setLoaded(true);
      })
      .catch((err) => errorNotification(err.message));
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleCleanSubject = () => {
    setData({
      ...data,
      subject: null,
    });
  };

  const handleSubmit = () => {
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.Books.createBook.create), {
        ...data,
      })
        .then(() => {
          successNotification(ViewStrings.messages.bookCreated);
          push(Paths[Views.books].path);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification("Check all input fields");
  };

  const checkForm = () => {
    const { name, isbn, stock, subject } = data;
    return (
      validateData([name, isbn, stock, subject]) &&
      IsbnRegex.test(isbn) &&
      stock > 0
    );
  };

  return (
    <GeneralLayout title={ViewStrings.title}>
      <PanelLayout loaded={loaded}>
        <SectionLayout title="Book Info">
          <FormControl
            controlId="name"
            maxLength={50}
            showMaxLength
            vertical={false}
            title={ViewStrings.inputs.nameInput.title}
            placeholder={ViewStrings.inputs.nameInput.placeholder}
            onChange={handleInput}
            required
          />
          <FormControl
            controlId="isbn"
            maxLength={13}
            showMaxLength
            vertical={false}
            title={ViewStrings.inputs.isbnInput.title}
            placeholder={ViewStrings.inputs.isbnInput.placeholder}
            onChange={handleInput}
            required
          />
          <FormSelect
            options={subjects}
            controlId="subject"
            value={data.subject}
            vertical={false}
            title={ViewStrings.inputs.subject.title}
            placeholder={ViewStrings.inputs.subject.placeholder}
            onChange={handleInput}
            onClean={handleCleanSubject}
            required
          />
          <FormControl
            controlId="stock"
            maxLength={200}
            showMaxLength={false}
            vertical={false}
            title={ViewStrings.inputs.stockInput.title}
            placeholder={ViewStrings.inputs.stockInput.placeholder}
            onChange={handleInput}
            type="number"
            step={1}
            required
          />
        </SectionLayout>
        <div className="d-flex justify-content-end w-100 align-items-center">
          <Button disabled={!checkForm()} onClick={handleSubmit}>
            {GeneralStrings.Create}
          </Button>
        </div>
      </PanelLayout>
    </GeneralLayout>
  );
};

export default NewBook;
