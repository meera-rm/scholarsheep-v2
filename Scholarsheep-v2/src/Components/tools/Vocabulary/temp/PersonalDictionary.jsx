import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import httpService from '../../../httpService';

const API = process.env.REACT_APP_API_URL;

const PersonalDictionary = ({ inputWord, words, setWords }) => {
  const [grade, setGrade] = useState('');
  const [meaning, setMeaning] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('');
  const [definitions, setDefinitions] = useState([]);
  const [examples, setExamples] = useState([]);
  const [synonyms, setSynonyms] = useState([]);
  const [antonyms, setAntonyms] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [validationResult, setValidationResult] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchWordMeaning();
  }, []);

  const notify = () => {
    toast.success('🦄 , You added a new word to your dictionary', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    setTimeout(() => {
      navigate('/books');
    }, 2000);
  };

  const fetchWordMeaning = async () => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`
      );
      console.log(response.data);
      const data = response.data;

      if (data) {
        setMeaning(data.meanings[0].definitions[0].definition);
        setPartOfSpeech(data.meanings[0].partOfSpeech);
        setDefinitions(
          data.meanings[0].definitions.map((def) => def.definition)
        );
        setExamples(data.meanings[0].definitions.map((def) => def.example));
        setSynonyms(data.meanings[0].definitions.map((def) => def.synonyms));
        setAntonyms(data.meanings[0].definitions.map((def) => def.antonyms));

        // // Save the data to personal_dictionary table
        saveToPersonalDictionary(data);
      } else {
        // Handle the case where the word is not found
        setMeaning('Word not found.');
        setPartOfSpeech('');
        setDefinitions([]);
        setExamples([]);
        setSynonyms([]);
        setAntonyms([]);
      }
    } catch (error) {
      console.error('Error fetching word meaning:', error);
    }
  };

  const saveToPersonalDictionary = async () => {
    // Assuming you have set up a server with an API endpoint to save data to personal_dictionary
    const newWord = {
      word: inputWord,
      grade: grade,
      partsofSpeech: partOfSpeech,
      definitions: definitions,
      examples: examples,
      synonyms: synonyms,
      antonyms: antonyms,
      users_id: userId,
    };

    // const response= await httpService.post('/api/dictionary', newWord);
    try {
      const response = await httpService.post(
        '/api/dictionary/addWordIfNotExists',
        newWord
      );

      if (response.ok) {
        const data = await response.json();
        if (data.exists) {
          setValidationResult('The word exists in the dictionary.');
        } else {
          setValidationResult('The word does not exist in the dictionary.');
        }
      } else {
        setValidationResult('Error while checking the word.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    // .then((response) => {
    //   // Handle success response
    //   console.log('Data saved to personal_dictionary:');
    //   notify();
    // })
    // .catch((error) => {
    //   // Handle error
    //   console.error('Error saving data to personal_dictionary:', error);
    // });
  };

  return (
    <div>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
};
export default PersonalDictionary;
