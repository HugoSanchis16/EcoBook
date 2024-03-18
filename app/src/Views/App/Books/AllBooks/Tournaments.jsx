import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  Link,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import ReactTable from "../../../../Components/Table/Table";
import { Configuration } from "../../../../Config/app.config";
import {
  Endpoints,
  getEndpoint,
} from "../../../../Constants/endpoints.contants";
import { Paths, replacePaths } from "../../../../Constants/paths.constants";
import { Views } from "../../../../Constants/views.constants";
import { StringsContext } from "../../../../Context/strings.context";
import useLoaded from "../../../../Hooks/useLoaded";
import useNotification from "../../../../Hooks/useNotification";
import useQuery from "../../../../Hooks/useQuery";
import useRequest from "../../../../Hooks/useRequest";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import { TournamentsColumns } from "./Tournaments.columns";

const Tournaments = () => {
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Tournaments.AllTournaments;

  const request = useRequest();
  const searchParams = useQuery();

  const { replace } = useHistory();
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
      getEndpoint(Endpoints.Tournaments.allTournaments.getAll),
      {
        page,
        offset,
        search,
        org_guid: searchParams.get("org_guid") || "",
      }
    )
      .then((res) => {
        setData(res.data);
        setTotalPages(res.totalPages);
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  return (
    <GeneralLayout
      title={ViewStrings.title}
      rightSection={
        <Button size="sm" as={Link} to={Paths[Views.new_tournament].path}>
          {ViewStrings.newTournament}
        </Button>
      }
    >
      <PanelLayout>
        <ReactTable
          totalPages={totalPages}
          fetching={fetching}
          onEventChange={fetchData}
          data={data}
          columns={TournamentsColumns()}
        />
      </PanelLayout>
    </GeneralLayout>
  );
};

export default Tournaments;
