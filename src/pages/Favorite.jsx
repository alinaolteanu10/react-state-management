import React from "react";
import { FavoritesContext } from "../store/Favorites/context";
import { Button } from "react-bootstrap";
import { removeFromFav } from "../store/Favorites/actions";
import { useContext } from "react";

export function Favorite() {
    
    const{favState, favDispatch} = useContext(FavoritesContext);
    function handleFavRemove(id){
        const actionResult = removeFromFav(id);
            
            favDispatch(actionResult);
          }
    
return (
    <div className="mx-2">
      
      {favState.products.length === 0 ? (
        <p>Nu ai produse in cos.</p>
      ) : (
        favState.products.map((product) => {
       
          return (
            <div key={product.id} className="m-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <img src={product.image} alt="" />
                <strong>{product.name}</strong>
                <strong>{product.price}$</strong>
              </div>
              <Button
                variant="danger"
                
                onClick={() => handleFavRemove(product.id)}
              >
                Remove
              </Button>
            </div>
          );
        })
      )}
    </div>
  );
}   
        
              
    