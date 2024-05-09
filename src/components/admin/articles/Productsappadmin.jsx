import React,{useEffect} from 'react'
import { useDispatch } from "react-redux";
import {getArticles} from "../../../features/articleslice";
import Affichearticletable from './Affichearticletable';
import Insertarticle from './Insertarticle';

const Productsappadmin = () => {
    const dispatch = useDispatch();
useEffect(() => {
dispatch(getArticles());
},[])
  return (
    <div>
        <Insertarticle/>
      <Affichearticletable/>
    </div>
  )
}

export default Productsappadmin
