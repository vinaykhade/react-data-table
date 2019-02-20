const utils = (() => {
  let sumOfColumnWidths = 0;
  let headerGroupWidthMap = {};

  const setTableRowsWidth = (tableElements, width) => {
    [...tableElements].forEach(tableEle => {
      if (tableEle !== null) {
        tableEle.style.width = `${Math.round(width)}px`;
      }
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
      const defaultColsDiff = [...tableHeaderRow].filter(
        headerCol => !headerCol.getAttribute('data-customwidth')
      ).length;
      const extraPerColumnWidth = netWidthDiff / defaultColsDiff;

      const customWidth = headerCol.getAttribute('data-customwidth');

      let colMinWidth = 0;
      if (customWidth) {
        colMinWidth = parseFloat(customWidth);
      } else {
        colMinWidth =
          headerCol
            .querySelector('.rc-column-content .header-label')
            .getBoundingClientRect().width +
          50 +
          30 +
          extraPerColumnWidth;
      }

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
      const customWidth = headerCol.getAttribute('data-customwidth');
      let colMinWidth = 0;
      if (customWidth) {
        colMinWidth = parseFloat(customWidth);
      } else {
        colMinWidth =
          headerCol
            .querySelector('.rc-column-content .header-label')
            .getBoundingClientRect().width +
          50 +
          30;
      }

      headerCol.setAttribute('min-width', `${colMinWidth}px`);
      headerCol.style.width = `${Math.round(colMinWidth)}px`;

      const headerGroupId = headerCol.getAttribute('data-parentheaderid');
      getGroupHeaderWidthMap(headerGroupId, colMinWidth);

      const extraWidth =
        [...tableHeaderRow].filter(
          headerCol => !headerCol.getAttribute('data-customwidth')
        ).length * 50;

      setTableRowsWidth(
        [tableEle, tableGroupHeaderRow, headerRow],
        sumOfMinWidthOfColumns + extraWidth
      );
    }
  };

  const arrangeColumnWidths = showHeaderGroups => {
    let tableGroupHeaderRow = null;
    if (showHeaderGroups) {
      tableGroupHeaderRow = document.getElementsByClassName(
        'rc-dt-headergroup-row'
      )[0];
    }

    const tableHeaderRow = document.getElementsByClassName('rc-header-column');
    const headerRow = document.getElementsByClassName('rc-dt-header-row')[0];
    const tableEle = document.getElementsByClassName('rc-dt-table')[0];
    const tableContainerWidth = document
      .getElementsByClassName('rc-dt-container')[0]
      .getBoundingClientRect().width;

    let sumOfMinWidthOfColumns = 0;
    [...tableHeaderRow].forEach(col => {
      const customWidth = col.getAttribute('data-customwidth');
      if (customWidth) {
        sumOfMinWidthOfColumns += Math.round(customWidth);
      } else {
        const colMinWidth =
          col
            .querySelector('.rc-column-content .header-label')
            .getBoundingClientRect().width + 30;
        sumOfMinWidthOfColumns += Math.round(colMinWidth);
      }

      if (!showHeaderGroups) {
        col.style.top = 0;
      }
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

      if (showHeaderGroups) {
        const groupHeaderColList = document.getElementsByClassName(
          'rc-dt-header-column'
        );
        [...groupHeaderColList].forEach(headerGroup => {
          const headerGroupId = headerGroup.getAttribute('data-headergroupid');
          const headerGroupWidth = headerGroupWidthMap[headerGroupId];
          setTableRowsWidth([headerGroup], headerGroupWidth);
        });
      }

      /* Reset values to initial after looping */
      sumOfColumnWidths = 0;
      headerGroupWidthMap = {};
    }
  };

  const assignDefaultHeaderNames = (columns, headerGroupsExist) => {
    /*TODO: Handle assigning when headergroups do not exist and nesting*/
    return columns.map(col => {
      if (col.Header.length === 0) {
        col.customHeaderName = Math.random()
          .toString(36)
          .substring(7);
      }
      return col;
    });
  };

  const checkForHeaderGroups = columns => {
    let headerGroupsExist = false;
    columns.forEach(col => {
      if (col.columns) {
        headerGroupsExist = true;
        return;
      }
    });

    return headerGroupsExist;
  };

  return {
    arrangeColumnWidths,
    assignDefaultHeaderNames,
    checkForHeaderGroups
  };
})();

export default utils;
