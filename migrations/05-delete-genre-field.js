module.exports = function (migration) {
  // delete a new genre field in the person content type.
  const genre = migration.editContentType("book");
  genre.deleteField("genre_ref");
};
