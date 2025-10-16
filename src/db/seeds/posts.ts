import { faker } from '@faker-js/faker';

const fakePost = (authorId: string) => {
  const title = faker.lorem.sentence({ min: 5, max: 10 });
  const slug = faker.lorem.slug({ min: 5, max: 10 });
  const description = faker.lorem.sentence({ min: 50, max: 100 });
  const coverImage = faker.image.urlPicsumPhotos({
    width: 1200,
    height: 800,
    blur: 0,
    grayscale: false,
  });
  const category = faker.helpers.arrayElement([
    'Technology',
    'Health',
    'Lifestyle',
    'Travel',
    'Food',
    'Business',
    'Education',
    'Entertainment',
    'Sports',
    'Finance',
    'Fashion',
  ]);
  const categoryId = faker.number.int({ min: 1, max: 11 });
  const featured = faker.datatype.boolean();
  const createdAt = faker.date.past();

  const content = `
     <img src="${coverImage}" title="Post image" />
    <h2>${title}</h2>
    <p>${faker.lorem.paragraph(2)}</p>
    <h3>${faker.lorem.sentence()}</h3>
    <p>${faker.lorem.paragraphs(4)}</p>
    <h3>Key Concepts</h3>
    <ul>
      <li>${faker.lorem.sentence()}</li>
      <li>${faker.lorem.sentence()}</li>
      <li>${faker.lorem.sentence()}</li>
    </ul>
    <h3>Conclusion</h3>
    <p>${faker.lorem.paragraph(2)}</p>
  `;

  return {
    title,
    slug,
    description,
    coverImage,
    content,
    authorId,
    category,
    categoryId,
    featured,
    createdAt,
  };
};

export const seedPosts = (authorId: string) => {
  return Array.from({ length: 6 }).map(() => fakePost(authorId));
};

// export const seedPosts = (authorId: string) => {
//   return Array.from({ length: 6 }).map(() => ({
//     title: faker.lorem.sentence({ min: 5, max: 10 }),
//     slug: faker.lorem.slug({ min: 5, max: 10 }),
//     description: faker.lorem.sentence({ min: 50, max: 100 }),
//     coverImage: faker.image.urlPicsumPhotos({
//       width: 1200,
//       height: 800,
//       blur: 0,
//       grayscale: false,
//     }),
//     content: `
//      <img src="${}" title="Post image" />
//     <h2>${title}</h2>
//     <p>${faker.lorem.paragraph()}</p>
//     <h3>What You’ll Learn</h3>
//     <p>${faker.lorem.paragraphs(2)}</p>
//     <h3>Key Concepts</h3>
//     <ul>
//       <li>${faker.lorem.sentence()}</li>
//       <li>${faker.lorem.sentence()}</li>
//       <li>${faker.lorem.sentence()}</li>
//     </ul>
//     <h3>Conclusion</h3>
//     <p>${faker.lorem.paragraph()}</p>
//   `,
//     category: faker.helpers.arrayElement([
//       'Technology',
//       'Health',
//       'Lifestyle',
//       'Travel',
//       'Food',
//       'Business',
//       'Education',
//       'Entertainment',
//       'Sports',
//       'Finance',
//       'Fashion',
//     ]),
//     authorId,
//     categoryId: faker.number.int({ min: 1, max: 11 }),
//     featured: faker.datatype.boolean(),
//     createdAt: faker.date.past(),
//   }));
// };
