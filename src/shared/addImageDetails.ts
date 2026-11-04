// width asks /api/logo for a smaller copy; it does nothing for other images.
export function addImageDetails(img: string | undefined, width?: 256 | 640): string {
  if (!img) return "";
  if (img.startsWith("/api/logo/") && width && !img.includes("?")) return `${img}?w=${width}`;
  // Already a url, e.g. /api/logo/<id>.
  if (img.startsWith("/api/") || img.startsWith("http") || img.startsWith("data:")) return img;
  switch (img.charAt(0)) {
    case "/":
      return "data:image/jpg;base64," + img;
    case "i":
      return "data:image/png;base64," + img;
    case "P":
      return "data:image/svg+xml;base64," + img;
    case "R":
      return "data:image/gif;base64," + img;
    case "U":
      return "data:image/webp;base64," + img;
    default:
      return img;
  }
}
