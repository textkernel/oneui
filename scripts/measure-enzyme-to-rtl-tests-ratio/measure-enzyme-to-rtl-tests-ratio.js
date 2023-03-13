const { spawn } = require('child_process');

const API_URL = 'https://sheetdb.io/api/v1/g3uyrf24ruo1v';
const ENZYME_COLUMN = 'enzyme';
const RTL_COLUMN = 'rtl';
const ID_PATTERN = 'id-';
const NOT_VALID_ID_PATTERN = 'id';

async function getColumnData(columnName) {
    const columnData = await fetch(API_URL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error('SheetDB data fetch error: ', error);
        });

    for (let i = 0; i < columnData.length; i += 1) {
        const currentColumnData = columnData[i];
        if (columnName === ENZYME_COLUMN && currentColumnData.enzyme.includes(ID_PATTERN)) {
            return currentColumnData.enzyme;
        }
        if (columnName === RTL_COLUMN && currentColumnData.rtl.includes(ID_PATTERN)) {
            return currentColumnData.rtl;
        }
    }

    return NOT_VALID_ID_PATTERN;
}

async function insertCellValue(testsCount, columnName) {
    const cellId = await getColumnData(columnName);
    if (cellId !== NOT_VALID_ID_PATTERN) {
        const url = `${API_URL}/${columnName}/${cellId}`;
        const valueCellInset = `${testsCount}`;
        const insertData =
            columnName === ENZYME_COLUMN
                ? {
                      enzyme: valueCellInset,
                  }
                : {
                      rtl: valueCellInset,
                  };
        await fetch(url, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: {
                    insertData,
                },
            }),
        });
    }
}

async function execute() {
    const enzymeCommand =
        'find ./src -mindepth 1 -type f \\( -iname \\*.spec.js -o -iname \\*.spec.jsx  -iname \\*.spec.ts -iname \\*.spec.tsx \\) | wc -l\n';
    const enzymeTests = spawn(enzymeCommand, {
        shell: true,
    });
    enzymeTests.stdout.on('data', (data) => {
        insertCellValue(data, ENZYME_COLUMN);
    });

    const rtlCommand =
        'find ./src -mindepth 1 -type f \\( -iname "*.spec.js" -o -iname "*.spec.jsx" -o -iname "*.spec.ts" -iname "*.spec.tsx" \\) | xargs grep -m 1 "from \'@testing-library/react\'" | wc -l\n';
    const rtlTests = spawn(rtlCommand, {
        shell: true,
    });
    rtlTests.stdout.on('data', (data) => {
        insertCellValue(data, RTL_COLUMN);
    });
}

execute();
