import React from 'react';
import PropTypes from 'prop-types';

import TableHeader from './components/header';
import TableGroupHeader from './components/groupHeader';
import TableRows from './components/tableRows';

import Utils from './utils';

import './index.css';
import { isArray } from 'util';

class ReactDataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: Utils.assignDefaultHeaderNames(
        props.columns,
        Utils.checkForHeaderGroups(props.columns)
      )
    };
    this.showHeaderGroups = Utils.checkForHeaderGroups(props.columns);
  }

  componentWillMount() {
    // this.showHeaderGroups = Utils.checkForHeaderGroups(this.state.columns);
  }

  componentDidMount() {
    this.showHeaderGroups = Utils.checkForHeaderGroups(this.state.columns);
    Utils.arrangeColumnWidths(this.showHeaderGroups);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.columns !== nextProps.columns) {
      this.showHeaderGroups = Utils.checkForHeaderGroups(nextProps.columns);
      this.setState({
        columns: Utils.assignDefaultHeaderNames(
          nextProps.columns,
          this.showHeaderGroups
        )
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.columns !== this.state.columns ||
      prevState.columns !== this.state.columns
    ) {
      Utils.arrangeColumnWidths(this.showHeaderGroups);
    }
  }

  render() {
    const { data } = this.props;
    const { columns } = this.state;

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
