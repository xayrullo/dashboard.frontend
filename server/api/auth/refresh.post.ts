import { faker } from "@faker-js/faker";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.refreshToken) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing refreshToken",
    });
  }

  return {
    accessToken: faker.string.alphanumeric(32),
    refreshToken: faker.string.alphanumeric(32),
  };
});
