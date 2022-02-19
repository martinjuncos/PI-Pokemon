import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {searchByName} from '../../actions/index';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(searchByName(name));
        setName(''); //para que se limpie en el input
    }


    return(
        <div>
            <input
            onChange={(e) => handleInputChange(e)}
            type= 'text'
            placeholder='search...'
            value= {name}
            />
            <button
            onClick={(e) => handleSubmit(e)}
            type= 'submit'
            >Search
            </button>
        </div>
    )
}