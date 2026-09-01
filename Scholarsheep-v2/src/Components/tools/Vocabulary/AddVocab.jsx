import { React, useState, useEffect } from 'react';
import { Add, Remove } from '@mui/icons-material';
import './AddVocab.scss';
import AddVocabForm from './AddVocabForm';
import DisplayCardList from './DisplayCardList';
import { toast } from 'react-toastify';
import api from '../../../utils/axiosInstance';

const AddVocab = () => {
  const [showCards, setShowCards] = useState(false);
  const [personalDict, setPersonalDict] = useState([]);

  const fetchAllWords = async () => {
    try {
      const response = await api.get('/api/dictionary/');
      setPersonalDict(response.data.payload || []);
    } catch (error) {
      console.log('Error fetching dictionary:', error);
    }
  };

  useEffect(() => {
    fetchAllWords();
  }, []);

  const toggleCards = () => {
    setShowCards(!showCards);
  };

  const checkPersonalDictionary = async (inputWord, selectedGrade) => {
    if (!inputWord || !inputWord.trim()) {
      toast.error('Please enter a word');
      return;
    }

    try {
      // 1. Fetch word meaning via backend proxy (avoids CORS on the free dictionary API)
      const dictResponse = await api.get(
        `/api/dictionary/lookup/${inputWord.trim()}`
      );
      const data = dictResponse.data;

      if (!data || data.length === 0) {
        toast.error('Word not found in dictionary');
        return;
      }

      // 2. Extract parts from the API response
      const definitionArr = [];
      const exampleArr = [];
      const synonymArr = [];
      const antonymArr = [];
      const speechArr = [];

      data.forEach((item) => {
        item.meanings.forEach((meaning) => {
          speechArr.push(meaning.partOfSpeech);
          meaning.definitions.forEach((def) => {
            definitionArr.push(def.definition);
            if (def.example) exampleArr.push(def.example);
          });
          meaning.synonyms.forEach((syn) => synonymArr.push(syn));
          meaning.antonyms.forEach((ant) => antonymArr.push(ant));
        });
      });

      const phonetic = data[0]?.phonetic || data[0]?.phonetics?.[0]?.text || '';

      // 3. Save to our backend database
      const userWord = {
        word: inputWord.trim(),
        grade: selectedGrade || '',
        partsofSpeech: speechArr[0] || '',
        phonetic: phonetic,
        definitions: definitionArr.slice(0, 5).join('; '),
        example: exampleArr.slice(0, 3).join('; '),
        synonyms: synonymArr.slice(0, 5),
        antonyms: antonymArr.slice(0, 5),
        users_id: 1,
      };

      await api.post('/api/dictionary', userWord);
      toast.success(`"${inputWord}" added to your vocabulary!`);

      // 4. Refresh the word list so the new word shows immediately
      await fetchAllWords();

    } catch (error) {
      if (error.response?.status === 404 || error.message?.includes('404')) {
        toast.error(`"${inputWord}" not found in dictionary. Check spelling.`);
      } else {
        console.error('Error:', error);
        toast.error('Failed to add word');
      }
    }
  };

  return (
    <div>
      <div className='addVocab'>
        <h1 className='addVocab__title'>Add Words</h1>
        <div className='addVocab__toggleCards'>
          {!showCards && <Add onClick={toggleCards} fontSize='inherit' />}
          {showCards && <Remove onClick={toggleCards} fontSize='inherit' />}
        </div>
      </div>

      <div
        className='addVocab__container'
        style={{ display: showCards ? 'block' : 'none' }}
      >
        <AddVocabForm
          showCards={showCards}
          setShowCards={setShowCards}
          customClickHandler={checkPersonalDictionary}
        />
      </div>

      <DisplayCardList personalDict={personalDict} />
    </div>
  );
};
export default AddVocab;
