import { Fragment, useEffect, useState } from "react";
import ReactTable from "../../../../Components/Table/Table";
import useMessageAlert from "../../../../Hooks/useMessageAlert";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";

const Sections = () => {
  const getSections = () => [
    {
      sectionName: "Diet",
      description: "This is the description of the Diet Section",
    },
    {
      sectionName: "Medicine",
      description: "This is the description of the Medicine Section",
    },
    {
      sectionName: "Exercise",
      description: "This is the description of the Excercise Section",
    },
  ];

  const TableViewColumns = () => {
    let columns = [
      {
        Header: "Section Name",
        accessor: "sectionName",
      },
      {
        Header: "Description",
        accessor: "description",
      },
    ];

    return columns;
  };

  const { MessageElement, setMessage } = useMessageAlert("Sections Table");

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  });

  return (
    <Fragment>
      <GeneralLayout
        title="Sections"
        subtitle="This will show all of the content library's sections"
      >
        <PanelLayout ErrorElement={MessageElement} loaded={loaded}>
          <ReactTable data={getSections()} columns={TableViewColumns()} />
        </PanelLayout>
      </GeneralLayout>
    </Fragment>
  );
};

export default Sections;
