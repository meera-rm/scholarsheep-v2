import { React, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import words from './../db/words.json';
import DisplayCardList from '../DisplayCardList';
import PersonalDictionary from './PersonalDictionary';
import httpService from '../../../httpService';
import './AddVocabForm.scss';

import { Link } from 'react-router-dom';

const grades = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const API = process.env.REACT_APP_API_URL;

const VocabForm = ({ showCards, setShowCards }) => {
  // console.log('in addvocabfprn', words);

  const navigate = useNavigate();

  const [inputWord, setInputWord] = useState('');
  const [grade, setGrade] = useState('');
  const [words, setWords] = useState('');
  const [meaning, setMeaning] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('');
  const [definitions, setDefinitions] = useState([]);
  const [examples, setExamples] = useState([]);
  const [synonyms, setSynonyms] = useState([]);
  const [antonyms, setAntonyms] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState('');

  //check if the word exists in the personal dictionary
  const checkPersonalDictionary = async () => {
    try {
      const response = await httpService.get(`${API}/api/dictionary/`);
      setWords(response.payload);
      const data = response.payload;

      if (data) {
        setPartOfSpeech(data.partOfSpeech);
        setDefinitions(data.definitions);
        setExamples(data.examples);
        setSynonyms(data.synonyms);
        setAntonyms(data.antonyms);
      } else {
        fetchWordMeaning();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkUser = async () => {
    const user = await httpService.get(`${API}/api/users/:email`);
    setUserId(user);
  };

  useEffect(() => {
    // checkUser()
    // if(userId){ setUserId(userId.id); }
    // Check if the word is in personal_dictionary table
    <PersonalDictionary />;
  }, []);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'word') {
      setInputWord(value);
    } else if (name === 'grade') {
      setGrade(value);
    } else {
      setUserId(value);
    }
  };

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

  const saveToPersonalDictionary = () => {
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

    httpService
      .post('/api/dictionary', newWord)
      .then((response) => {
        // Handle success response
        console.log('Data saved to personal_dictionary:');
        notify();
      })
      .catch((error) => {
        // Handle error
        console.error('Error saving data to personal_dictionary:', error);
      });
  };

  //fetch the word from dictionary api
  const fetchWordMeaning = async () => {
    try {
      const response = await httpService.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`
      );
      const data = response.data[0];

      if (data) {
        setMeaning(data.meanings[0].definitions[0].definition);
        setPartOfSpeech(data.meanings[0].partOfSpeech);
        setDefinitions(
          data.meanings[0].definitions.map((def) => def.definition)
        );
        setExamples(data.meanings[0].definitions.map((def) => def.example));
        setSynonyms(data.meanings[0].definitions.map((def) => def.synonyms));
        setAntonyms(data.meanings[0].definitions.map((def) => def.antonyms));

        // Save the data to personal_dictionary table
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

  return (
    <>
      <div>
        <div className='flex flex-col mt-10 mb-4 md:w-full'>
          <label
            className='mb-2 uppercase font-normal text-lg  text-left'
            htmlFor='newWord'
          >
            Word:
            <input
              className='border py-2 px-3 '
              id='newWord'
              type='text'
              name='word'
              value={inputWord}
              autoComplete='off'
              onChange={onInputChange}
              placeholder='Add a word ...'
              required
            />
          </label>
        </div>

        <div className='flex flex-col mb-4 md:w-full'>
          <label
            className='mb-2 uppercase text-left font-normal text-lg '
            htmlFor='grade'
          >
            Grade:
            <select
              className='selectGrade'
              size='1'
              type='text'
              name='grade'
              id='grade'
              value={grade}
              onChange={onInputChange}
              required
            >
              <option key='none' value='none'>
                --Select child's grade--
              </option>
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className='flex justify-center ml-10 space-x-10'>
          <button
            className=' my-12 px-5 py-3 rounded bg-teal-500'
            onClick={checkPersonalDictionary}
          >
            Search
          </button>

          <Link to={`/vocabulary`}>
            <button
              className='mr-10 px-5  py-3 rounded my-12 bg-teal-500 '
              style={{ display: showCards ? 'block' : 'none' }}
            >
              Cancel{' '}
            </button>
          </Link>
        </div>

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

        {/* {words && words.length > 0 && <DisplayCardList words={words} />} */}
      </div>
    </>
  );
};
export default VocabForm;

// const WordMeaning = () => {
//   const [inputWord, setInputWord] = useState('');
//   const [meaning, setMeaning] = useState('');
//   const [grade, setGrade] = useState('');
//   const [partOfSpeech, setPartOfSpeech] = useState('');
//   const [definitions, setDefinitions] = useState([]);
//   const [examples, setExamples] = useState([]);
//   const [synonyms, setSynonyms] = useState([]);
//   const [antonyms, setAntonyms] = useState([]);

//   useEffect(() => {
//     if (inputWord) {
//       // Check if the word is in personal_dictionary table
//       checkPersonalDictionary();
//     }
//   }, [inputWord]);

//   const checkPersonalDictionary = async () => {
//     try {
//       const response = await axios.get(`/api/personal_dictionary/${inputWord}`);
//       const data = response.data;

//       if (data) {
//         // Word is found in personal_dictionary, use the data from the database
//         setMeaning(data.meaning);
//         setPartOfSpeech(data.partOfSpeech);
//         setDefinitions(data.definitions);
//         setExamples(data.examples);
//         setSynonyms(data.synonyms);
//         setAntonyms(data.antonyms);
//       } else {
//         // Word not found in personal_dictionary, fetch from external API
//         fetchWordMeaning();
//       }
//     } catch (error) {
//       console.error('Error checking personal dictionary:', error);
//     }
//   };

//   const fetchWordMeaning = async () => {
//     try {
//       const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`);
//       const data = response.data[0];

//       if (data) {
//         setMeaning(data.meanings[0].definitions[0].definition);
//         setPartOfSpeech(data.meanings[0].partOfSpeech);
//         setDefinitions(data.meanings[0].definitions.map(def => def.definition));
//         setExamples(data.meanings[0].definitions.map(def => def.example));
//         setSynonyms(data.meanings[0].definitions.map(def => def.synonyms));
//         setAntonyms(data.meanings[0].definitions.map(def => def.antonyms));

//         // Save the data to personal_dictionary table
//         saveToPersonalDictionary(data);
//       } else {
//         // Handle the case where the word is not found
//         setMeaning('Word not found.');
//         setPartOfSpeech('');
//         setDefinitions([]);
//         setExamples([]);
//         setSynonyms([]);
//         setAntonyms([]);
//       }
//     } catch (error) {
//       console.error('Error fetching word meaning:', error);
//     }
//   };

//   const saveToPersonalDictionary = async (data) => {
//     // Assuming you have set up a server with an API endpoint to save data to personal_dictionary
//     const dataToSave = {
//       word: inputWord,
//       meaning: data.meanings[0].definitions[0].definition,
//       partOfSpeech: data.meanings[0].partOfSpeech,
//       definitions: data.meanings[0].definitions.map(def => def.definition),
//       examples: data.meanings[0].definitions.map(def => def.example),
//       synonyms: data.meanings[0].definitions.map(def => def.synonyms),
//       antonyms: data.meanings[0].definitions.map(def => def.antonyms),
//     };

//     axios.post('/api/personal_dictionary', dataToSave)
//       .then((response) => {
//         // Handle success response
//         console.log('Data saved to personal_dictionary:', response.data);
//       })
//       .catch((error) => {
//         // Handle error
//         console.error('Error saving data to personal_dictionary:', error);
//       });
//   };

//   const handleGradeChange = (event) => {
//     setGrade(event.target.value);
//   };

//   return (
//     <div>
//       <h1>Word Meaning</h1>
//       <input
//         type="text"
//         placeholder="Enter a word"
//         value={inputWord}
//         onChange={(e) => setInputWord(e.target.value)}
//       />
//       <button onClick={checkPersonalDictionary}>Get Meaning</button>
//       <p>Meaning: {meaning}</p>
//       <p>Part of Speech: {partOfSpeech}</p>
//       <ul>
//         {definitions.map((definition, index) => (
//           <li key={index}>{definition}</li>
//         ))}
//       </ul>
//       <button onClick={handleSaveToPersonalDictionary}>Save to Personal Dictionary</button>
//       <input
//         type="text"
//         placeholder="Enter a grade"
//         value={grade}
//         onChange={handleGradeChange}
//       />
//     </div>
//   );
// };

// export default WordMeaning;

// toast.success('🦄 Wow so easy!', {
//   position: "top-right",
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
//   theme: "light",
//   });

// add npm package quick-erd

// const handleSearch = async() => {

//   setErrorMessage('');
//   const response = await axios.get('/db/words.json');
//   const wordsData = response.data;
//   setMeaning(wordsData);
//   console.log(wordsData)

//   if (wordsData[inputWord]) {
//     try {
//       // Replace 'YOUR_DICTIONARY_API_KEY' with your actual DictionaryAPI API key

//       const APIURL= `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`;

//       const  {apiResponse} =
//       await axios.get(`${APIURL}`);
//       const wordData = apiResponse.data[0];
//       console.log(wordData)
//       setMeaning(wordData)

//       const wordMeaning = wordData.meanings.map((meaning) => meaning.definitions[0]?.definition || []);
//       const partOfSpeechValues = wordData.meanings.map((meaning) => meaning.partOfSpeech);
//       const exampleValues = wordData.meanings.map((meaning) =>
//       meaning.definitions[0]?.examples || [] );
//       const antonymValues = wordData.meanings.flatMap((meaning) => meaning.definitions[0]?.antonyms || []);
//       setMeaning(wordMeaning);
//       const synonymValues = wordData.meanings.flatMap((meaning) =>
//       meaning.definitions[0]?.synonyms || []
//     );

//       const updatedWordData = {
//         grade: grade,
//         partOfSpeech :partOfSpeechValues,
//         meaning:wordMeaning,
//         example:exampleValues,
//         synonym:synonymValues,
//         antonym:antonymValues,
//         id:Object.keys(words).length,
//       };
//       setMeaning(updatedWordData)

//       await axios.post('/update-word', { word: inputWord, data: updatedWordData });
//       console.log('updated=',words)
//       toast.success('added word')
//     } catch (error) {

//       setErrorMessage('Error fetching word meaning.');
//     }
//   } else {
//     setMeaning('Word not found in the JSON file.');
//   }}
