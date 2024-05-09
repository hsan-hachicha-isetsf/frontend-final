import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Listarticles from "./components/client/Listarticles"
import Cart from "./components/client/Cart"
import StripePayment from './components/client/StripePayment';

import Menu from "./components/admin/Menu"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from "./components/admin/Login"
import Register from "./components/admin/Register"
import ProtectedRoutes from "./components/ProtectedRoutes";
import Logout from "./components/admin/Logout"

import Insertarticle from "./components/admin/articles/Insertarticle"
import Editarticle from "./components/admin/articles/Editarticle"
import Productsappadmin from "./components/admin/articles/Productsappadmin"

import Insertscategorie from "./components/admin/scategories/Insertscategorie"
import Scategoriesappadmin from "./components/admin/scategories/Scategoriesappadmin"
import Editscategorie from "./components/admin/scategories/Editscategorie"

import Categoriesappadmin from "./components/admin/categories/Categoriesappadmin"
import Insertcategorie from "./components/admin/categories/Insertcategorie"
import Editcategorie from "./components/admin/categories/Editcategorie";
import ListOrders from "./components/admin/orders/Listorders";




function App() {
  

  return (
    <>
   
    <ToastContainer/>
     <Router>
      
      <Routes>
        <Route path="" element={<Login/>}/>
        <Route path="/admin/menu" element={<Menu/>}/>
        <Route path="/register" element ={<Register/>}/>
        
<Route element={<ProtectedRoutes/>}>
 
        
       
        <Route path="/admin/orders" element={<ListOrders/>}/>
        <Route path="/articlesadmin" element={<Productsappadmin/>}/>
        <Route path="/article/add" element={<Insertarticle/>}/>
        <Route path="/article/edit/:id" element={<Editarticle/>}/>

        <Route path="/scategories" element={<Scategoriesappadmin/>}/>
        <Route path="/scategories/add" element={<Insertscategorie/>}/>
        <Route path="/scategories/edit/:id" element={<Editscategorie/>}/>

        <Route path="/categories" element={<Categoriesappadmin/>}/>
        <Route path="/categories/add" element={<Insertcategorie/>}/>
        <Route path="/categories/edit/:id" element={<Editcategorie/>}/>

        
        <Route path="/logout" element={<Logout/>}/>
</Route>
<Route path="/articlesclient" element={<Listarticles/>}/>
<Route path="/cart" element={<Cart/>}/>
<Route path='/pay/:total' element={<StripePayment/>}/>
      </Routes>

     </Router>
    </>
  )
}

export default App
