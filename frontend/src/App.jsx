import { Route } from "react-router-dom";

function App() {
  return (
   <div>
    <Route>
      <Route path="/" element={<HomePage />} />
    </Route>
   </div>
  );
}

export default App;
