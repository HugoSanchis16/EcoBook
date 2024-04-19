import FormControl from "../../../../Components/Form/FormControl/FormControl";

const Observationscomponent = ({ data, setData }) => {
  const handleText = (e) => {
    const { value } = e.target;
    setData({ ...data, observations: value });
  };

  return (
    <div>
      <h5 className="mt-3 ">Observations</h5>
      <div className="d-flex justify-content-center">
        <FormControl
          as="textarea"
          className="w-100"
          value={data.observations}
          onChange={handleText}
          showMaxLength={false}
          style={{ resize: "none", height: 200 }}
        ></FormControl>
      </div>
    </div>
  );
};

export default Observationscomponent;
