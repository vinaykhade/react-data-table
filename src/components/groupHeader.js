import React from "react";

class TableGroupHeader extends React.Component {
    render() {
        const { columns } = this.props;
        return (
            <div className="rc-dt-headergroup-row">
                {
                    columns.map((headerCol, key) =>
                        <div 
                            key={key}
                            data-headergroupid={`${headerCol.Header}-${key}`}
                            className="rc-dt-header-column">
                                {headerCol.Header}
                        </div>
                    )             
                }       
            </div>
        )
    }
}


export default TableGroupHeader;