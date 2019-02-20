import React from 'react';

class TableGroupHeader extends React.Component {
  render() {
    const { columns, showHeaderGroups } = this.props;

    if (!showHeaderGroups) return null;
    return (
      <div className="rc-dt-headergroup-row">
        {columns.map((headerCol, key) => (
          <div
            key={key}
            data-headergroupid={`${
              headerCol.Header.length > 0
                ? headerCol.Header
                : headerCol.customHeaderName
            }-${key}`}
            className="rc-dt-header-column"
          >
            {headerCol.Header}
          </div>
        ))}
      </div>
    );
  }
}

export default TableGroupHeader;
