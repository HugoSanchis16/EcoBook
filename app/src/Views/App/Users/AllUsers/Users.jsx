import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  Link,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import FormSelect from "../../../../Components/Form/FormSelect/FormSelect";
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
import { UsersColumns } from "./Users.columns";

const Users = () => {
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Users.AllUsers;

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
    const fetchData = async () => {
      startFetching();
      if (organisations.length === 0) await fetchOrganisations();
      await fetchUsers();
      finishFetching();
    };
    fetchData();
  }, [search]);

  const fetchUsers = async (
    page = 1,
    offset = Configuration.tables.defaultPageSize,
    search = searchParams.get("search")
  ) => {
    return await request("get", getEndpoint(Endpoints.Users.allUsers.getAll), {
      page,
      offset,
      search,
      org_guid: searchParams.get("org_guid") || "",
    })
      .then((res) => {
        setData(res.data);
        setTotalPages(res.totalPages);
      })
      .catch((err) => errorNotification(err.message));
  };

  const fetchOrganisations = async () => {
    return await request(
      "get",
      getEndpoint(Endpoints.Organisation.other.getAllSelect)
    )
      .then((res) => {
        setOrganisations(res.data);
      })
      .catch((err) => errorNotification(err.message));
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
        <Button size="sm" as={Link} to={Paths[Views.new_user].path}>
          {ViewStrings.newUser}
        </Button>
      }
    >
      <PanelLayout>
        <ReactTable
          extraFilters={
            <div className="w-50">
              <FormSelect
                onClean={() => handleSelectOrg()}
                value={searchParams.get("org_guid") || "default"}
                onChange={handleSelectOrg}
                options={organisations}
              />
            </div>
          }
          totalPages={totalPages}
          fetching={fetching}
          onEventChange={fetchUsers}
          data={data}
          columns={UsersColumns()}
        />
      </PanelLayout>
    </GeneralLayout>
  );
};

export default Users;
