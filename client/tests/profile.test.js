import { render, waitFor } from "@testing-library/react-native";
import { Profile } from "../src/screens/Profile";

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

// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: jest.fn(),
// }))


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
      user: {id: 21, username: "Alabaster"}
    };
  },
}));


jest.mock("../src/services/fetchService", () => {
  return {
    fetchCities: () => {
      return Promise.resolve(mocks.cities);
    }, 
    fetchImages: () => {
      return Promise.resolve(mocks.images);
    },
    fetchCommunities: jest.fn(()=>{
      return Promise.resolve([
        { id: 1, country: "France", city: "Paris" },
        { id: 4, country: "Sweden", city: "Stockholm" },
      ])
    }),
    fetchMessages : jest.fn(()=>{
      return 'Hello World!'
    })
  }
})




it('Should only render joined communities', async ()=> {
  const {getByText} = render(<Profile  />);
  await waitFor(() => {
    let paris = getByText(/Paris/i);
    let stockholm = getByText(/stockholm/i);
    expect(paris).toBeTruthy();
    expect(stockholm).toBeTruthy();
    expect(()=>{getByText(/paramaribo/i)}).toThrow('Unable to find an element with text: /paramaribo/i');
    expect(()=>{getByText(/parma/i)}).toThrow('Unable to find an element with text: /parma/i');
  })




})