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
import { PlayersColumns } from "./Players.columns";

const Players = () => {
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Players.AllPlayers;

  const request = useRequest();
  const searchParams = useQuery();

  const { replace } = useHistory();
  const { pathname, search } = useLocation();

  const { showNotification: errorNotification } = useNotification();

  const { startFetching, finishFetching, fetching, loaded } = useLoaded();

  const [organisations, setOrganisations] = useState([]);
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
      getEndpoint(Endpoints.Players.allPlayers.getAll),
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
      .catch((err) => errorNotification(err.message))
      .finally(() => finishFetching());
  };

  const handleSelectOrg = (e) => {
    console.log({ e });
    if (e) {
      const { value } = e.target;
      console.log({ value });
      replace(replacePaths(pathname, [], [{ org_guid: value }]));
    } else {
      replace(replace(pathname, [], []));
    }
  };

  return (
    <GeneralLayout
      title={ViewStrings.title}
      rightSection={
        <Button size="sm" as={Link} to={Paths[Views.new_player].path}>
          {ViewStrings.newPlayer}
        </Button>
      }
    >
      <PanelLayout>
        <ReactTable
          totalPages={totalPages}
          fetching={fetching}
          onEventChange={fetchData}
          data={data}
          columns={PlayersColumns()}
        />
      </PanelLayout>
    </GeneralLayout>
  );
};

export default Players;
