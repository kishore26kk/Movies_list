import React from 'react'
import ReactDOM from 'react-dom/client'
// import StarRating from './StarRating'
import App from './App.jsx'
import './index.css'

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRating color="blue" onRateMovie={setMovieRating} />
//       <p>This movie was rated {movieRating} stars.</p>
//     </div>
//   )
// }
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={5} messages={["Terrible", "Not bad", "Satisfied", "Good", "Superb"]} defaultRating />
    <Test /> */}
  </React.StrictMode>,
)
