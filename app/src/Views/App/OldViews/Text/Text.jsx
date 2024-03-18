import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";

const TextView = () => {
  return (
    <GeneralLayout title="Text">
      <PanelLayout>
        <SectionLayout title="Headers">
          <p className="h1">Header 1 (.h1)</p>
          <p className="h2">Header 2 (.h2)</p>
          <p className="h3">Header 3 (.h3)</p>
          <p className="h4">Header 4 (.h4)</p>
          <p className="h5">Header 5 (.h5)</p>
          <p className="h6">Header 6 (.h6)</p>
        </SectionLayout>
        <SectionLayout title="Display">
          <h1 className="display-1">Display 1 (.display-1)</h1>
          <h1 className="display-2">Display 2 (.display-2)</h1>
          <h1 className="display-3">Display 3 (.display-3)</h1>
          <h1 className="display-4">Display 4 (.display-4)</h1>
          <h1 className="display-5">Display 5 (.display-5)</h1>
          <h1 className="display-6">Display 6 (.display-6)</h1>
        </SectionLayout>
      </PanelLayout>
    </GeneralLayout>
  );
};

export default TextView;
