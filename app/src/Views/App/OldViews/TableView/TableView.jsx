import { useContext, useEffect, useState } from "react";
import ReactTable from "../../../../Components/Table/Table";
import { Configuration } from "../../../../Config/app.config";
import { getEndpoint } from "../../../../Constants/endpoints.contants";
import { StringsContext } from "../../../../Context/strings.context";
import useLoaded from "../../../../Hooks/useLoaded";
import useNotification from "../../../../Hooks/useNotification";
import useRequest from "../../../../Hooks/useRequest";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import { TableViewColumns } from "./TableView.columns";

const TableView = () => {
  const request = useRequest();

  const { strings } = useContext(StringsContext);
  const { showNotification: errorNotification } = useNotification();
  const { loaded, fetching, startFetching, finishFetching } = useLoaded();

  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, []);

  const fetchData = (
    page = 1,
    pageSize = Configuration.tables.defaultPageSize,
    search = ""
  ) => {
    startFetching();
    request(
      "get",
      getEndpoint(
        "https://penninelancs.openplace.directory/o/ServiceDirectoryService/v2",
        ["services"],
        [{ page }, { per_page: pageSize }],
        true
      ),
      { per_page: pageSize, page, search },
      false
    )
      .then((res) => {
        setData(res.content);
        setTotalPages(res.totalPages);
        finishFetching();
      })
      .catch((e) => errorNotification(e.message));
  };

  return (
    <GeneralLayout title={strings.TableView}>
      <PanelLayout loaded={loaded}>
        <ReactTable
          fetching={fetching}
          totalPages={totalPages}
          onEventChange={fetchData}
          data={data}
          columns={TableViewColumns()}
        />
      </PanelLayout>
    </GeneralLayout>
  );
};

export default TableView;
