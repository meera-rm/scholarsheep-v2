import React from "react"
import BookLoader from "../../../Components/loader/BookLoader"

const Loading=()=> {
  return <div className="font-bold text-3xl"><BookLoader/></div>
}

export default  Loading;


// const singleUser = `https://api.github.com/users/meera-ramesh19`
// const repos = `https://api.github.com/users/meera-ramesh19/repos?per_page=5`
// https://api.github.com/users/meera-ramesh19/repos?page=1&per_page=10&sort=updated