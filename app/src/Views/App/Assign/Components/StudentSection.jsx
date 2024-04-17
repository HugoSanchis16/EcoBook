import { useContext } from "react";
import FormControl from "../../../../Components/Form/FormControl/FormControl";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";
import { StringsContext } from "../../../../Context/strings.context";

const StudentSection = ({setData, data}) => {
  const { strings: Strings } = useContext(StringsContext);
  const GeneralStrings = Strings.General.App;
  const ViewStrings = Strings.Assign.NewAssign;

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  return (
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
  );
};

export default StudentSection;
