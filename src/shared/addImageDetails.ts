export function addImageDetails(img: string | undefined): string {
  if (!img) return "";
  switch (img.charAt(0)) {
    case "/":
      return "data:image/jpg;base64," + img;
    case "i":
      return "data:image/png;base64," + img;
    case "P":
      return "data:image/svg+xml;base64," + img;
    default:
      return img;
  }
}
