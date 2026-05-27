import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import {
  About, Jobs, Blog, Press,
  Shipping, Returns, Warranty, Contact,
  FAQ, Privacy, Terms, Cookies,
  UserProfile, UserOrders, UserFavorites,
} from "./pages/StaticPages";
import { CartProvider }      from "./context/CartContext";
import { AccountProvider }   from "./context/AccountContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { useAccount }        from "./context/AccountContext";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

function UserRoutes() {
  const { user } = useAccount();
  return (
    <Routes>
      <Route path="/"             element={<Home />} />
      <Route path="/products"     element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/about"        element={<About />} />
      <Route path="/jobs"         element={<Jobs />} />
      <Route path="/blog"         element={<Blog />} />
      <Route path="/press"        element={<Press />} />
      <Route path="/shipping"     element={<Shipping />} />
      <Route path="/returns"      element={<Returns />} />
      <Route path="/warranty"     element={<Warranty />} />
      <Route path="/contact"      element={<Contact />} />
      <Route path="/faq"          element={<FAQ />} />
      <Route path="/privacy"      element={<Privacy />} />
      <Route path="/terms"        element={<Terms />} />
      <Route path="/cookies"      element={<Cookies />} />
      <Route path="/profile"      element={<UserProfile user={user} />} />
      <Route path="/orders"       element={<UserOrders />} />
      <Route path="/favorites"    element={<UserFavorites />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AccountProvider>
        <CartProvider>
          <FavoritesProvider>
            <ScrollToTop/>
          <div className="min-h-screen flex flex-col bg-[var(--color-primary)]">
              <Navbar />
              <div className="flex-1">
                <UserRoutes />
              </div>
              <Footer />
            </div>
          </FavoritesProvider>
        </CartProvider>
      </AccountProvider>
    </BrowserRouter>
  );
}
