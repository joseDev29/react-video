import gravatar from "../../utils/gravatar";

test("Gravatar function test", () => {
  const email = "oscar@arepa.dev";
  const gravatarUrl =
    "https://www.gravatar.com/avatar/4b84ab1122c7ee522710c5ead5525839?d=identicon";
  expect(gravatarUrl).toEqual(gravatar(email));
});
