import { Login } from "../src/screens/Login";
import { render, act, fireEvent } from "@testing-library/react-native";
import "react-native";

jest.mock("../src/context/UserContext", () => ({
  useUser: () => {
    return {
      login: (credentialObject) => {
        if (credentialObject.username && !credentialObject.password) {
          return {
            ok: false,
            errors: { username: undefined, password: "Required" },
          };
        }
        return {
          ok: false,
          errors: { username: "Required", password: "Required" },
        };
      },
    };
  },
}));

it("Should return an error message if login with empty password", async () => {
  const { getByA11yRole, getAllByText, getByPlaceholderText } = render(
    <Login />
  );
  await act(async () => {
    await fireEvent.changeText(getByPlaceholderText("Username"), "Mathieu");
    await fireEvent.changeText(getByPlaceholderText("Password"), "");
    await fireEvent.press(getByA11yRole("button"));
    const requireElement = await getAllByText("Required");
    expect(requireElement).toHaveLength(1);
  });
});

it("Should return two error messages if login with incorrect credentials", async () => {
  const { getByA11yRole, getAllByText } = render(<Login />);
  await act(async () => {
    await fireEvent.press(getByA11yRole("button"));
  });
  const requireElement = getAllByText("Required");
  expect(requireElement).toHaveLength(2);
});
