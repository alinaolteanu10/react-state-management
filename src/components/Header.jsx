import React from 'react';
import { Link } from 'react-router-dom';
// Importam ce avem nevoie.
import { CartContext } from '../store/Cart/context';
import { useContext } from 'react';


export function Header() {
  // Accesam state-ul global al cart-ului.
  const { state } = useContext(CartContext);
  const totalProducts = state.products.reduce(
    (accumulator, currentElement)=> {
      return accumulator + currentElement.quantity
  },
     0
);
  console.log('coss', totalProducts);
  return (
    <header>
      <div className="d-flex justify-content-between mx-4">
        <Link to="/">Acasă</Link>
        <div>
          <Link to="/products" className="p-3">
            Produse
          </Link>
          {/* Afisam datele din state pe ecran. */}
          
          <Link to="/cart" className="p-3">Coș ({totalProducts})
          </Link>
         
          
        
          <Link to="/favorites">Favorite</Link>
        </div>
      </div>
    </header>
  );
}

