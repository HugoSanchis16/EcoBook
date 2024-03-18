import { useContext } from "react";
import { Button } from "react-bootstrap";
import FormControl from "../../../../../Components/Form/FormControl/FormControl";
import { validateData } from "../../../../../Config/GeneralFunctions";
import { StringsContext } from "../../../../../Context/strings.context";
import { TournamentContext } from "../../../../../Context/tournament.context";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";

const TournamentInformationPanel = ({ handleSubmit }) => {
  const { tournament, setTournament } = useContext(TournamentContext);
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Tournaments.NewTournament;

  const handleText = (e) => {
    const { id, value } = e.target;
    console.log({ ...tournament, info: { ...tournament.info, [id]: value } });
    setTournament({ ...tournament, info: { ...tournament.info, [id]: value } });
  };

  const checkForm = () => {
    const { title } = tournament.info;
    return validateData([title]);
  };

  return (
    <PanelLayout>
      <FormControl
        controlId="title"
        vertical={false}
        title={ViewStrings.inputs.titleInput.title}
        placeholder={ViewStrings.inputs.titleInput.placeholder}
        onChange={handleText}
      />
      <FormControl
        controlId="description"
        vertical={false}
        as="textarea"
        maxLength={1000}
        title={ViewStrings.inputs.descriptionInput.title}
        placeholder={ViewStrings.inputs.descriptionInput.placeholder}
        onChange={handleText}
      />
      <div className="d-flex justify-content-end align-items-center w-100">
        <Button onClick={handleSubmit} disabled={!checkForm()}>
          {ViewStrings.buttons.next}
        </Button>
      </div>
    </PanelLayout>
  );
};
export default TournamentInformationPanel;
