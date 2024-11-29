import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./utils/theme";
import store from "./store";

const App: React.FC = () => (
  <ChakraProvider theme={customTheme}>
    <Provider store={store}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Provider>
  </ChakraProvider>
);

export default App;
