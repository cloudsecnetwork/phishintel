import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the API configuration
jest.mock('./config/api', () => ({
  API_BASE_URL: 'http://localhost:5000/api'
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('App Component', () => {
  test('renders without crashing', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('renders navigation elements', () => {
    renderWithRouter(<App />);
    // Check for common navigation elements
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('renders main content area', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
