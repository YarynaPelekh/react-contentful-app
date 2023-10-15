module.exports = function (migration) {
  // delete a new pseudonym field in the person content type.
  const person = migration.editContentType("persona");
  person.deleteField("pseudonym");
};
