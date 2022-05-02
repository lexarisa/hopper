import { Login } from "../src/screens/Login";
import { render, act, fireEvent } from "@testing-library/react-native";
import React from "react";
import "react-native";

jest.mock("../src/context/UserContext", () => ({
  useUser: () => {
    return {
      login: () => ({ ok: false, errors: { password: "Required" } }),
    };
  },
}));

it("Should return an error message if login with empty password", async () => {
  const { getByA11yRole, getAllByText, getByPlaceholderText } = render(<Login />);
  await act(async () => {
    // console.log('getByPlaceholderText("Username")', getByPlaceholderText("Username"))
    await fireEvent.changeText(getByPlaceholderText("Username"), "Mathieu");
    await fireEvent.changeText(getByPlaceholderText("Password"), "");
    await fireEvent.press(getByA11yRole("button"));
    // console.log('getByPlaceholderText("Username")', getByPlaceholderText("Username"))
    const requireElement = await getAllByText("Required");
    console.log('requireElement', requireElement.pendingProps.value)
    expect(requireElement).toHaveLength(1);
  });
});

// it("Should return two error messages if login with incorrect credentials", async () => {
//   const { getByA11yRole, getAllByText } = render(<Login />);
//   await act(async () => {
//     // await fireEvent.changeText(getByPlaceholderText("Username"), "Mathieu");
//     await fireEvent.press(getByA11yRole("button"));
//   });
//   const requireElement = getAllByText("Required");
//   console.log('requireElement', requireElement)
//   expect(requireElement).toHaveLength(2);
// });
