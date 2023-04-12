import React from 'react';
import css from '../css/search.css';
import { Input, InputLeftAddon, InputGroup, layout} from '@chakra-ui/react'
import { Box} from '@chakra-ui/react'
import { BookList } from '../components';


const data = [
    { value: "ghana", label: "Ghana" },
    { value: "nigeria", label: "Nigeria" },
    { value: "kenya", label: "Kenya" },
    { value: "southAfrica", label: "South Africa" },
    { value: "unitedStates", label: "United States" },
    { value: "canada", label: "Canada" },
    { value: "germany", label: "Germany" }
  ];


export const Search = () => {

    const [value, setValue] = React.useState('');
    const onChange = (event) => {
        setValue(event.target.value);
    }
    const onSearch = (searchTerm) => {
        setValue(searchTerm);
        //API fetching here for search results
        console.log('seaerch',searchTerm);
    }

    return (
        <>
            {/* <InputGroup>
                <InputLeftAddon children='Title' />
                <Input class='searchBar' variant='filled' placeholder='Book Search'/>
            </InputGroup> */}
            
            <header>search</header>
            <div class='search-container'>
                <div class='search-inner'>
                    <input type='text' value={value} onChange={onChange} />
                    <button onClick={()=> onSearch(value)}>Search</button>
                </div> 
                <div className='dropdown'>
                    {/* <div className='dropdown-content'> */}
                        {data.filter(item=>{
                            const search_term = value.toLowerCase();
                            const full_name = item.label.toLowerCase();

                            return search_term && full_name.startsWith(search_term) && item.label !== search_term;
                            
                        }).slice(0,10)
                        .map((item) => (
                            <div onClick = {()=>onSearch(item.label)} className='dropdown-row'
                            key={item.value}
                            >{item.full_name}</div>
                            ))}
                </div>
            </div>
        </>
    );
}