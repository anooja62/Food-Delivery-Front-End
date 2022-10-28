import React from 'react';
import ReactDOM from 'react-dom';
import MoviesSingle from '../../components/movie_single/MovieSingle';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MoviesSingle />, div);
});