import React from "react";
import './index.css';

class ReactDataTable extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    componentDidMount() {
        this.arrangeColumnWidths();
    }

    componentDidUpdate(prevProps, prevState) {
        if((prevProps.columns !== this.props.columns) || 
            (prevState.columns !== this.state.columns)) {
            this.arrangeColumnWidths();
        }
    }


    arrangeColumnWidths = () => {
        const tableGroupHeaderRow = document.getElementsByClassName('rc-dt-headergroup-row')[0];
        const tableHeaderRow =  document.getElementsByClassName('rc-header-column');
        const headerRow = document.getElementsByClassName('rc-dt-header-row')[0];
        const tableEle = document.getElementsByClassName('rc-dt-table')[0]; 
        const tableContainerWidth = document.getElementsByClassName('rc-dt-container')[0]
                                            .getBoundingClientRect().width;       
    
        let sumOfMinWidthOfColumns = 0;
        [...tableHeaderRow].forEach(col => {
            const colMinWidth = col.querySelector('.rc-column-content .header-label')
                                            .getBoundingClientRect().width 
                                            + 30;                                               
            sumOfMinWidthOfColumns += Math.round(colMinWidth);                         
        });
        
        const headerColList = document.getElementsByClassName('rc-header-column');

        const diff =  (tableHeaderRow.length)*(20);     

        if(tableContainerWidth > sumOfMinWidthOfColumns) {    
            tableEle.style.width = `${Math.round(tableContainerWidth)}px`; 
            tableGroupHeaderRow.style.width = `${Math.round(tableContainerWidth)}px`; 
            headerRow.style.width = `${Math.round(tableContainerWidth)}px`; 
        } else  {
            tableEle.style.width = `${Math.round(sumOfMinWidthOfColumns + diff)}px`; 
            tableGroupHeaderRow.style.width = `${Math.round(sumOfMinWidthOfColumns + diff)}px`; 
            headerRow.style.width = `${Math.round(sumOfMinWidthOfColumns + diff)}px`;     
        }  

        

        let headerGroupWidthMap = {};
        if(headerColList.length > 0) {
            [...headerColList].forEach((headerCol) => {
                if(tableContainerWidth >= sumOfMinWidthOfColumns) {
                    const netWidthDiff = (tableContainerWidth - sumOfMinWidthOfColumns);
                    const defaultColsDiff = (headerColList.length);
                    const extraPerColumnWidth = netWidthDiff/(defaultColsDiff);
                    const colMinWidth = headerCol.querySelector('.rc-column-content .header-label')
                                                  .getBoundingClientRect().width
                                                  + 30
                                                  + extraPerColumnWidth;                     
                    headerCol.setAttribute('min-width', `${colMinWidth}px`);
                    headerCol.style.width = `${Math.round(colMinWidth)}px`;
                    const headerGroupId = headerCol.getAttribute('data-parentheaderid');
                    if(headerGroupWidthMap[headerGroupId]) {
                        const previousWidth = headerGroupWidthMap[headerGroupId];
                        const newWidth = previousWidth + colMinWidth;
                        headerGroupWidthMap[headerGroupId] = Math.round(newWidth);
                    } else {
                        headerGroupWidthMap[headerGroupId] = Math.round(colMinWidth);
                    }
                } else {
                    const colMinWidth = headerCol.querySelector('.rc-column-content .header-label')
                                                  .getBoundingClientRect().width
                                                  + 20
                                                  + 30;               
                    headerCol.setAttribute('min-width', `${colMinWidth}px`);
                    headerCol.style.width = `${Math.round(colMinWidth)}px`;
                    
                    const headerGroupId = headerCol.getAttribute('data-parentheaderid');
                    if(headerGroupWidthMap[headerGroupId]) {
                        const previousWidth = headerGroupWidthMap[headerGroupId];
                        const newWidth = previousWidth + colMinWidth;
                        headerGroupWidthMap[headerGroupId] = Math.round(newWidth)
                    } else {
                        headerGroupWidthMap[headerGroupId] = Math.round(colMinWidth);
                    }
                }   
            });
            const groupHeaderColList = document.getElementsByClassName('rc-dt-header-column');
            [...groupHeaderColList].forEach(headerGroup => {
                const headerGroupId = headerGroup.getAttribute('data-headergroupid');
                const headerGroupWidth = headerGroupWidthMap[headerGroupId];
                headerGroup.style.width = `${headerGroupWidth}px`;
            });
        }
    }

    createRows = () => {
        const { data, columns } = this.props;

        return data.map((row, rowKey) => {
            return <div className="rc-dt-row">
                        {
                            columns.map((headerCol, headerKey) => {       
                                return headerCol.columns.map((column,key) => {
                                    const data = row[column.dataField] || {};
                                    return <div 
                                            className="rc-dt-column rc-body-cell">
                                            {data}
                                            </div>
                                })
                            })
                        }
                    </div>                
        });
    }

    render() {

        const { columns } = this.props;
        return (
            <div className="rc-dt-container">
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
                <div className="rc-dt-table">
                    <div className="rc-dt-body">
                        {/* TODO: Work on header groups */}
                                                
                        
                        
                       
                        
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
                                        </div>
                                    )
                                )
                            }
                        </div>
                        {this.createRows()}
                    </div>
                </div>
            </div>
        );
    }
}

export default ReactDataTable;