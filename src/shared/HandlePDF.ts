function base64ToFile(base64String: string): File | null {
 
  const match = base64String.match(/^data:(.+?);name=(.+?);base64,(.+)$/);
  if (!match) {
    //console.error("Invalid base64 string format");  
    return null;

      //throw new Error("Invalid base64 string format");
  }

  const type = match[1];
  const filename = match[2];
  const base64Data = match[3];

  const buffer = Buffer.from(base64Data, 'base64');
  const blob = new Blob([buffer], { type: type });
  const newFile =  new File([blob], filename, { type: type });
  return newFile;
}

export default base64ToFile;