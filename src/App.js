import { Provider } from "react-redux";
import { createStore } from "redux";
import userReducer from "./components/UserReducer";
import "./App.css";
import LoginPage from "./components/LoginPage";

const store = createStore(userReducer);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <LoginPage />
      </div>
    </Provider>
  );
}

export default App;
