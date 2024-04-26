import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import { useEffect, useMemo, useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import Barcode from "react-barcode";

const A4_Sizes = {
  width: 595,
  height: 842,
};

const BarcodeLayoutToPrint = ({ codes, rows = 6, cols = 3, offset = 0 }) => {
  const [images, setImages] = useState([]);

  //   const refImage = useRef();

  useEffect(() => {
    createImage();
  }, [rows, cols, offset]);

  const createNewArray = (length) => [...Array(length).keys()];

  const createImage = () => {
    const newCodes =
      codes?.map((uniqid) => {
        const base64 = getImgBase64String(uniqid);
        return base64;
      }) || [];

    const perPage = rows * cols;
    const newOffset = offset % perPage;
    let emptyItems = createNewArray(newOffset);
    const arrayWithOffset = emptyItems.concat(newCodes);

    const finalArray = createChunk(arrayWithOffset, perPage);
    const items = finalArray.map((pageContent) => {
      return createChunk(pageContent, cols);
    });
    setImages(items);
  };

  const createChunk = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  };

  const getImgBase64String = (value) => {
    const barcodeNode = document.createElement("img");
    JsBarcode(barcodeNode, value);
    return barcodeNode.src;
  };

  return (
    <Document>
      {images.map((page) => (
        <Page size="A4" style={{ margin: 0, padding: 0 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {page.map((row) => (
              <View style={{ flexDirection: "row" }}>
                {row.map((image) =>
                  typeof image === "string" ? (
                    <Image
                      src={image}
                      style={{
                        width: A4_Sizes.width / cols - 2,
                        height: A4_Sizes.height / rows - 2,
                      }}
                    />
                  ) : (
                    <Text
                      style={{
                        width: A4_Sizes.width / cols - 2,
                        height: A4_Sizes.height / rows - 2,
                      }}
                    ></Text>
                  )
                )}
              </View>
            ))}
          </View>
        </Page>
      ))}
    </Document>
  );
};

export default BarcodeLayoutToPrint;
