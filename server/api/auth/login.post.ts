import { faker } from "@faker-js/faker";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (body.email === "faker@gmail.com" && body.password === "123456") {
    return {
      accessToken: faker.string.alphanumeric(32),
      refreshToken: faker.string.alphanumeric(32),
      id: faker.string.uuid(),
      email: body.email,
      username: faker.internet.username(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      gender: faker.person.sexType(),
      image: faker.image.avatar(),
    };
  }

  throw createError({
    statusCode: 401,
    statusMessage: "Invalid credentials",
  });
});
