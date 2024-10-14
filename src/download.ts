const downloadFile = (mime: string, fileNameString: string, sourceObject: string) => {
  const dataStr = `data:${mime};charset=utf-8,${encodeURIComponent(sourceObject)}`;

  const link = document.createElement('a');
  if (link.download !== undefined) {
    link.setAttribute('href', dataStr);
    link.setAttribute('download', fileNameString);
    link.style.visibility = 'hidden';
    link.dataset.interception = 'off';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const downloadJson = (fileName: string, data: string) => {
  if (!fileName.endsWith('.json')) {
    fileName += '.json';
  }

  downloadFile('text/json', fileName, data);
};
export const downloadIcs = (fileName: string, data: string) => {
  if (!fileName.endsWith('.ics')) {
    fileName += '.ics';
  }

  downloadFile('text/calendar', fileName, data);
};
