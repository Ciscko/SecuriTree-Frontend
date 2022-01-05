import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import { BrowserRouter } from 'react-router-dom';
import DataUpload from '../DataUpload';

const  MockUploadData = () => {
    return(
    <BrowserRouter>
            <DataUpload/>
    </BrowserRouter>
)};

jest.setTimeout(60000);

describe('renders the upload page and its functions ', () => {
    test('renders upload buttons', () => {
        render(<MockUploadData/>);
        let t = screen.getByText(/SYSTEM DATA/i);
        let input = screen.getByTestId(/usersinput/i);
        expect(input).toBeInTheDocument();
        expect(screen.getByTestId(/usersbtn/i)).toBeInTheDocument();
        expect(t).toBeInTheDocument();
      });

      test('Asks for a file if upload button clicked without a file', () => {
        render(<MockUploadData/>);
        fireEvent.click(screen.getByTestId(/usersbtn/i));
        expect(screen.getByText(/Please select a file!/i)).toBeInTheDocument();
      });

      test('responds to change of file input', async () => {
        render(<MockUploadData/>);
        let file = new File(['datafile.json'], 'data.json', { type: 'json' });
        fireEvent.click(screen.getByText(/Securitree/i));
        fireEvent.click(screen.getByTestId(/nav-upload/i));
        userEvent.upload(screen.getByTestId('usersinput'), file);
        userEvent.upload(screen.getByTestId('sysinput'), file);
        
        expect(screen.getByTestId('usersinput').files[0]).toStrictEqual(file);
        expect(screen.getByTestId('sysinput').files[0]).toStrictEqual(file);
        expect(screen.getByTestId('sysinput').files).toHaveLength(1);
        expect(screen.getByTestId('usersinput').files).toHaveLength(1);
      });

      test('respond when  wrong file format is uploaded', async () => {
        render(<MockUploadData/>);
        let file = new File(['datafile.json'], 'data.json', { type: 'json' });
        userEvent.upload(screen.getByTestId('sysinput'), file);
        fireEvent.click(screen.getByTestId('usersbtn'));
        waitFor(() => {
            expect(screen.getByText(/Please upload a file with the correct structure!/i)).toBeInTheDocument();
        });
        
      });
})
