// import { configure, shallow, mount, render} from 'enzyme';
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { configure } from '@testing-library/dom'
import CityDashboard from "../src/components/CityDashboard";
import React from "react";

// configure({
//   testIdAttribute: 'data-city-name'
// })

const mocks = {
  cities: [
    { city_id: 1, country: "France", city_name: "Paris" },
    { city_id: 2, country: "Suriname", city_name: "Paramaribo" },
    { city_id: 3, country: "Italy", city_name: "Parma" },
    { city_id: 4, country: "Sweden", city_name: "Stockholm" },
  ], 
  images: [
    {id: 'image-id', photographer: 'random photographer', image: 'example.com'}
  ]
}

jest.mock("../src/services/fetchService", () => {
  return {
    fetchCities: () => {
      return mocks.cities;
    }, 
    fetchImages: () => {
      return mocks.images;
    } 
  }
})



it('Should render relevant components on search', async () => {
  let { getByPlaceholderText, getByTestId, getAllByTestId } = render(<CityDashboard /> );

  await waitFor(()=> {
    let stockholm = getAllByTestId('Stockholm');
    let paris = getAllByTestId('Paris');
    let paramaribo = getAllByTestId('Paramaribo');
    let parma = getAllByTestId('Parma');

    expect(stockholm).toHaveLength(1);
    expect(paris).toHaveLength(1);
    expect(paramaribo).toHaveLength(1);
    expect(parma).toHaveLength(1);

    const search = getByPlaceholderText('Search for a city');
    fireEvent.changeText(search, 'Par');

    paris = getAllByTestId('Paris');
    paramaribo = getAllByTestId('Paramaribo');
    parma = getAllByTestId('Parma');

    expect(paris).toHaveLength(1);
    expect(paramaribo).toHaveLength(1);
    expect(parma).toHaveLength(1);
    expect(()=> {getAllByTestId('Stockholm')}).toThrow('Unable to find an element with testID: Stockholm')
  })
})
