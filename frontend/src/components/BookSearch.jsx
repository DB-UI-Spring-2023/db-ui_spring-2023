import { useState } from "react";
import axios from "axios";
import Autosuggest from "react-autosuggest";

export const BookSearch = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get("/books/search", {
        params: { q: query },
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value }) => {
        fetchSuggestions(value);
      }}
      onSuggestionsClearRequested={() => {
        setSuggestions([]);
      }}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={(suggestion) => <div>{suggestion}</div>}
      inputProps={{
        placeholder: "Search for a book...",
        value,
        onChange: (_, { newValue }) => setValue(newValue),
      }}
    />
  );
};
