import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import App from '../../App';
const MockLogin = () => {
    return(
        <BrowserRouter>
            <Login/>
        </BrowserRouter>
    );
}

test('renders login fields', () => {
  render(<MockLogin/>);
  let username = screen.getByTestId('username');
  let pass = screen.getByTestId('password');
  expect(username).toBeInTheDocument();
  expect(pass).toBeInTheDocument();
});


jest.setTimeout(60000);
test('renders home page after login', async () => {
    render(<App/>);
    fireEvent.click(screen.getByText(/Securitree/i));
    let l3 = screen.getByTestId(/nav-logout/i);
    fireEvent.click(l3);
    let username = screen.getByTestId(/username/i);
    let pass = screen.getByTestId(/password/i);
    let btn = screen.getByTestId(/login-btn/i);
    fireEvent.change(username,{target : { value : 'francis' }});
    fireEvent.change(pass,{target : { value : '12<>{}34Cisco' }});
    fireEvent.click(btn);
    await waitFor(() => {
        expect(screen.getAllByText(/security/i)[0]).toBeInTheDocument();
    })
    //screen.debug();
});

test('renders error toast after wrong credentials are used', async () => {
    render(<App/>);
    fireEvent.click(screen.getByText(/Securitree/i));
    let l3 = screen.getByTestId(/nav-logout/i);
    fireEvent.click(l3);
    let username = screen.getByTestId(/username/i);
    let pass = screen.getByTestId(/password/i);
    let btn = screen.getByTestId(/login-btn/i);
    fireEvent.change(username,{target : { value : 'francisco' }});
    fireEvent.change(pass,{target : { value : '12<>{}34Cisco' }});
    fireEvent.click(btn);
    await waitFor(() => {
        expect(screen.getAllByText(/Please check your credentials and retry login./i)[0]).toBeInTheDocument();
    })
    //screen.debug();
});