import { Endpoints, getEndpoint } from "../../Constants/endpoints.contants";
import { useEffect, useState } from "react";
import useRequest from "../../Hooks/useRequest";
import useNotification from "../../Hooks/useNotification";
import FormSelect from "../Form/FormSelect/FormSelect";

const SeasonFilterSelector = ({ onChange }) => {
  const request = useRequest();
  const { showNotification: errorNotification } = useNotification();

  const [seasons, setSeasons] = useState([]);
  const [seasonSelected, setSeasonSelected] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    request("get", getEndpoint(Endpoints.Courses.allCourses.getAllSeasons))
      .then((res) => setSeasons(res.seasons))
      .catch(errorNotification);
  };

  const handleCourseSelected = (e) => {
    const { id, value } = e.target;
    setSeasonSelected(value);
    onChange({ id, value });
  };
  const handleCleanValue = () => {
    setSeasonSelected("");
    onChange("");
  };

  return (
    <FormSelect
      controlId="season"
      onClean={handleCleanValue}
      defaultValue="default"
      value={seasonSelected}
      options={seasons}
      title="Season:"
      onChange={handleCourseSelected}
    />
  );
};

export default SeasonFilterSelector;
