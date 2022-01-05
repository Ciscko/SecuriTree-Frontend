import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

const MockHome = () => (
    <BrowserRouter>
            <Home/>
    </BrowserRouter>
)

test('renders links', () => {
 render(<MockHome/>);

 let l1 = screen.getAllByText(/View Security Entity Hierarchy/i);
 let l2 = screen.getAllByText(/Upload Data/i);
 let l3 = screen.getAllByText(/Manage Doors/i);
 let l4 = screen.getAllByText(/Logout/i);

 expect(l1[0]).toBeInTheDocument('View Security Entity Hierarchy');

 expect(l2[1]).toBeInTheDocument('Upload Data');

 expect(l3[1]).toBeInTheDocument('Manage Doors');

 expect(l4[1]).toBeInTheDocument('Logout');
});
