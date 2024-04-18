import { useContext } from "react";
import FormControl from "../../../../Components/Form/FormControl/FormControl";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";
import { StringsContext } from "../../../../Context/strings.context";
import { Button, Form } from "react-bootstrap";
import { validateData } from "../../../../Config/GeneralFunctions";
import useRequest from "../../../../Hooks/useRequest";
import {
  Endpoints,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";
import useNotification from "../../../../Hooks/useNotification";

const FormToCheckStudent = ({ setData, data, setStep }) => {
  const { strings: Strings } = useContext(StringsContext);
  const GeneralStrings = Strings.General.App;
  const ViewStrings = Strings.Assign.NewAssign;

  const request = useRequest();

  const { showNotification: errorNotification } = useNotification();

  const handleSubmit = (e) => {
    e && e.preventDefault();
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.unassign.search.student), {
        nia: data.nia,
      })
        .then((res) => {
          setData(res.data);
          setStep(2);
        })
        .catch((err) => {
          errorNotification(err.message);
        });
    } else {
      errorNotification("Check all input fields");
    }
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const checkForm = () => {
    const { nia } = data;
    return validateData([nia]);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SectionLayout title="Student's Identification">
        <FormControl
          required
          controlId="nia"
          maxLength={8}
          showMaxLength={true}
          vertical={false}
          value={data.nia}
          title={ViewStrings.inputs.niaInput.title}
          placeholder={ViewStrings.inputs.niaInput.placeholder}
          onChange={handleInput}
        />
      </SectionLayout>
      <div className="d-flex justify-content-end w-100 align-items-center">
        <Button disabled={!checkForm()} type="submit">
          {GeneralStrings.Next}
        </Button>
      </div>
    </Form>
  );
};

export default FormToCheckStudent;
