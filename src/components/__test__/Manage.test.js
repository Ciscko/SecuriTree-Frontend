import { screen, render, fireEvent,  waitForElement, waitFor }  from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Manage from '../Manage';

const MockManage = () => {
    return(
        <BrowserRouter>
             <Manage/>
        </BrowserRouter>
    );
}
jest.useFakeTimers();
jest.setTimeout(60000);

describe('renders the elements', () => {
    test('renders search bar', () => {
        render(<MockManage/>);
        waitFor(() => {
            expect(screen.getByTestId('search-input')).toBeInTheDocument();
       });
    });

    test('settings button exists', async () => {
        render(<MockManage/>);
        waitFor(() => {
            expect(screen.queryByTestId(/settings-btn-0/i)).toBeInTheDocument();
        }); 
    });

    test('settings button opens modal', () => {
        render(<MockManage/>);
        waitFor(() => {
            fireEvent.click(screen.queryByTestId(/settings-btn-0/i))
            expect(screen.getByText(/UNLOCKED/i)).toBeInTheDocument();
        }); 
    });

    test('settings button opens modal', () => {
        render(<MockManage/>);
        waitFor(() => {
            fireEvent.click(screen.queryByTestId(/settings-btn-0/i))
            expect(screen.getByText(/UNLOCKED/i)).toBeInTheDocument();
            fireEvent.click(screen.getByTestId(/lock-btn/i))
            expect(screen.getByText(/Processing request.../i)).toBeInTheDocument();
            expect(screen.getByText(/Successfully set Door-Status!/i)).toBeInTheDocument();
        }); 
    });
});


