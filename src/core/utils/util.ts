export const isNumber = (value: any) => {
  return typeof value === "number";
};

export const downloadFile = (
  data: any,
  dataType?: string,
  fileName?: string
) => {
  const binaryData = [];

  binaryData.push(data);
  const downloadLink = document.createElement("a");

  downloadLink.href = window.URL.createObjectURL(
    new Blob(binaryData, { type: dataType })
  );

  if (fileName) downloadLink.setAttribute("download", fileName);

  downloadLink.click();
};

export const dataURLToFile = (dataURL: string, fileName: string) => {
  const arr = dataURL.split(",");
  const mime = arr[0]?.match(/:(.*?);/)?.[1];
  const bstr = Buffer.from(arr[arr.length - 1], "base64").toString("ascii");
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
};
