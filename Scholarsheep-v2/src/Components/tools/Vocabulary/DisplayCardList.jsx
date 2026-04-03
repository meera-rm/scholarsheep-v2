import { React, useState } from 'react';
import './DisplayCardList.scss';

// Helper: ensure value is always an array for safe .map()
const toArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') return [val];
  return [];
};

const DisplayCardList = ({ personalDict }) => {
  const [showMoreId, setShowMoreId] = useState(null);

  const handleReadMoreClick = (id) => {
    setShowMoreId(showMoreId === id ? null : id);
  };

  return (
    <div className="displayCards">
      {personalDict.map((card) => {
        const isOpen = showMoreId === card.dictionary_id;
        const definitions = toArray(card.definitions);
        const examples = toArray(card.example);
        const synonyms = toArray(card.synonyms);
        const antonyms = toArray(card.antonyms);

        return (
          <div className="displayCard" key={card.dictionary_id}>
            <div className="displayCard-body">
              <div className="displayCard-front">
                <h2>{card.word.toUpperCase()}</h2>
                <h2>PARTS OF SPEECH:</h2>
                <p>{card.partsofspeech}</p>
                {card.phonetic && (
                  <p style={{ fontSize: '0.9em', color: '#666', marginTop: '4px' }}>
                    {card.phonetic}
                  </p>
                )}
              </div>
              <div className="displayCard-back">
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
                            <hr />
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
                            <hr />
                          </div>
                        ))}
                      </>
                    )}

                    {synonyms.length > 0 && (
                      <>
                        <h3 className='text-2xl font-bold mt-4'>Synonyms:</h3>
                        {synonyms.map((syn) => (
                          <div key={syn}>
                            <p>{syn}</p>
                          </div>
                        ))}
                      </>
                    )}

                    {antonyms.length > 0 && (
                      <>
                        <h3 className='text-2xl font-bold mt-4'>Antonyms:</h3>
                        {antonyms.map((ant) => (
                          <div key={ant}>
                            <p>{ant}</p>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )}
                <div className="read-more" onClick={() => handleReadMoreClick(card.dictionary_id)}>
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
export default DisplayCardList;
