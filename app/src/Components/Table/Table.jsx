import { useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Configuration } from "../../Config/app.config";
import Searcher from "../Searcher/Searcher";
import PageSizeComponent from "./Components/PageSizeComponent";
import CustomPagination from "./Components/Pagination";
import TableComponent from "./Components/TableComponent";
import NotFoundComponent from "../NotFoundComponent";

const ReactTable = ({
  fetching,
  columns,
  searcherProps = {},
  extraFilters,
  emptyData = {},
  showPageSize = true,
  showSearcher = true,
  data,
  totalPages = 1,
  onEventChange,
}) => {
  const [currentPageSize, setCurrentPageSize] = useState(
    Configuration.tables.defaultPageSize
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState("");

  const handlePageSize = (size) => {
    fetchData(1, size, currentSearch);
  };
  const handleSearcher = (search) => {
    fetchData(currentPage, currentPageSize, search);
  };
  const handlePagination = (page) => {
    fetchData(page, currentPageSize, currentSearch);
  };

  const fetchData = (page, offset, search) => {
    onEventChange(page, offset, search);
    setCurrentPage(page);
    setCurrentPageSize(offset);
    setCurrentSearch(search);
  };

  const renderHeader = () => (
    <Row className="d-flex flex-column-reverse flex-md-row">
      <Col sm={12} md={6} className="mb-md-2 mb-1">
        {extraFilters}
      </Col>
      <Col sm={12} md={6} className="mb-md-2 mb-1">
        <div className="d-flex align-items-center justify-content-end">
          {showSearcher && (
            <div className="ms-1 d-flex justify-content-end align-items-center">
              <Searcher
                autoFocus={searcherProps?.autoFocus}
                placeholder={searcherProps?.placeholder}
                onChange={handleSearcher}
              />
            </div>
          )}
          {showPageSize && (
            <div className="ms-1 d-flex justify-content-end align-items-center">
              <PageSizeComponent
                pageSize={currentPageSize}
                onChange={handlePageSize}
              />
            </div>
          )}
        </div>
      </Col>
    </Row>
  );

  const dataLength = data.length;
  return (
    <>
      {renderHeader()}
      {useMemo(
        () =>
          data.length > 0 ? (
            <TableComponent
              fetching={fetching}
              className="mb-2"
              data={data}
              columns={columns}
            />
          ) : (
            <NotFoundComponent
              buttonText={emptyData.buttonText}
              description={emptyData.description}
              text={emptyData.text}
              to={emptyData.to}
              subDescription={emptyData.subDescription}
              size={1}
            />
          ),
        [data]
      )}
      <CustomPagination
        totalPages={totalPages}
        page={currentPage}
        onChange={handlePagination}
      />
    </>
  );
};

export default ReactTable;
