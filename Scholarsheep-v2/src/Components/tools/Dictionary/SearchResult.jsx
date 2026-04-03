import axios from 'axios';
import { useEffect, useState } from 'react';
import { FcSpeaker } from 'react-icons/fc';
import Antonym from './Antonym';
import Example from './Example';
import Meanings from './Meanings';
import Synonym from './Synonym';
import httpService from '../../httpService';

const SearchResult = ({ searchWord, setSearchWord }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = async (word) => {
    try {
      setLoading(true);
      //const res= httpService.get(
        const res = await httpService.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
     
      console.log(res);
      setData(res);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchWord.length) {
      fetchData(searchWord);
    }
  }, [searchWord]);

  if (loading) {
    return (
      <div className='flex flex-col space-y-3 animate-pulse p-4 container mx-auto max-w-2xl'>
        <div className='h-6 bg-gray-300 mt-5 rounded-md'></div>
        <div className='h-40 bg-gray-300 mt-5 rounded-md'></div>
        <div className='h-8 bg-gray-300 mt-5 rounded-md'></div>
        <div className='h-40 bg-gray-300 mt-5 rounded-md'></div>
      </div>
    );
  }

  if (error) {
    return (
      <h3 className='text-center mt-10 font-semibold text-gray-500'>
        No Definitions Found 😥
      </h3>
    );
  }

  const playAudio = () => {
    console.log(data[0].phonetic)
    const audio = new Audio(data[0].phonetics[0].audio);
    audio.play();
  };

  return (
    <div className='mx-auto p-4 max-w-2xl'>
      {data && (
        <div>
          <h3>
            {' '}
            <span>Word:{'  '}</span>
            {data[0].word} <span>Phonetic:{'  '}</span>({data[0].phonetic})
            <span
              onClick={() => {
                playAudio();
              }}
              className='cursor-pointer'
            >
              {' '}
              🕪{' '}
            </span>
          </h3>
          <h3 className='text-2xl font-bold mt-4'>Parts Of Speech:</h3>
          <p>{data[0].meanings[0].partOfSpeech}</p>
          <h3 className='text-2xl font-bold mt-4'>
                Meaning & Definitions:
              </h3>
              <Meanings mean={data} />
              <h3 className='text-2xl font-bold mt-4'>Example:</h3>
              <Example mean={data} />
              <h3 className='text-2xl font-bold mt-4'>Synonym:</h3>
              <Synonym mean={data} />
              <h3 className='text-2xl font-bold mt-4'>Antonym:</h3>
              <Antonym mean={data} />

          {/* {origin==='dictionary' && (
            <DisplayWordDetails data={data}/>
          )}
          {origin==='flashCards' && (
            <div>
               set
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
