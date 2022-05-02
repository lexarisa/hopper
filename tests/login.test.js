import Login from '../client/src/screens/Login';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('./../client/src/context/UserContext', () => ({
  login: () => ({ ok: false, errors: {password: 'Required'} })
}));

it('Should call login with the correct credentials', async () => {
  
  const navigation = jest.fn();
  const credentials = { username: 'Mathieu', password: 'secret'};
  render(<Login navigation={navigation}/>)

  const usernameInput = screen.getByPlaceholderText(/Username/);
  const passwordInput = screen.getByPlaceholderText(/Password/);
  const loginButton = screen.getByRole('button', {text: /Login/}) // can CustomButton be assimilated to button?

  userEvent.type(usernameInput, 'Mathieu')
  userEvent.type(passwordInput, '')

  await userEvent.click(loginButton);

  const items = await screen.findAllByText(/Required/)

  expect(items).toHaveLength(1);

})