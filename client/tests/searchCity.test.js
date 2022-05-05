import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CityDashboard from "../src/components/CityDashboard";
import React from "react";

const mocks = {
  cities: [
    { id: 1, country: "France", city: "Paris" },
    { id: 2, country: "Suriname", city: "Paramaribo" },
    { id: 3, country: "Italy", city: "Parma" },
    { id: 4, country: "Sweden", city: "Stockholm" },
  ], 
  images: [
    {id: 'image-id', photographer: 'random photographer', image: 'example.com'},
    {id: 'image-id2', photographer: 'random photographer', image: 'example.com'},
  ]
}

jest.mock("../src/services/fetchService", () => {
  return {
    fetchCities: () => {
      return Promise.resolve(mocks.cities);
    }, 
    fetchImages: () => {
      return Promise.resolve(mocks.images);
    } 
  }
})


it('Should render relevant components on search', async () => {
  let {getByPlaceholderText,getAllByText } = render(<CityDashboard /> );
    
  await waitFor(()=> {
    let stockholm = getAllByText(/stockholm/i);
    let paris = getAllByText(/paris/i);
    let paramaribo = getAllByText(/Paramaribo/i);
    let parma = getAllByText(/Parma/i);

    expect(stockholm).toHaveLength(1);
    expect(paris).toHaveLength(1);
    expect(paramaribo).toHaveLength(1);
    expect(parma).toHaveLength(1);
  })

  await waitFor(()=> {
    const search = getByPlaceholderText('Search for a city');
    fireEvent.changeText(search, 'Par');

    paris = getAllByText(/Paris/i);
    paramaribo = getAllByText(/Paramaribo/i);
    parma = getAllByText(/Parma/i);

    expect(paris).toHaveLength(1);
    expect(paramaribo).toHaveLength(1);
    expect(parma).toHaveLength(1);
    expect(()=> {getAllByText(/Stockholm/i)}).toThrow('Unable to find an element with text: /Stockholm/i')
  })


})
