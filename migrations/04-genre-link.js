module.exports = function (migration) {
  // New Genre content type.
  const genre = migration
    .createContentType("genre")
    .name("Genre")
    .displayField("name");
  genre.createField("name").type("Symbol").required(true).name("Name");
  genre
    .createField("slug")
    .type("Symbol")
    .required(true)
    .name("URL Slug")
    .validations([{ unique: true }]);

  // Create a new Genre field in the Book content type.
  const book = migration.editContentType("book");
  book
    .createField("genre_ref") // Using a temporary id to be able to transform entries.
    .name("Genre")
    .type("Link")
    .linkType("Entry")
    .validations([
      {
        linkContentType: ["genre"],
      },
    ]);

  // Derives genres based on the existing genre Symbol, and links these back to book entries.
  migration.deriveLinkedEntries({
    // Start from book's genre field
    contentType: "book",
    from: ["genre"],
    // This is the field we created above, which will hold the link to the derived genre entries.
    toReferenceField: "genre_ref",
    // The new entries to create are of type 'genre'.
    derivedContentType: "genre",
    // We'll only create a genre using a name and a slug for now.
    derivedFields: ["name", "slug"],
    identityKey: async (from) => {
      // The genre name will be used as an identity key.
      return from.genre["en-US"].toLowerCase();
    },
    deriveEntryForLocale: async (from, locale) => {
      // The structure represents the resulting genre entry with the 2 fields mentioned in the `derivedFields` property.
      return {
        name: from.genre[locale],
        slug: from.genre[locale].toLowerCase(),
      };
    },
  });

  // Disable the old field for now so editors will not see it.
  // book.editField("genre").disabled(true);
};
