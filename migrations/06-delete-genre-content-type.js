module.exports = function (migration) {
  // delete a new genre field in the book content type.
  const genre = migration.deleteContentType("genre");
  // console.log("deleteContentType return -", genre);
};
