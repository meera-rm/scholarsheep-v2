import { React, useState } from 'react';
import './FlashCardList.scss';

// Helper: ensure value is always an array for safe .map()
const toArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') return [val];
  return [];
};

const FlashCardList = ({ wordData, selectedGrade }) => {
  const [showMoreId, setShowMoreId] = useState(null);

  const handleReadMoreClick = (id) => {
    setShowMoreId(showMoreId === id ? null : id);
  };

  const filteredData =
    selectedGrade === 'AllGrades'
      ? wordData
      : wordData.filter((word) => word.grade === selectedGrade);

  return (
    <div className='listCards'>
      {filteredData.length === 0 && (
        <div className='listCards-message'>
          You have no cards for this grade
        </div>
      )}
      {filteredData.map((card) => {
        const isOpen = showMoreId === card.dictionary_id;
        const definitions = toArray(card.definitions);
        const examples = toArray(card.example);
        const synonyms = toArray(card.synonyms);
        const antonyms = toArray(card.antonyms);

        return (
          <div className='listCard' key={card.dictionary_id}>
            <div className='listCard-body'>
              <div className='listCard-front'>
                <h2>{card.word.toUpperCase()}</h2>
                <h2>PARTS OF SPEECH:</h2>
                <p>{card.partsofspeech}</p>
                {card.phonetic && (
                  <p style={{ fontSize: '0.9em', color: '#666', marginTop: '4px' }}>
                    {card.phonetic}
                  </p>
                )}
              </div>
              <div className='listCard-back'>
                {isOpen && (
                  <div>
                    <h3>
                      <span>Word: </span>
                      {card.word}
                    </h3>

                    {definitions.length > 0 && (
                      <>
                        <h3 className='text-2xl font-bold mt-4'>
                          Meaning & Definitions:
                        </h3>
                        {definitions.map((definition) => (
                          <div key={definition}>
                            <p>{definition}</p>
                          </div>
                        ))}
                      </>
                    )}

                    {examples.length > 0 && (
                      <>
                        <h3 className='text-2xl font-bold mt-4'>Example:</h3>
                        {examples.map((ex) => (
                          <div key={ex}>
                            <p>{ex}</p>
                          </div>
                        ))}
                      </>
                    )}

                    {synonyms.length > 0 && (
                      <>
                        <h3 className='text-2xl font-bold mt-4'>Synonyms:</h3>
                        <p>{synonyms.join(', ')}</p>
                      </>
                    )}

                    {antonyms.length > 0 && (
                      <>
                        <h3 className='text-2xl font-bold mt-4'>Antonyms:</h3>
                        <p>{antonyms.join(', ')}</p>
                      </>
                    )}
                  </div>
                )}
                <div className='read-more' onClick={() => handleReadMoreClick(card.dictionary_id)}>
                  {isOpen ? 'Show Less' : 'Read more...'}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default FlashCardList;
