import clsx from "clsx";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { padEnd } from "../../utils/helpers";

const Table = ({
  columns,
  data,
  minRows = 0,
  height,
  activeKey = "",
  activeValue,
  extra
}) => {
  const cols = useMemo(
    () =>
      columns.map((column) => {
        const style = {};

        if (column.width) style.width = column.width;
        else style.flex = 1;

        return {
          ...column,
          style,
        };
      }),
    [columns]
  );

  return (
    <div className="table">
      <div className="table-header-row">
        {cols.map((column, index) => {
          return (
            <div key={index} className="table-header" style={column.style}>
              {column.label}
            </div>
          );
        })}
      </div>
      <div className="table-body" style={{ maxHeight: height }}>
        {padEnd(data, minRows).map((row, rowIndex) => {
          if (row) {
            const active =
              activeKey in row &&
              row[activeKey] === activeValue &&
              !!activeValue;

            return (
              <div
                key={rowIndex}
                className={clsx("table-body-row", active && "active")}
              >
                {cols.map((column, columnIndex) => {
                  return (
                    <div
                      key={columnIndex}
                      className={`table-body-row-cell ${column.className}`}
                      style={column.style}
                    >
                      {column.render
                        ? column.render(row[column.key], row, rowIndex)
                        : row[column.key]}
                    </div>
                  );
                })}
              </div>
            );
          }

          return (
            <div key={rowIndex} className="table-body-row">
              {cols.map((column, columnIndex) => {
                return (
                  <div
                    key={columnIndex}
                    className={`table-body-row-cell`}
                    style={column.style}
                  >
                    &nbsp;
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className="table-body-row footer">
          {cols.map((column, columnIndex) => {
            return (
              <div
                key={columnIndex}
                className={`table-body-row-cell`}
                style={column.style}
              >
                &nbsp;
              </div>
            );
          })}
        </div>
      </div>
      { extra }
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      className: PropTypes.string,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  minRows: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  activeKey: PropTypes.string,
  activeValue: PropTypes.string,
  extra: PropTypes.node,
};

export default Table;
