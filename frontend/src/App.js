import LoginFormPage from "./components/LoginFormPage";
import { Route } from "react-router-dom/cjs/react-router-dom";

function App() {
  return (
    <>
    <h1>Hello from App</h1>
    <Route path="/login">
    <LoginFormPage />
    </Route>
    </>
  );
}

export default App;
