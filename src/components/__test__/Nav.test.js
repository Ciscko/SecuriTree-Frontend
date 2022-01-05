import { render, screen, fireEvent } from '@testing-library/react';
import Nav from '../Nav';
import {BrowserRouter} from 'react-router-dom';
import App from '../../App';

const MockNav = () => {
    return(
       <BrowserRouter>
        <Nav/>
       </BrowserRouter>
    );
}
describe('Nav links are rendered by Nav component', () => {
    test('nav links appears', () => {
        render(<MockNav/>);
        let l1 = screen.getByText(/Dashboard/i);
        expect(l1).toBeInTheDocument('Dashboard');
        let l2 = screen.getByText(/Upload Data/i);
        expect(l2).toBeInTheDocument('Upload Data');
        let l3 = screen.getByText(/Manage Doors/i);
        expect(l3).toBeInTheDocument('Manage Doors');
        let l4 = screen.getByText(/Logout/i);
        expect(l4).toBeInTheDocument('Logout');
        let l5 = screen.getByText(/Hierarchy/i);
        expect(l5).toBeInTheDocument('Hierarchy');
    });
   
});

describe('Nav Links navaigate after clicks', () => {
    beforeEach(() => {
        render(<App/>);
        fireEvent.click(screen.getByText(/Securitree/i));
    });

    afterEach(()=>{
        fireEvent.click(screen.getByText(/Securitree/i));
    });

        test('navigates to security dashboard on click', () => {
            let l5 = screen.getByTestId(/nav-dashboard/i);
            fireEvent.click(l5);
            let t = screen.getByText(/Security Dashboard/i);
            expect(t).toBeInTheDocument('Security Dashboard');
        });

        test('navigates to data upload on click', () => {
            let l1 = screen.getByTestId(/nav-upload/i);
            fireEvent.click(l1);
            let t2 = screen.getByTestId(/system-title/i);
            expect(t2).toBeInTheDocument('SYSTEM DATA');
            let t3 = screen.getByTestId(/users-title/i);
            expect(t3).toBeInTheDocument('USERS DATA');
        });

        test('navigates to view hierarchy page on click', () => {
            let l3 = screen.getByTestId(/nav-hierarchy/i);
            fireEvent.click(l3);
            let t4 = screen.getByText(/View Hierarchy/i)
            expect(t4).toBeInTheDocument('View Hierarchy');
        });
});

test('navigates to login page on clicking logout', () => {
    render(<App/>);
    fireEvent.click(screen.getByText(/Securitree/i));
    let l3 = screen.getByTestId(/nav-logout/i);
    fireEvent.click(l3);
    let t4 = screen.getAllByText(/Login/i)
    t4 = t4[0]
    expect(t4).toBeInTheDocument('LOGIN'); 
});