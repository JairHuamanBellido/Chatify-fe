import { SignUpSchema } from "../SignUpSchema";

describe("SignUpSchema", () => {
  it("should be a valid schema", () => {
    // Assert
    expect(
      SignUpSchema.parse({
        name: "Jair",
        email: "myemail@gmail.com",
        password: "a password",
        repeatPassword: "a password",
      })
    ).toBeTruthy();
  });

  it("should not be a valid schema", () => {
    // Assert
    expect(
      SignUpSchema.safeParse({
        name: "Jair",
        email: "myemail@gmail.com",
        password: "a password",
      }).success
    ).not.toBeTruthy();

    expect(
      SignUpSchema.safeParse({
        name: "",
        email: "myemail@gmail.com",
        password: "a password",
        repeatPassword: "a password",
      }).success
    ).not.toBeTruthy();

    expect(
      SignUpSchema.safeParse({
        name: "",
        email: "myemail@",
        password: "a password",
        repeatPassword: "a password",
      }).success
    ).not.toBeTruthy();

    expect(
      SignUpSchema.safeParse({
        name: "",
        email: "",
        password: "",
        repeatPassword: "",
      }).success
    ).not.toBeTruthy();
  });
});
