import React from 'react';

let isResizing = false;
let currentlyResizing = {};

const resizeColumnMoving = (e, showHeaderGroups) => {
  e.stopPropagation();

  if (!isResizing) return;

  const { pageX } = e;

  const widthDiff = pageX - currentlyResizing.startX;

  let headerGroupRow = null;
  if (showHeaderGroups) {
    headerGroupRow = document.getElementsByClassName(
      'rc-dt-headergroup-row'
    )[0];
  }
  const headerRow = document.getElementsByClassName('rc-dt-header-row')[0];

  const tableEleNewWidth = currentlyResizing.tableWidth + widthDiff;
  const headerEleNewWidth = currentlyResizing.columnHeaderWidth + widthDiff;
  const headerGroupNewWidth = showHeaderGroups
    ? currentlyResizing.groupHeaderWidth + widthDiff
    : null;

  currentlyResizing.headerEle.style.width = `${Math.round(
    headerEleNewWidth
  )}px`;

  currentlyResizing.tableEle.style.width = `${Math.round(tableEleNewWidth)}px`;
  headerRow.style.width = `${Math.round(tableEleNewWidth)}px`;

  if (showHeaderGroups) {
    currentlyResizing.groupHeaderEle.style.width = `${Math.round(
      headerGroupNewWidth
    )}px`;

    let headerGroupRowWidth = 0;
    const groupHeaderColList = document.getElementsByClassName(
      'rc-dt-header-column'
    );
    [...groupHeaderColList].forEach(headerGroup => {
      headerGroupRowWidth += Math.round(
        headerGroup.getBoundingClientRect().width
      );
    });
    headerGroupRow.style.width = `${Math.round(headerGroupRowWidth)}px`;
  }
};

const resizeColumnEnd = e => {
  e.stopPropagation();
  isResizing = false;
  currentlyResizing = {};
  document.removeEventListener('mousemove', resizeColumnMoving);
  document.removeEventListener('mouseup', resizeColumnEnd);
  document.removeEventListener('mouseleave', resizeColumnEnd);
};

const onMouseDown = (e, showHeaderGroups) => {
  e.stopPropagation();

  const headerEle = e.target.parentElement;
  const columnHeaderWidth = headerEle.getBoundingClientRect().width;

  const tableEle = document.getElementsByClassName('rc-dt-table')[0];
  const tableWidth = tableEle.getBoundingClientRect().width;

  const headerGroupId = headerEle.getAttribute('data-parentheaderid');

  let groupHeaderEle,
    groupHeaderWidth = null;
  if (showHeaderGroups) {
    groupHeaderEle = [
      ...document.querySelectorAll('[data-headergroupid]')
    ].find(
      headerGroup =>
        headerGroup.getAttribute('data-headergroupid') === headerGroupId
    );
    groupHeaderWidth = groupHeaderEle.getBoundingClientRect().width;
  }

  isResizing = true;
  const startX = e.pageX;

  currentlyResizing = {
    startX,
    headerEle,
    groupHeaderEle,
    tableEle,
    columnHeaderWidth,
    groupHeaderWidth,
    tableWidth
  };

  document.addEventListener('mousemove', e =>
    resizeColumnMoving(e, showHeaderGroups)
  );
  document.addEventListener('mouseup', resizeColumnEnd);
  document.addEventListener('mouseleave', resizeColumnEnd);
};

const ColumnResizer = ({ showHeaderGroups }) => {
  return (
    <div
      onMouseDown={e => onMouseDown(e, showHeaderGroups)}
      className="rc-column-resizer"
    />
  );
};

export default ColumnResizer;
