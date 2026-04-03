import Antonym from './Antonym';
import Example from './Example';
import Meanings from './Meanings';
import Synonym from './Synonym';
const DisplayWordDetails = ({ data }) => {
    return (

<div>


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
</div>
    )
}
export default  DisplayWordDetails;