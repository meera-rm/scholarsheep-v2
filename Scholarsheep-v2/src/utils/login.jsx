// // https://dev.to/annaqharder/hideshow-password-in-react-513a
// import {Icon} from 'react-icons-kit';
// import {eyeOff} from 'react-icons-kit/feather/eyeOff';
// import {eye} from 'react-icons-kit/feather/eye'

// const [password, setPassword] = useState("");
// const [type, setType] = useState('password');
// const [icon, setIcon] = useState(eyeOff);

// const handleToggle = () => {
//     if (type==='password'){
//        setIcon(eye);
//        setType('text')
//     } else {
//        setIcon(eyeOff)
//        setType('password')
//     }
//  }

//  return (
//     <div>
//        <div>
//           <div class="mb-4 flex">
//              <input
//                  type={type}
//                  name="password"
//                  placeholder="Password"
//                  value={password}
//                  onChange={(e) => setPassword(e.target.value)}
//                  autoComplete="current-password"
//             />
//             <span class="flex justify-around items-center" onClick={handleToggle}>
//                  <Icon class="absolute mr-10" icon={icon} size={25}/>
//              </span>
//            </div>
//         </div>
//      </div>
// );