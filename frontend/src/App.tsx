import "./App.css";
import Products from "./components/Products/Products";
import URLsSelector from "./components/URLsSelector/URLsSelector";

function App() {
  return (
    <div className="w-screen h-screen bg-blue-100">
      <URLsSelector />
      <Products />
    </div>
  );
}

export default App;
