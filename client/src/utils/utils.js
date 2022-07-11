export const categoryName = (str) => {
  switch (str) {
    case "videogames":
      return "Gaming";
    default:
      return str.charAt(0).toUpperCase() + str.slice(1);
  }
};
