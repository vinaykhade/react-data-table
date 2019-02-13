import React from 'react';
import PropTypes from 'prop-types';

import TableHeader from './components/header';
import TableGroupHeader from './components/groupHeader';
import TableRows from './components/tableRows';

import Utils from './utils';

import './index.css';

class ReactDataTable extends React.Component {
  componentDidMount() {
    Utils.arrangeColumnWidths();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.columns !== this.props.columns ||
      prevState.columns !== this.state.columns
    ) {
      Utils.arrangeColumnWidths();
    }
  }

  render() {
    const { columns, data } = this.props;
    return (
      <div className="rc-dt-container">
        <TableGroupHeader columns={columns} />
        <div className="rc-dt-table">
          <div className="rc-dt-body">
            <TableHeader columns={columns} />
            <TableRows data={data} columns={columns} />
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
