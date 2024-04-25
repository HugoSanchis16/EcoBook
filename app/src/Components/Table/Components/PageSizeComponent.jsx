import { Configuration } from "../../../Config/app.config";
import FormSelect from "../../Form/FormSelect/FormSelect";

const PageSizeComponent = ({ onChange, pageSize }) => {
  const handleOnChange = (e) => {
    const { value } = e.target;
    onChange && onChange(+value);
  };

  return (
    <FormSelect
      formGroupProps={{ className: "mb-0" }}
      options={Configuration.tables.pageSizeOptions.map((item) => ({
        value: item,
        label: `${item} rows`,
      }))}
      onChange={handleOnChange}
      hideDefaultOption
      value={pageSize || Configuration.tables.defaultPageSize}
      className=" border-0 shadow-none"
    />
  );
};

export default PageSizeComponent;
