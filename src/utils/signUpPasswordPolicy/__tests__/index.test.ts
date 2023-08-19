import { signUpPasswordPolicy } from "..";

describe("SignUpPasswordPolicy", () => {
  it("should be a valid password", () => {
    // Assert
    expect(signUpPasswordPolicy.validate("AbcdFH@11")).toBeTruthy();
    expect(signUpPasswordPolicy.validate("abcDdFH2@_/1")).toBeTruthy();
  });

  it("should be an invalid password", () => {
    // Assert
    expect(signUpPasswordPolicy.validate("AbcdFH11")).not.toBeTruthy();
    expect(signUpPasswordPolicy.validate("ABCDEFG@_/1")).not.toBeTruthy();
    expect(signUpPasswordPolicy.validate("a1B@")).not.toBeTruthy();
  });
});
