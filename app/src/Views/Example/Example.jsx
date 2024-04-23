import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import Barcode from "react-barcode";
import BarcodeLayoutToPrint from "../../Components/BarcodeLayoutToPrint/BarcodeLayoutToPrint";

// Create Document Component
function Example() {
  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  return (
    <div>
      <PDFDownloadLink
        document={<BarcodeLayoutToPrint />}
        fileName="somename.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </div>
  );
}

export default Example;
