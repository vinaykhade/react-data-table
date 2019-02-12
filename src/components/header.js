import React from "react";
import ColumnResizer from './columnResizer';

class TableHeader extends React.Component {

    render() {
        const { columns } = this.props;
        return (
            <div className="rc-dt-header-row rc-dt-row">
                {
                    columns.map((headerCol, headerKey) => 
                        headerCol.columns.map((column,key) => 
                            <div 
                                key={key}
                                data-parentheaderid={`${headerCol.Header}-${headerKey}`}
                                className="rc-dt-column rc-column rc-header-column">
                                    <div className="rc-column-content">
                                        <div className="header-label displayInline">
                                            {column.Header}
                                        </div>  
                                    </div>
                                    <ColumnResizer
                                        value={column}
                                    />                  
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}


export default TableHeader;