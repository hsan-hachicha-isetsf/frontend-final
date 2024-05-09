import React,{useEffect} from 'react'
import { useDispatch } from "react-redux";
import {getCategories} from "../../../features/categorieslice";
import Affichecategorietable from './Affichecategorietable';
import Insertcategorie from './Insertcategorie';

const Categoriesappadmin = () => {
    const dispatch = useDispatch();
useEffect(() => {
dispatch(getCategories());
},[])
  return (
    <div>
      <Insertcategorie/>
      <Affichecategorietable/>
    </div>
  )
}

export default Categoriesappadmin