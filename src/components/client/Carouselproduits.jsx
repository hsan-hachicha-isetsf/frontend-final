import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getArticles } from '../../features/articleslice';

import CarouselProd from './CarouselProd';

const Carouselproduits = () => {
  const dispatch = useDispatch();

  useEffect(() => {
  
    dispatch(getArticles());

  }, [dispatch]);

  return (
    <div>

       <h3><i>Les produits</i></h3>
   
      <CarouselProd/> 
<hr/>
    </div>
  );
};

export default Carouselproduits;
