// src/App.js
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { store } from "./store";
import { Provider } from "react-redux";

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </Provider>
);

export default App;
