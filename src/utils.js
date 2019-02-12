const utils = (() => {

    const arrangeColumnWidths = () => {
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

        const diff =  (tableHeaderRow.length)*(50);     

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
                                                  + 50
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

    return {
        arrangeColumnWidths,
    }
    
})();

export default utils;