import exportFromJSON from 'export-from-json';

export default function exportToXls(jsonToExport){
    const fileName = "mesprimes";
    const data = jsonToExport;
    const exportType = 'xls';
    exportFromJSON({ data, fileName, exportType })
}

