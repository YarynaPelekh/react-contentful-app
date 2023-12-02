module.exports = function (migration) {
  // Simplistic function deducing a pseudo from author name.
  const pseudoFromAuthor = (firstName, lastName) => {
    return firstName.trim() + "-" + lastName.trim();
  };

  // Derives pseudo based on author's name.
  migration.transformEntries({
    contentType: "persona",
    from: ["firstName", "lastName"],
    to: ["pseudonym"],
    transformEntryForLocale: async (name, locale) => {
      return {
        pseudonym: pseudoFromAuthor(
          name.firstName[locale],
          name.lastName[locale]
        ),
      };
    },
  });
};
