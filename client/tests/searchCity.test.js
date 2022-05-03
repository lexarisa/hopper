import { Home } from "../src/screens/Home";
import { render, act, fireEvent } from "@testing-library/react-native";
import "react-native";

it('Should render relevant components on search', () => {
  const { getAllByText, getByPlaceholderText } = render(
    <Home />
  );
  act( async () => {
    await fireEvent.changeText(getByPlaceholderText("Search for a city"), "Par");
    const parisCard = await getAllByText("Paris");
    const parmaCard = await getAllByText("Parma");
    const paramariboCard = await getAllByText("Paramaribo");
    const stockholmCard = await getAllByText("Stockholm");
    expect(parisCard).toHveLength(1);
    expect(parmaCard).toHveLength(1);
    expect(paramariboCard).toHveLength(1);
    expect(stockholmCard).toHveLength(0);
  })
})
