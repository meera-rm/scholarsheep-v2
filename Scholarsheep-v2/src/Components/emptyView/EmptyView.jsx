import './EmptyView.scss';
import React from 'react';

const styles = {
  bold: {
    margin: '35%',
    'font-size ': '2.4em',
    'font-weight': '600',
  },
};
const EmptyView = ({ message = 'No Results', bold }) => {
  // const EmptyView= ({message ='No Results',styleKey}) => {
  return (
    // <div className={bold?'emptyview emptyview-bold':'emptyview '}>{message}

    // </div>
    //or
    <div className='text-center mt-10 mb-10' style={bold && styles.bold}>
      {message}
    </div>
    //<div className='emptyview' style={styles[styleKey]}>{message}</div>
  );
};

export default EmptyView;
