import { useEffect, useState } from "react";
import GeneralLayout from "../../../Layouts/GeneralLayout/GeneralLayout";
import useLoaded from "../../../Hooks/useLoaded";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useRequest from "../../../Hooks/useRequest";
import { Endpoints, getEndpoint } from "../../../Constants/endpoints.contants";
import useNotification from "../../../Hooks/useNotification";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import BarcodeLayoutToPrint from "../../../Components/BarcodeLayoutToPrint/BarcodeLayoutToPrint";
import SectionLayout from "../../../Layouts/SectionLayout/SectionLayout";

const PrintBarcodes = (book_guid) => {
  const { startFetching, finishFetching, fetching, loaded } = useLoaded();
  const request = useRequest();

  const [data, setData] = useState([]);

  const { showNotification: errorNotification } = useNotification();
  const { showNotification: successNotification } = useNotification("success");

  console.log(book_guid);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    startFetching();
    return await request(
      "get",
      getEndpoint(Endpoints.Copies.allCopies.getAllCodes),
      {
        guid: book_guid,
      }
    )
      .then((res) => {
        setData(res.codes);
      })
      .catch(errorNotification)
      .finally(() => finishFetching());
  };

  return (
    <GeneralLayout title={"Barcodes "}>
      <SectionLayout loaded={loaded}>
        <div>
          {/* <BarcodeLayoutToPrint codes={data} /> */}
          <PDFDownloadLink
            document={<BarcodeLayoutToPrint codes={data} />}
            fileName="somename.pdf"
          >
            {({ loading }) =>
              loading ? "Loading document..." : "Download now!"
            }
          </PDFDownloadLink>
        </div>
      </SectionLayout>
    </GeneralLayout>
  );
};

export default PrintBarcodes;
