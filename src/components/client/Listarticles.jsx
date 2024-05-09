import React, { useEffect } from 'react'
import { useDispatch } from "react-redux";
import {getArticles} from "../../features/articleslice";
import AfficheArticles from './AfficheArticles';
import Menuclient from './Menuclient';
import Accueil from '../Accueil';
const Listarticles = () => {
    const dispatch=useDispatch()
    useEffect(() => {
        dispatch(getArticles())
    }, [dispatch])
  return (
    <div>
      <Menuclient/>
      <Accueil/>
      <AfficheArticles/>
    </div>
  )
}

export default Listarticles
