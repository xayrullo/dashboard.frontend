import { faker } from "@faker-js/faker";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const categories = query.categories as string[];
  return Array.from({ length: categories.length }).map((el, ind) => ({
    label: categories[ind],
    data: faker.number.int({ min: 1000, max: 10000 }),
    backgroundColor: faker.color.rgb({ format: "css" }),
  }));
});
