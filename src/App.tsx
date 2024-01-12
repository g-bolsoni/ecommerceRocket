import "./styles/global.css";

import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApplicationRoutes from './routes';
import Header from './components/Header';
import { CartProvider } from './hooks/useCart';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/queryClient";

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter> 
        <CartProvider>
          <main className="container mx-auto">
            <Header />
            <ApplicationRoutes />
          </main>
          <ToastContainer autoClose={3000} />
        </CartProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
