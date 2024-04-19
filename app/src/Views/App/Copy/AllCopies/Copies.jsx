import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  Link,
  useHistory,
  useLocation,
  useParams,
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
import useModalManager from "../../../../Hooks/useModalManager";
import { CopiesColumns } from "./CopiesColumns";
import ShowBarcodeModal from "../../../../Modals/BarcodeCopies/ShowBarcodeModal/ShowBarcodeModal";

const Copies = () => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.Copies.AllCopies;

  const request = useRequest();
  const searchParams = useQuery();

  const { book_guid } = useParams();

  const {
    closeModal: closeBarcodeModal,
    openModal: openBarcodeModal,
    show: showBarcodeModal,
    data: BarcodeStudentData,
  } = useModalManager();

  const { search } = useLocation();

  const { showNotification: errorNotification } = useNotification();
  const { showNotification: successNotification } = useNotification("success");

  const { startFetching, finishFetching, fetching } = useLoaded();

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
      getEndpoint(Endpoints.Copies.allCopies.getAll),
      {
        book_guid,
        page,
        offset,
        search,
      }
    )
      .then((res) => {
        setData(res.copies);
        setTotalPages(res.totalPages);
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  const handleUpdateState = async (guid, value) => {
    return await request(
      "post",
      getEndpoint(Endpoints.Copies.editCopy.updateState),
      {
        guid,
        state: value,
      }
    )
      .then((res) => updateStatusOfCopy(guid, value))
      .catch(errorNotification);
  };

  const updateStatusOfCopy = (guid, value) => {
    successNotification("Status updated successfully!");
  };

  const handleCloseBarcodeModal = (refresh) => {
    if (refresh) fetchData();
    closeDeleteModal();
  };

  return (
    <>
      {/* Modals */}
      <ShowBarcodeModal
        show={showBarcodeModal}
        onClose={handleCloseBarcodeModal}
        uniqid={BarcodeStudentData.uniqid}
      />

      {/* Content */}
      <GeneralLayout
        showBackButton
        title={ViewStrings.title}
        rightSection={
          <Button
            size="sm"
            as={Link}
            to={replacePaths(Paths[Views.new_copy].path, [{ book_guid }])}
          >
            {ViewStrings.addCopy}
          </Button>
        }
      >
        <PanelLayout>
          <ReactTable
            searcherProps={{
              placeholder: "Search the code ...",
              autoFocus: true,
            }}
            totalPages={totalPages}
            fetching={fetching}
            onEventChange={fetchData}
            data={data}
            columns={CopiesColumns(handleUpdateState)}
          />
        </PanelLayout>
      </GeneralLayout>
    </>
  );
};

export default Copies;
