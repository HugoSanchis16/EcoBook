import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Configuration } from "../../Config/app.config";

const ReactCalendar = ({
  data,
  views = ["day", "week", "month"],
  onChange,
  onEventClick,
  ...props
}) => {
  const localizer = momentLocalizer(moment);

  const sanitiseOnChange = (range) => {
    let finalObject;
    if (Array.isArray(range)) {
      if (range.length === 1) {
        finalObject = handleFinalObject(
          moment(range[0]).format(Configuration.dateTimeFormat),
          moment(range[0]).format(Configuration.dateTimeFormat)
        );
      } else if (range.length === 7) {
        finalObject = handleFinalObject(
          moment(range[0]).format(Configuration.dateTimeFormat),
          moment(range[6]).format(Configuration.dateTimeFormat)
        );
      }
    } else {
      finalObject = handleFinalObject(
        moment(range.start).format(Configuration.dateTimeFormat),
        moment(range.end).format(Configuration.dateTimeFormat)
      );
    }

    onChange && onChange(finalObject);
  };

  const handleOnEventClick = (e) => {
    onEventClick && onEventClick(e);
  };

  const handleFinalObject = (start, end) => ({
    start,
    end,
  });

  return (
    <Calendar
      localizer={localizer}
      events={data}
      className="w-100"
      views={views}
      onSelectEvent={handleOnEventClick}
      defaultView="month"
      onRangeChange={sanitiseOnChange}
      startAccessor={(event) => {
        return new Date(event.start);
      }}
      endAccessor={(event) => {
        return new Date(event.end);
      }}
      {...props}
    />
  );
};

export default ReactCalendar;
