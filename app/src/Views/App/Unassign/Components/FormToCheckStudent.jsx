import { useContext } from "react";
import FormControl from "../../../../Components/Form/FormControl/FormControl";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";
import { StringsContext } from "../../../../Context/strings.context";
import { Button, Form } from "react-bootstrap";
import { validateData } from "../../../../Config/GeneralFunctions";

const FormToCheckStudent = ({ setData, data }) => {
  const { strings: Strings } = useContext(StringsContext);
  const GeneralStrings = Strings.General.App;
  const ViewStrings = Strings.Assign.NewAssign;

  const handleSubmit = (e) => {
    e && e.preventDefault();
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.unassign.search.student), {
        nia: data.nia,
      })
        .then(() => {
          push(Paths[Views.students].path);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification("Check all input fields");
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
