import { faker } from "@faker-js/faker";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const categories = query.categories as string[];
  const startDate = new Date(query.startDate as string);
  const endDate = new Date(query.endDate as string);
  const dates = [];
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d).toISOString().split("T")[0]);
  }

  return {
    labels: dates,
    datasets: categories.map((el) => {
      return {
        label: el,
        data: Array.from({ length: dates.length }).map(() =>
          faker.number.int({ min: 1000, max: 10000 })
        ),
        backgroundColor: faker.color.rgb({ format: "css" }),
        hoverOffset: 3,
      };
    }),
  };
});
