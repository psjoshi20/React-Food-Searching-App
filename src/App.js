import React,{useState} from"react";
import './App.css';
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Recipe from "./components/Recipe.js";
import Alert from "./components/Alert";

function App () {
  const[query,setQuery] =useState(" ");
  const[recipes,setRecipes]=useState([]);
  const[alert,setAlert] =useState("");

  const APP_ID="38632690"; 
  const APP_KEY="cebf365f61cb064950460ccfc8399e82";
 
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
   
  const getData =async ()=>{
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert("No food with such name");
      }
      console.log(result);
      setRecipes(result.data.hits);
      setQuery("");
      setAlert("");
    } else {
      setAlert("Please fill the form");
    }
  };

  const onChange=(e)=>{
  setQuery(e.target.value);
    // getData();
      };
      
  const onSubmit =(e)=>{
    e.preventDefault();
    getData();
  }

    return (
        <div className="App">
          <h1 onClick={getData}>Food Searching App</h1>
          <form className="search-form" onSubmit={onSubmit}>
              <input type="text" 
              placeholder="search Food" 
              autoComplete="off"
              onChange={onChange}
              value={query}
              />
              <input type="submit" value ="search"/>
          </form>
          <div className="recipes">
              {recipes !== [] && 
              recipes.map(recipe => 
              <Recipe recipe={recipe}/>
              )};
          </div>
        </div>
     );
  }
     
export default App;