import React, { useState, useEffect } from 'react'
import axios from 'axios'

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ['']
}

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);

    useEffect(() => {
        const movieToEdit = props.movies.find(
            movie => `${movie.id}` === props.match.params.id
        );
        if (movieToEdit) setMovie(movieToEdit);
    }, [props.match.params.id, props.movies])

    const handleChange = e => {
        e.persists();
        setMovie({...movie, [e.target.name]: e.target.value})
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => console.log(res))
            .catch(err => console.log(err.response))
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name='title'
                    onChange={handleChange}
                    placeholder='title'
                    value={movie.title}
                />
                <input 
                    type='text'
                    name='director'
                    onChange={handleChange}
                    placeholder='director'
                    value={movie.director}
                />
                <input 
                    type='text'
                    name='metascore'
                    onChange={handleChange}
                    placeholder='metascore'
                    value={movie.metascore}
                />
                <input 
                    type='text'
                    name='stars'
                    onChange={handleChange}
                    placeholder='stars'
                    value={movie.stars}
                />
                <button>update</button>
            </form>
        </div>
    )
}

export default UpdateMovie