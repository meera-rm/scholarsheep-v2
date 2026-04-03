import axios from 'axios';
//wrapper using axios
class HttpService {
  async get(url) {
    const { data } = await axios.get(url);
    return data;
  }

  async post(url, body) {
    const { data } = await axios.post(url, body);
    return data;
  }

  async put(url, body) {
    const { data } = await axios.put(url, body);
    return data;
  }

  async delete(url) {
    const { data } = await axios.put(url);
    return data;
  }
}

export default new HttpService();



















//  wrapper using fetch method

// class HttpService{
//     async get(url){
//         const  response  = await fetch(url)
//         const data = await response.json()
//         return data
//     }

//     async post(url,body){
//         const  response  = await fetch(url,{
//             method:"POST",
//             body:JSON.stringify(body),
//             headers:{
//          "Content-Type": "application/json"
//             }
//          })
//         const data = await response.json()
//         return data
//     }

//     async put(url,body){
//         const  response  = await fetch(url,{
//             method:"POST",
//             body:JSON.stringify(body),
//             headers:{
//          "Content-Type": "application/json"
//             }
//          })
//         const data = await response.json()
//         return data
//     }

//     async delete(url){
//         const  response  = await fetch(url)
//         const data = await response.json()
//         return data
//     }
// }

// export default new HttpService();
