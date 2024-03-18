import { useContext, useEffect, useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import FormSelect from "../../../../../Components/Form/FormSelect/FormSelect";
import {
  Endpoints,
  getEndpoint,
} from "../../../../../Constants/endpoints.contants";
import { StringsContext } from "../../../../../Context/strings.context";
import { TournamentContext } from "../../../../../Context/tournament.context";
import useNotification from "../../../../../Hooks/useNotification";
import useRequest from "../../../../../Hooks/useRequest";
import PanelLayout from "../../../../../Layouts/PanelLayout/PanelLayout";

const TournamentCategoriesPanel = ({ handleSubmit }) => {
  const request = useRequest();

  const { showMessage: errorMessage } = useNotification();

  const { tournament, setTournament } = useContext(TournamentContext);
  const { strings: Strings } = useContext(StringsContext);
  const ViewStrings = Strings.Tournaments.NewTournament;

  const [selectedCategory, setSelectedCategory] = useState({});
  const [originalCategories, setOriginalCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    request(
      "get",
      getEndpoint(Endpoints.Tournaments.newTournament.getAvailableCategories)
    )
      .then((res) => {
        const categoriesReducer = res.categories.reduce(
          (obj, cat) => ({ ...obj, [cat.value]: cat }),
          {}
        );
        setOriginalCategories(categoriesReducer);
        setCategories(res.categories);
      })
      .catch(errorMessage)
      .finally(() => setLoaded(true));
  };

  const handleSelectedCategory = (e) => {
    const { id, value } = e.target;
    console.log({ id, value });
    setSelectedCategory(originalCategories[value]);
  };

  const addCategoryToTournament = () => {
    setTournament({
      ...tournament,
      categories: [...tournament.categories, selectedCategory],
    });
    const remainingCategories = [...categories].filter(
      (cat) => cat.value !== selectedCategory.value
    );
    console.log({ remainingCategories });
    setCategories(remainingCategories);
    setSelectedCategory(null);
  };

  const checkForm = () => {
    const { categories } = tournament;
    if (categories.length === 0) return false;
    // const valid = categories.map((category) => {
    //   const { title } = category;
    //   return validateData([title]);
    // });
    // console.log({ valid });
    return true;
  };

  return (
    <PanelLayout loaded={loaded}>
      <div className="d-flex align-items-end gap-2">
        <FormSelect
          value={selectedCategory?.value || null}
          onChange={handleSelectedCategory}
          title="Add category"
          options={categories}
        />
        <Button className="mb-2" onClick={addCategoryToTournament}>
          Add
        </Button>
      </div>

      {tournament.categories.length > 0 ? (
        <Accordion>
          {tournament.categories.map((category, idx) => (
            <Accordion.Item eventKey={category.value}>
              <Accordion.Header>{category.label}</Accordion.Header>
              <Accordion.Body>{idx}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <div className="p-5 d-flex align-items-center justify-content-center">
          <p className="mb-0 text-muted">No categories selected</p>
        </div>
      )}

      <div className="d-flex justify-content-end align-items-center w-100">
        <Button onClick={handleSubmit} disabled={!checkForm()}>
          {ViewStrings.buttons.create}
        </Button>
      </div>
    </PanelLayout>
  );
};

export default TournamentCategoriesPanel;
