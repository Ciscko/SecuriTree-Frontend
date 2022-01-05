import { render, screen } from '@testing-library/react';
import Back from '../Back';

test('renders navigation buttons', () => {
  render(<Back back={true} />);
  let linkElement = screen.getByRole(/nav/i);
  expect(linkElement).toHaveTextContent('arrow_back');
});

test('renders navigation buttons', () => {
    render(<Back back={false} />);
    let linkElement = screen.getByRole(/nav/i);
    expect(linkElement).toHaveTextContent('arrow_forward');
  });