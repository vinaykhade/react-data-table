import React from "react";


let isResizing = false,
    currentlyResizing= {};

const onMouseDown = (e) => {
    event.stopPropagation();

    const headerEle = event.target.parentElement;
    const columnHeaderWidth = headerEle.getBoundingClientRect().width;
    
    const tableEle = document.getElementsByClassName('rc-dt-table')[0]
    const tableWidth = tableEle.getBoundingClientRect().width;

    const headerGroupId = headerEle.getAttribute('data-parentheaderid');
    const groupHeaderEle = [...document.querySelectorAll('[data-headergroupid]')]
                           .find((headerGroup) => 
                                headerGroup
                                .getAttribute('data-headergroupid') === headerGroupId)   
    const groupHeaderWidth = groupHeaderEle.getBoundingClientRect().width;



    isResizing = true;
    let startX = e.pageX;

    currentlyResizing = {
        startX,
        headerEle,
        groupHeaderEle,
        tableEle,  
        columnHeaderWidth,
        groupHeaderWidth,
        tableWidth
    };

    document.addEventListener('mousemove', resizeColumnMoving);
    document.addEventListener('mouseup', resizeColumnEnd);
    document.addEventListener('mouseleave', resizeColumnEnd);                                                      
}

const resizeColumnMoving = (event) => {
    event.stopPropagation();

    if(!isResizing) return;

    let pageX = event.pageX;

    const widthDiff = pageX - currentlyResizing.startX;
    
    const headerGroupRow = document.getElementsByClassName('rc-dt-headergroup-row')[0];

    const tableEleNewWidth = currentlyResizing.tableWidth + widthDiff;
    const headerEleNewWidth = currentlyResizing.columnHeaderWidth + widthDiff;  
    const headerGroupNewWidth =  currentlyResizing.groupHeaderWidth + widthDiff;  
    

    currentlyResizing.headerEle.style.width = `${headerEleNewWidth}px`; 
    currentlyResizing.groupHeaderEle.style.width = `${headerGroupNewWidth}px`;
    currentlyResizing.tableEle.style.width = `${tableEleNewWidth}px`;

    headerGroupRow.style.width = `${tableEleNewWidth}px`;
}

const resizeColumnEnd = (event) => {
    event.stopPropagation();
    isResizing = false;
    currentlyResizing = {};
    document.removeEventListener('mousemove', resizeColumnMoving);
    document.removeEventListener('mouseup', resizeColumnEnd);
    document.removeEventListener('mouseleave', resizeColumnEnd);
}

const ColumnResizer = ({value}) => {
    return <div 
                onMouseDown={e => onMouseDown(e, value)}
                className="rc-column-resizer">
                </div>
}

export default ColumnResizer;