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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CSSTransition } from 'react-transition-group';




function App() {
  const location = useLocation();
  const showHeaderAndFooter = !location.pathname.startsWith('/Front_End_PFA/Dashboard');

  const [open, setOpen] = useState(window.innerWidth > 1250);

  useEffect(() => {
    const threshold = 1250;
    let previousWidth = window.innerWidth;

    const handleResize = () => {
      const currentWidth = window.innerWidth;
      if (previousWidth > threshold && currentWidth <= threshold) {
        setOpen(false);
      } else if (previousWidth <= threshold && currentWidth > threshold) {
        setOpen(true);
      }
      previousWidth = currentWidth;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useScrollToTop()


  return (
    <DataProvider>
      <div className='App-Container d-flex flex-column'>
        {showHeaderAndFooter && (
          <div className='header-container' style={{ width: "100%" }}>
            <CSSTransition
              in={!open}
              timeout={300}
              classNames="menu"
              unmountOnExit
            >
              <div className='hamberger-container' onClick={() => setOpen(!open)}>
                <div className='hamberger first'></div>
                <div className='hamberger second'></div>
                <div className='hamberger third'></div>
              </div>
            </CSSTransition>

            <CSSTransition
              in={open}
              timeout={300}
              classNames="navbar"
              unmountOnExit
            >
              <MainNavbar setOpen={setOpen} />
            </CSSTransition>
          </div>)}
        <Routes>
          <Route path="/Front_End_PFA/cart" element={<Cart />} />
          <Route path="/Front_End_PFA/Gaming_Laptops/:id" element={<LandingPage />} />
          <Route path="/Front_End_PFA/Gaming_Desktop/:id" element={<LandingPage />} />
          <Route path="/Front_End_PFA/Phones/:id" element={<LandingPage />} />
          <Route path="/Front_End_PFA/Accessories/:id" element={<LandingPage />} />
          <Route path="/Front_End_PFA/Deals/:id" element={<LandingPage />} />
          <Route path="/Front_End_PFA/" element={<HomePage />} />
          <Route path="/Front_End_PFA/home" element={<HomePage />} />
          <Route path="/Front_End_PFA/Login" element={<LogIn />} />
          <Route path="/Front_End_PFA/Gaming_Laptops" element={<Laptops slug={["Gaming_Laptops"]} filter="True" />} />
          <Route path="/Front_End_PFA/Gaming_Desktop" element={<Laptops slug={["Gaming_Desktop"]} filter="True" />} />
          <Route path="/Front_End_PFA/Phones" element={<Laptops slug={["Phones"]} filter="True" />} />
          <Route path="/Front_End_PFA/Accessories" element={<Laptops slug={["Accessories", "Processors", "Graphic_Cards"]} filter="True" />} />
          <Route path="/Front_End_PFA/Deals" element={<Laptops slug={["Gaming_Laptops"]} filter="false" />} />
          <Route path="/Front_End_PFA/Support" element={<Support />} />
          <Route path="/Front_End_PFA/Dashboard/*" element={<DashBoard />}></Route>
        </Routes>
        {showHeaderAndFooter && <Footer />}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition:Slide
          style={{ zIndex: 999999 }} />
      </div>

    </DataProvider>
  );
}

export default App;
