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
import { useEffect, useState } from 'react';
import MainNavbar from './Componants/allpages/MainNavbar';


function App() {
  const location = useLocation();
  const showHeaderAndFooter = !location.pathname.startsWith('/Front_End_PFA/Dashboard');

  const [open, setOpen] = useState(false)
  useEffect(() => {
    const threshold = 1250;
    let previousWidth = window.innerWidth;

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      // Opening condition: if previous width was > 900 and now it's <= 900
      if (previousWidth > threshold && currentWidth <= threshold) {
        setOpen(true);
      }
      // Closing condition: if previous width was <= 900 and now it's > 900
      else if (previousWidth <= threshold && currentWidth > threshold) {
        setOpen(false);
      }
      // Update previousWidth for the next event
      previousWidth = currentWidth;
    };

    // Initial check to set the correct state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useScrollToTop()
  return (
    <DataProvider>
      <div className='App-Container d-flex flex-column'>
        {showHeaderAndFooter && (
              <div className='header-container' style={{width : window.innerWidth > 900 || open ? '100%' : '0%'}}>
              {(open && <div className='hamberger-container'  onClick={()=>{setOpen(!open)}}>
                <div className='hamberger first'></div>
                <div className='hamberger second'></div>
                <div className='hamberger third'></div>
              </div>)}
              {(!open && <MainNavbar setOpen={setOpen} />)}
            </div>
        )}
        <Routes>
            <Route path="/Front_End_PFA/cart" element={<Cart />} />
            <Route path="/Front_End_PFA/LandingPage" element={<LandingPage />} />
            <Route path="/Front_End_PFA/" element={<HomePage />} />
            <Route path="/Front_End_PFA/home" element={<HomePage />} />
            <Route path="/Front_End_PFA/Login" element={<LogIn />} />
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
