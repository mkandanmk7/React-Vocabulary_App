import "./App.css";
import SearchBar from "./components/Search/SearchBar";
import Words from "./components/Words/Words";

function App() {
  return (
    <div className="container">
      <h2>Home page</h2>
      <SearchBar />

      <Words />
    </div>
  );
}

export default App;
