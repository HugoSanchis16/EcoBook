import { useContext, useMemo, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { StringsContext } from "../../../../Context/strings.context";
import { TournamentContext } from "../../../../Context/tournament.context";
import useNotification from "../../../../Hooks/useNotification";
import useRequest from "../../../../Hooks/useRequest";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import TournamentCategoriesPanel from "./Panels/TournamentCategoriesPanel";
import TournamentInformationPanel from "./Panels/TournamentInformationPanel";

const NewTournament = () => {
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Tournaments.NewTournament;

  const request = useRequest();
  const { replace } = useHistory();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const [tournamentStep, setTournamentStep] = useState(0);
  const [tournament, setTournament] = useState({
    info: {},
    categories: [],
  });
  const TournamentValue = useMemo(
    () => ({ tournament, setTournament }),
    [tournament]
  );

  const handleSubmitTournament = () => {
    if (checkForm()) {
      request("post", getEndpoint(Endpoints.Tournaments.newTournament.create), {
        ...data,
      })
        .then(() => {
          successNotification(ViewStrings.messages.playerCreated);
          replace(Paths[Views.players].path);
        })
        .catch((err) => errorNotification(err.message));
    } else errorNotification(""); //TODO: Add string when incomplete inputs
  };

  const handleSubmitInfo = () => {
    setTournamentStep(1);
  };

  const renderSection = () => {
    switch (tournamentStep) {
      case 0:
        return <TournamentInformationPanel handleSubmit={handleSubmitInfo} />;
      case 1:
        return (
          <TournamentCategoriesPanel handleSubmit={handleSubmitTournament} />
        );
    }
  };

  return (
    <GeneralLayout title={ViewStrings.title}>
      <TournamentContext.Provider value={TournamentValue}>
        {renderSection()}
      </TournamentContext.Provider>
    </GeneralLayout>
  );
};

export default NewTournament;
