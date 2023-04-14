import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useCookies } from 'react-cookie';
import HighDemandingFoods from '../Components/Restaurants/HighDemandFood/HighDemandFoods';
jest.mock('react-cookie', () => ({
  useCookies: jest.fn()
}));

const mockStore = configureStore([]);

describe('HighDemandingFoods', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      order: {
        mostPopularFoods: [
          { id: 1, name: 'Pizza' },
          { id: 2, name: 'Burger' },
        ],
      },
    });
    useCookies.mockReturnValue([{ restaurantId: '123' }]);
  });

  it('renders the component', () => {
    render(
      <Provider store={store}>
        <HighDemandingFoods />
      </Provider>
    );

    expect(screen.getByText('Highest Demanding Foods')).toBeInTheDocument();
    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('Burger')).toBeInTheDocument();
  });

  it('dispatches the mostPopularFood action with the restaurantId cookie', () => {
    render(
      <Provider store={store}>
        <HighDemandingFoods />
      </Provider>
    );

    expect(store.getActions()).toEqual([
      {
        type: 'orders/mostPopularFood',
        payload: '123',
      },
    ]);
  });
});
