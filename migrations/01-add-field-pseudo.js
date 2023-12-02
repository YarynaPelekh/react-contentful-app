module.exports = function (migration) {
  // Create a new pseudonym field in the person content type.
  const person = migration.editContentType("persona");
  person.createField("pseudonym").name("Pseudonym").type("Symbol");
};
