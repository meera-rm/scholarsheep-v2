
import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateAvatar } from "../../utils/GenerateAvatar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// import { useAuth } from "../../contexts/AuthContext";
const Profile = () => {
    const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
//   const { currentUser, updateUserProfile, setError } = useAuth();
const currentUser='' ;

  useEffect(() => {
    const fetchData = () => {
      const res = generateAvatar();
      setAvatars(res);
    };

    fetchData();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (selectedAvatar === undefined) {
      return setError("Please select an avatar");
    }

    try {
      setError("");
      setLoading(true);
    //   const user = currentUser;
      const profile = {
        displayName: username,
        photoURL: avatars[selectedAvatar],
      };
    //   await updateUserProfile(user, profile);
      navigate("/");
    } catch (e) {
      setError("Failed to update profile");
    }
    setLoading(false);
  };
    return (
    
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl text-center tracking-tight font-light dark:text-teal-800">
            Pick an avatar
          </h1>
        </div>
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div className="flex flex-wrap -m-2 md:-m-3">
            {avatars.map((avatar, index) => (
              <div key={index} className="flex flex-wrap w-1/4">
                <div className="w-full p-1 md:p-2">
                  <img
                    alt="gallery"
                    className={classNames(
                      index === selectedAvatar
                        ? "border-4 border-teal-700 dark:border-teal-700"
                        : "cursor-pointer hover:border-4 hover:border-teal-700",
                      "block object-cover object-center w-36 h-36 rounded-full border-2 border-teal-600"
                    )}
                    src={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-md shadow-sm -space-y-px mx-auto text-center ">
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className='bg-teal-600 relative px-3 py-2 focus:z-10 sm:text-sm rounded-lg focus:outline-none  placeholder-teal-50 text-center text-white m-autohover:bg-teal-600 focus:outline-none placeholder -fontSize-32 dark:bg-teal-600 dark:hover:bg-teal-600 '
            //   className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-teal-600 rounded-t-md bg-teal-600 border border-teal-600 text-teal-600 text-sm focus:outline-none focus:ring-teal-500 focus:border-teal-600 dark:bg-teal-700 dark:border-teal-600 dark:placeholder-teal-600 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500 focus:z-10 sm:text-sm"
              placeholder="Enter a Username"
              defaultValue={currentUser.displayName && currentUser.displayName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="rounded-md shadow-sm -space-y-px mx-auto text-center">
            <button
              type="submit"
              disabled={loading}
              className="w-half py-4 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-600 dark:bg-teal-600 dark:hover:bg-teal-600 dark:focus:ring-teal-600"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
    
    )
}
export default Profile;