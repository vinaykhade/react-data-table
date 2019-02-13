const utils = (() => {
  let sumOfColumnWidths = 0;
  let headerGroupWidthMap = {};

  const setTableRowsWidth = (tableElements, width) => {
    [...tableElements].forEach(tableEle => {
      tableEle.style.width = `${Math.round(width)}px`;
    });
  };

  const getGroupHeaderWidthMap = (headerGroupId, colMinWidth) => {
    if (headerGroupWidthMap[headerGroupId]) {
      const previousWidth = headerGroupWidthMap[headerGroupId];
      const newWidth = previousWidth + colMinWidth;
      headerGroupWidthMap[headerGroupId] = Math.round(newWidth);
    } else {
      headerGroupWidthMap[headerGroupId] = Math.round(colMinWidth);
    }
  };

  const setTableColumnsAndRowsWidth = (
    headerCol,
    tableContainerWidth,
    sumOfMinWidthOfColumns,
    tableHeaderRow,
    tableEle,
    tableGroupHeaderRow,
    headerRow
  ) => {
    if (tableContainerWidth > sumOfMinWidthOfColumns) {
      const netWidthDiff = tableContainerWidth - sumOfMinWidthOfColumns;
      const defaultColsDiff = tableHeaderRow.length;
      const extraPerColumnWidth = netWidthDiff / defaultColsDiff;
      const colMinWidth =
        headerCol
          .querySelector('.rc-column-content .header-label')
          .getBoundingClientRect().width +
        50 +
        30 +
        extraPerColumnWidth;

      // eslint-disable-next-line rule-name no-param-reassign
      headerCol.setAttribute('min-width', `${colMinWidth}px`);
      headerCol.style.width = `${Math.round(colMinWidth)}px`;

      const headerGroupId = headerCol.getAttribute('data-parentheaderid');
      getGroupHeaderWidthMap(headerGroupId, colMinWidth);

      sumOfColumnWidths += Math.round(colMinWidth);
      setTableRowsWidth(
        [tableEle, tableGroupHeaderRow, headerRow],
        sumOfColumnWidths
      );
    } else {
      const colMinWidth =
        headerCol
          .querySelector('.rc-column-content .header-label')
          .getBoundingClientRect().width +
        50 +
        30;
      headerCol.setAttribute('min-width', `${colMinWidth}px`);
      headerCol.style.width = `${Math.round(colMinWidth)}px`;

      const headerGroupId = headerCol.getAttribute('data-parentheaderid');
      getGroupHeaderWidthMap(headerGroupId, colMinWidth);

      const extraWidth = tableHeaderRow.length * 50;
      setTableRowsWidth(
        [tableEle, tableGroupHeaderRow, headerRow],
        sumOfMinWidthOfColumns + extraWidth
      );
    }
  };

  const arrangeColumnWidths = () => {
    const tableGroupHeaderRow = document.getElementsByClassName(
      'rc-dt-headergroup-row'
    )[0];
    const tableHeaderRow = document.getElementsByClassName('rc-header-column');
    const headerRow = document.getElementsByClassName('rc-dt-header-row')[0];
    const tableEle = document.getElementsByClassName('rc-dt-table')[0];
    const tableContainerWidth = document
      .getElementsByClassName('rc-dt-container')[0]
      .getBoundingClientRect().width;

    let sumOfMinWidthOfColumns = 0;
    [...tableHeaderRow].forEach(col => {
      const colMinWidth =
        col
          .querySelector('.rc-column-content .header-label')
          .getBoundingClientRect().width + 30;
      sumOfMinWidthOfColumns += Math.round(colMinWidth);
    });

    if (tableHeaderRow.length > 0) {
      [...tableHeaderRow].forEach(headerCol => {
        setTableColumnsAndRowsWidth(
          headerCol,
          tableContainerWidth,
          sumOfMinWidthOfColumns,
          tableHeaderRow,
          tableEle,
          tableGroupHeaderRow,
          headerRow
        );
      });

      const groupHeaderColList = document.getElementsByClassName(
        'rc-dt-header-column'
      );
      [...groupHeaderColList].forEach(headerGroup => {
        const headerGroupId = headerGroup.getAttribute('data-headergroupid');
        const headerGroupWidth = headerGroupWidthMap[headerGroupId];
        setTableRowsWidth([headerGroup], headerGroupWidth);
      });

      /* Reset values to initial after looping */
      sumOfColumnWidths = 0;
      headerGroupWidthMap = {};
    }
  };

  return {
    arrangeColumnWidths
  };
})();

export default utils;
