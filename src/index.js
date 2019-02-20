import React from 'react';
import PropTypes from 'prop-types';

import TableHeader from './components/header';
import TableGroupHeader from './components/groupHeader';
import TableRows from './components/tableRows';

import Utils from './utils';

import './index.css';
import { isArray } from 'util';

class ReactDataTable extends React.Component {
  constructor() {
    super();
    this.showHeaderGroups = false;
  }

  componentWillMount() {
    this.showHeaderGroups = this.checkForHeaderGroups(this.props.columns);
  }

  componentDidMount() {
    this.showHeaderGroups = this.checkForHeaderGroups(this.props.columns);
    Utils.arrangeColumnWidths(this.showHeaderGroups);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.columns !== nextProps.columns) {
      this.showHeaderGroups = this.checkForHeaderGroups(nextProps.columns);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.columns !== this.props.columns ||
      prevState.columns !== this.state.columns
    ) {
      Utils.arrangeColumnWidths(this.showHeaderGroups);
    }
  }

  checkForHeaderGroups = columns => {
    let headerGroupsExist = false;
    columns.forEach(col => {
      if (col.columns && isArray(col.columns)) {
        headerGroupsExist = true;
        return;
      }
    });

    return headerGroupsExist;
  };

  render() {
    const { columns, data } = this.props;

    return (
      <div className="rc-dt-container">
        <TableGroupHeader
          showHeaderGroups={this.showHeaderGroups}
          columns={columns}
        />
        <div className="rc-dt-table">
          <div className="rc-dt-body">
            <TableHeader
              showHeaderGroups={this.showHeaderGroups}
              columns={columns}
            />
            <TableRows
              showHeaderGroups={this.showHeaderGroups}
              data={data}
              columns={columns}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDataTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

ReactDataTable.defaultProps = {
  columns: [],
  data: []
};

export default ReactDataTable;
