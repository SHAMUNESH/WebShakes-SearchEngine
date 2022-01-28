import React,{ createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    //videos, //search, //images.
    const getResults = async (type) => {
        setLoading(true);
    
        const response = await fetch(`${baseUrl}${type}`, {
          method: 'GET',
          
          headers: {
            'x-user-agent': 'desktop',
            'x-proxy-location': 'EU',
            'x-rapidapi-host': 'google-search3.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_API_KEY
          },
        });

        const data = await response.json();
        // if(type.includes('/news')){
        //   setResults(data.entries);
        //   console.log(data.entries);
        // }else if(type.includes('/images')){
        //   setResults(data.image_results);
        // }else {
        //   setResults(data.results);
        // }
        setResults(data);
        setLoading(false);
    };
    return (
        <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, loading,setLoading }}>
          {children}
        </ResultContext.Provider>
      );
}

export const useResultContext = () => useContext(ResultContext);