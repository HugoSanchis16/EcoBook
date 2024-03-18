import moment from "moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import GeneralLayout from "../../../Layouts/GeneralLayout/GeneralLayout";
import BottomSection from "./Sections/BottomSection";
import MiddleSection from "./Sections/MiddleSection";
import TopSection from "./Sections/TopSection";

const currentTournaments = Math.round(Math.random() * 20) + 20;
const currentLeagues = Math.round(Math.random() * 20) + 20;
const currentPlayers =
  Math.round(Math.random() * 100) + currentLeagues * currentTournaments;

const HomeView = () => {
  const { push } = useHistory();

  return (
    <GeneralLayout
      title={
        <div className="d-flex flex-column mb-3">
          <h2 className="fw-normal">
            Welcome back <b className="h2">Jose</b> 👋
          </h2>
          <p className="mb-0">{moment().format("dddd, MMMM DD, YYYY")}</p>
        </div>
      }
    >
      <TopSection />
      <MiddleSection />
      <BottomSection />
    </GeneralLayout>
  );
};

export default HomeView;
