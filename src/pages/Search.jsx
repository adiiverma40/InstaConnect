import React,{useState , useCallback} from "react";
import { Input } from "../Components";
import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { searchUser } from "../appwrite/appwrite";

function Search() {
  const selector = useSelector((state) => state.auth);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    if (query.length > 0) {
      console.log(query)
      const searchResults = await searchUser(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  };

  // Debounce the search function
  const debouncedSearch = useCallback(
    debounce((query) => handleSearch(query), 300),
    []
  );

  const onChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  // return (
  //   <div>
  //     <input
  //       type="text"
  //       value={query}
  //       onChange={onChange}
  //       placeholder="Search users..."
  //     />
  //     <ul>
  //       {results.map((user) => (
  //         <li key={user.$id}>{user.name} ({user.username})</li>
  //       ))}
  //     </ul>
  //   </div>
  // );
  return (
    <div
      className="w-full max-w-md border border-black rounded-t-lg rounded-b-lg bg-white shadow-lg"
      style={{ height: "100vh" }}
    >
      <div className="mx-4">
        <h2 className="font-medium text-xl p-4 hover:cursor-pointer">Search</h2>
        <Input 
        placeholder="Search" 
        aria-label="Search input"
        type={"text"}
        value={query}
        onChange={onChange}
        />
      </div>
      <hr />
      <div>
        <ul className="mt-3">
          {results.map((user) => (
               <li key={user.$id} className="hover:bg-gray-300 py-4 hover:cursor-pointer flex items-center px-4">
               <img
                 src={user.profileImage}
                 alt="Profile"
                 style={{
                   width: "40px",
                   height: "40px",
                   borderRadius: "50%",
                   objectFit: "cover",
                 }}
                 className="mx-2 transition-colors duration-300 hover:text-blue-500"
               />
               <span>
                 <p className="font-medium">
                   {user.username || "Unknown Username"}
                 </p>
                 <p className="font-light hover:font-medium transition-all duration-300 ease-in-out">
                   {user.name || "Unknown Name"}
                 </p>
               </span>
             </li>
          ))}
          
          
          
{/*           
          
          <li className="hover:bg-gray-300 py-4 hover:cursor-pointer flex items-center px-4">
            <img
              src={"https://placehold.co/400x400/000000/FFF"}
              alt="Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              className="mx-2 transition-colors duration-300 hover:text-blue-500"
            />
            <span>
              <p className="font-medium">
                {selector?.username || "Unknown Username"}
              </p>
              <p className="font-light hover:font-medium transition-all duration-300 ease-in-out">
                {selector?.name || "Unknown Name"}
              </p>
            </span>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

export default Search;
