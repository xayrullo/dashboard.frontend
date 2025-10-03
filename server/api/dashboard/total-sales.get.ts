import { faker } from "@faker-js/faker";

export default defineEventHandler(async (event) => {
  return Array.from({ length: 4 }).map(() => ({
    label: faker.commerce.department(),
    data: faker.number.int({ min: 1000, max: 10000 }),
    backgroundColor: faker.color.rgb({ format: "css" }),
  }));
});
