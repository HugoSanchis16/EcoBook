import { useContext } from "react";
import { StringsContext } from "../../Context/strings.context";

const PrivacyPolicy = () => {
  const { strings } = useContext(StringsContext);
  const ViewStrings = strings.privacyPolicy;
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            maxHeight: "100%",
            overflowY: "auto",
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            {ViewStrings.titles.privacyPolicy}
          </h1>
          <div style={{ marginBottom: "20px" }}>
            <h6>{ViewStrings.titles.date} 07/05/2024</h6>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <h4>{ViewStrings.titles.description}</h4>
            <p>{ViewStrings.paragraphs.description}</p>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <h4>{ViewStrings.titles.informationWeCollect}</h4>
            <p>{ViewStrings.paragraphs.informationWeCollect}</p>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <h4>{ViewStrings.titles.howWeUseInformation}</h4>
            <p>{ViewStrings.paragraphs.howWeUseInformation}</p>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <h4>{ViewStrings.titles.informationDisclosure}</h4>
            <p>{ViewStrings.paragraphs.informationDisclosure}</p>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <h4>{ViewStrings.titles.informationSecurity}</h4>
            <p>{ViewStrings.paragraphs.informationSecurity}</p>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <h4>{ViewStrings.titles.changesPrivacyPolicy}</h4>
            <p>{ViewStrings.paragraphs.changesPrivacyPolicy}</p>
          </div>
          <div>
            <h4>{ViewStrings.titles.contact}</h4>
            <p>
              {ViewStrings.paragraphs.contactP1}
              <b>ecobook@gmail.com</b>
              {ViewStrings.paragraphs.contactP2}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
