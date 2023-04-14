import React from "react";
import { Box } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";

import { CUIAutoComplete } from "chakra-ui-autocomplete";

const books = [
    { value: "harryPotter", label: "Harry Potter and the Philosopher's Stone" },
    { value: "toKillAMockingbird", label: "To Kill a Mockingbird" },
    { value: "1984", label: "1984" },
    { value: "theGreatGatsby", label: "The Great Gatsby" },
    { value: "prideAndPrejudice", label: "Pride and Prejudice" },
    { value: "theHobbit", label: "The Hobbit" },
    { value: "theCatchersInTheRye", label: "The Catcher in the Rye" },
    { value: "braveNewWorld", label: "Brave New World" },
    { value: "crimeAndPunishment", label: "Crime and Punishment" },
    { value: "lordOfTheFlies", label: "Lord of the Flies" },
    { value: "theColorPurple", label: "The Color Purple" },
    { value: "theHandmaidsTale", label: "The Handmaid's Tale" },
    { value: "goneGirl", label: "Gone Girl" },
    { value: "theGirlWithTheDragonTattoo", label: "The Girl with the Dragon Tattoo" },
    { value: "theDaVinciCode", label: "The Da Vinci Code" },
    { value: "theShining", label: "The Shining" },
    { value: "it", label: "It" },
    { value: "theStand", label: "The Stand" },
    { value: "theHungerGames", label: "The Hunger Games" },
    { value: "divergent", label: "Divergent" },
    { value: "theMazeRunner", label: "The Maze Runner" },
  ];
  
  

export const Search = () => {
  const [pickerItems, setPickerItems] = React.useState(books);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleCreateItem = (item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  return (
    <ChakraProvider>
      <Box px={8} py={4}>
        <CUIAutoComplete
          label="Find a Book"
          placeholder="Type a Book Title"
          onCreateItem={handleCreateItem}
          items={pickerItems}
          tagStyleProps={{
            rounded: "full",
            pt: 1,
            pb: 2,
            px: 2,
            fontSize: "1rem"
          }}
          selectedItems={selectedItems}
          onSelectedItemsChange={(changes) =>
            handleSelectedItemsChange(changes.selectedItems)
          }
        />
      </Box>
    </ChakraProvider>
  );
}

// import React from 'react';
// import css from '../css/search.css';
// import { Input, InputLeftAddon, InputGroup, layout} from '@chakra-ui/react'
// import { Box} from '@chakra-ui/react'
// import { BookList } from '../components';
//
// export const Search = () => {
//     const [value, setValue] = React.useState('');
//     const onChange = (event) => {
//         setValue(event.target.value);
//     }
//     const onSearch = (searchTerm) => {
//         setValue(searchTerm);
//         //API fetching here for search results
//         console.log('seaerch',searchTerm);
//     }

//     return (
//         <>
//             {/* <InputGroup>
//                 <InputLeftAddon children='Title' />
//                 <Input class='searchBar' variant='filled' placeholder='Book Search'/>
//             </InputGroup> */}
            
//             <header>search</header>
//             <div class='search-container'>
//                 <div class='search-inner'>
//                     <input type='text' value={value} onChange={onChange} />
//                     <button onClick={()=> onSearch(value)}>Search</button>
//                 </div> 
//                 <div className='dropdown'>
//                     {/* <div className='dropdown-content'> */}
//                         {data.filter(item=>{
//                             const search_term = value.toLowerCase();
//                             const full_name = item.label.toLowerCase();

//                             return search_term && full_name.startsWith(search_term) && item.label !== search_term;
                            
//                         }).slice(0,10)
//                         .map((item) => (
//                             <div onClick = {()=>onSearch(item.label)} className='dropdown-row'
//                             key={item.value}
//                             >{item.full_name}</div>
//                             ))}
//                 </div>
//             </div>
//         </>
//     );
// }