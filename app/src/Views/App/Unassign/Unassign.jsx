import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
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
import SectionLayout from "../../../Layouts/SectionLayout/SectionLayout";
import FormControl from "../../../Components/Form/FormControl/FormControl";
import FormToCheckStudent from "./Components/FormToCheckStudent";

const Unassign = () => {
  const { strings: Strings } = useContext(StringsContext);
  const GeneralStrings = Strings.General.App;
  const ViewStrings = Strings.Unassign;

  const request = useRequest();
  const { push } = useHistory();

  const { showNotification: successNotification } = useNotification("success");
  const { showNotification: errorNotification } = useNotification();

  const [data, setData] = useState({
    repeater: false,
  });

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

 

  return (
    <GeneralLayout showBackButton title={ViewStrings.title}>
      <PanelLayout>
        <FormToCheckStudent data={data} setData={setData} />
      </PanelLayout>
    </GeneralLayout>
  );
};

export default Unassign;
