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
  const showHeaderAndFooter = !location.pathname.startsWith('/Front_End_PFA/Dashboard');

  useScrollToTop()
  return (
    <DataProvider>
      <div className='App-Container d-flex flex-column'>
        {showHeaderAndFooter && <Header />}
        <Routes>
            <Route path="/Front_End_PFA/cart" element={<Cart />} />
            <Route path="/Front_End_PFA/LandingPage" element={<LandingPage />} />
            <Route path="/Front_End_PFA/" element={<HomePage />} />
            <Route path="/Front_End_PFA/login" element={<LogIn />} />
            <Route path="/Front_End_PFA/laptops" element={<Laptops filter="True" />} />
            <Route path="/Front_End_PFA/Phones" element={<Laptops filter="True" />} />
            <Route path="/Front_End_PFA/Accessories" element={<Laptops filter="True" />} />
            <Route path="/Front_End_PFA/Deals" element={<Laptops filter="false" />} />
            <Route path="/Front_End_PFA/Support" element={<Support />} />
            <Route path="/Front_End_PFA/Dashboard/*" element={<DashBoard/>}></Route>
          </Routes>
        {showHeaderAndFooter && <Footer />}
      </div>
    </DataProvider>
  );
}

export default App;
