export type Person = {
  firstName: string;
  lastName: string;
  pseudonym: string;
};

export type BookType = {
  title: string;
  author: Person;
  sys: { id: string };
  photo: Photo;
  genre: string;
};

export type Photo = {
  url: string;
};

export type LibraryContent = {
  items: BookType[];
};
