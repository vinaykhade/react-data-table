import React from "react";

class TableRows extends React.Component {

    render() {
        const { data, columns } = this.props;
        
        return data.map((row, rowKey) => 
            <div className="rc-dt-row" key={rowKey}>
                {
                    columns.map((headerCol, headerKey) => {       
                        return headerCol.columns.map((column,key) => {
                            const data = row[column.dataField] || {};
                            return <div 
                                        key={key}
                                        className="rc-dt-column rc-body-cell">
                                        {data}
                                    </div>
                        })
                    })
                }
            </div>                
        )
    }
}

export default TableRows;