import { faker } from "@faker-js/faker";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const startDate = new Date(query.startDate as string);
  const endDate = new Date(query.endDate as string);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  return {
    totalSales: faker.number.int({ min: 20000, max: 50000 }),
    totalOrders: faker.number.int({ min: 100, max: 1000 }),
    bill: faker.number.int({ min: 15000, max: 25000 }),
    users: faker.number.int({ min: 30, max: 100 }),
  };
});
