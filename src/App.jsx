import Header from './Componants/allpages/Header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Componants/allpages/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './Componants/Homepage/HomePage';
import LogIn from './Componants/Login/logIn';
import Laptops from './Componants/allpages/Laptops';
import Support from './Componants/Support/Support'
import LandingPage from './Componants/LandingPage/LandingPage';
import { useScrollToTop } from './useScrollTop';
import Cart from './Componants/allpages/Cart';
import { DataProvider } from './Componants/dataContext';
import DashBoard from './Componants/DashBoard/Dashboard';


function App() {
  const location = useLocation();
  const showHeaderAndFooter = !location.pathname.startsWith('/Dashboard');

  useScrollToTop()
  return (
    <DataProvider>
      <div className='App-Container d-flex flex-column'>
        {showHeaderAndFooter && <Header />}
        <Routes>
            <Route path="cart" element={<Cart />} />
            <Route path="LandingPage" element={<LandingPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="login" element={<LogIn />} />
            <Route path="laptops" element={<Laptops filter="True" />} />
            <Route path="Phones" element={<Laptops filter="True" />} />
            <Route path="Accessories" element={<Laptops filter="True" />} />
            <Route path="Deals" element={<Laptops filter="false" />} />
            <Route path="Support" element={<Support />} />
            <Route path="Dashboard/*" element={<DashBoard/>}></Route>
          </Routes>
        {showHeaderAndFooter && <Footer />}
      </div>
    </DataProvider>
  );
}

export default App;
