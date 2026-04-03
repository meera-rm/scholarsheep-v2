import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar=({searchWord,setSearchWord})=>{
  const [data, setData] = useState("");
  const [value, setValue] = useState("");
   

   const handleInputChange = e =>setValue(e.target.value)

   const handleSubmit = () => {
    setSearchWord(value);
     setValue("");
   }
 
   const handleInputKeyDown = (e) => {
     if(e.key === 'Enter') {
     setSearchWord(value);
       setValue("")
     }
   }
    return(
        <div>
             <div className="flex items-center justify-center mt-5">
          <div className="flex border-2 border-gray-200 rounded">
            <input className="px-4 py-2 md:w-80" type="text" placeholder="Search..." onChange={handleInputChange} onKeyDown={handleInputKeyDown} />
            <button className="bg-blue-400 border-l px-4 py-2 text-white" onClick={handleSubmit}>
              <FaSearch size="20px" /></button>
          </div>
        </div>
        </div>
    )
}

export default SearchBar;
