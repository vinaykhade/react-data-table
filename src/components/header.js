import React from 'react';
import ColumnResizer from './columnResizer';

class TableHeader extends React.Component {
  render() {
    const { columns, showHeaderGroups } = this.props;
    return showHeaderGroups ? (
      <div className="rc-dt-header-row rc-dt-row">
        {columns.map((headerCol, headerKey) =>
          headerCol.columns.map((column, key) => (
            <div
              key={key}
              data-customwidth={column.width ? column.width : null}
              data-parentheaderid={`${
                headerCol.Header.length > 0
                  ? headerCol.Header
                  : headerCol.customHeaderName
              }-${headerKey}`}
              className="rc-dt-column rc-column rc-header-column"
            >
              <div className="rc-column-content">
                <div className="header-label displayInline">
                  {column.Header}
                </div>
              </div>
              <ColumnResizer
                showHeaderGroups={showHeaderGroups}
                value={column}
              />
            </div>
          ))
        )}
      </div>
    ) : (
      <div className="rc-dt-header-row rc-dt-row">
        {columns.map((column, key) => (
          <div
            key={key}
            data-customwidth={column.width ? column.width : null}
            className="rc-dt-column rc-column rc-header-column"
          >
            <div className="rc-column-content">
              <div className="header-label displayInline">{column.Header}</div>
            </div>
            <ColumnResizer showHeaderGroups={showHeaderGroups} value={column} />
          </div>
        ))}
      </div>
    );
  }
}

export default TableHeader;
