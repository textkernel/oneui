const { execSync } = require('child_process');

const API_URL = 'https://sheetdb.io/api/v1';

async function insertRow(url, insertData) {
    const response = await fetch(url, {
        method: 'POST',
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

    if (response.status < 200 || response.status >= 300) {
        const message = await response.text();
        throw new Error(`Unable to insert a row. Request failed: ${message}`);
    }

    return response.json();
}

async function saveMetricsToSpreadsheet({ total, rtl }) {
    const url = `${API_URL}/${process.env.SHEET_DB_TOKEN}`;
    const date = new Date();
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    await insertRow(url, {
        date: `${day}/${month}/${year}`,
        enzyme: total - rtl,
        rtl,
        progress: `=${rtl}/${total}`,
    });
}

async function execute() {
    const findAllTestFilesCommand =
        'find ./src -mindepth 1 -type f \\( -iname \\*.spec.js -o -iname \\*.spec.jsx -o -iname \\*.spec.ts -o -iname \\*.spec.tsx \\) | sort --unique';

    const totalTests = execSync(findAllTestFilesCommand);
    const rtlTests = execSync(
        `${findAllTestFilesCommand} | xargs grep -E "from '@testing-library/react'|from 'react-test-renderer'" | sort --unique`
    );

    const totalMetric = totalTests
        .toString('utf-8')
        .split('\n')
        .filter((item) => item.startsWith('./src/')).length;
    const rtlMetric = rtlTests
        .toString('utf-8')
        .split('\n')
        .filter((item) => item.startsWith('./src/')).length;

    console.log(
        `Metrics were extracted successfully. enzymeMetric = ${totalMetric}; rtlMetric = ${rtlMetric}`
    );

    try {
        await saveMetricsToSpreadsheet({
            total: totalMetric,
            rtl: rtlMetric,
        });
        console.log('Metrics were saved successfully');
    } catch (error) {
        console.error(`Failed while saving the metrics: ${error.message}`);
        process.exit(1);
    }
}

(async () => execute())();

execute();
