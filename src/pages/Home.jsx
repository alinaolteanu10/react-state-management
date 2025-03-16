import React, { useEffect, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
// Importam ce avem nevoie.
import { CartContext } from '../store/Cart/context';
import { addToCart } from '../store/Cart/actions';
import { ThemeContext } from '../store/Theme/context';
import { setLightTheme, setDarkTheme } from '../store/Theme/actions';
import { addToFav } from '../store/Favorites/actions';
import { FavoritesContext } from '../store/Favorites/context';



export function Home() {
  // Vom modifica state-ul cart-ului, deci avem nevoie de dispatch.
  // Vom accesa si modifica state-ul temei, deci avem nevoie si de state si de dispatch.
  const { themeState, themeDispatch } = useContext(ThemeContext);
  const {dispatch} = useContext(CartContext);
  const{favDispatch} = useContext(FavoritesContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://www.cheapshark.com/api/1.0/deals?pageSize=4')
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);
  

  // Extragem valoarea temei.
  const theme = themeState.theme;

  // Cand dam click pe butonul de schimbare a temei, in functie de valoarea temei, declansam actiunea corespunzatoare.
  function handleThemeChange() {
    let actionResult;
    // Daca tema este light, declansam actiunea ce seteaza tema dark.
    if (theme === 'light') {
      actionResult = setDarkTheme();
      themeDispatch(actionResult);
      // Daca tema este dark, declansam actiunea ce seteaza tema light.
    } else if (theme === 'dark') {
      actionResult = setLightTheme();
      themeDispatch(actionResult);
    }
  }

  function handleAddToCart(product) {
    // Apelam actiunea, cu payload-ul aferent.
    const actionResult = addToCart(product);
    // Trimitem rezultatul actiunii catre reducer.
    dispatch(actionResult);
  }
  function handleAddToFav(product) {
    const actionResult = addToFav(product);
    favDispatch(actionResult);

  }

  return (
    <div
      className={theme === 'light' ? 'px-2 mx-2 bg-white' : 'px-2 mx-2 bg-dark'}
    >
      <div className="d-flex flex-column align-items-center">
        {/* Atasam butonului  */}
        <Button
          variant="outline-primary"
          className="mt-3"
          // Atasam functia care va schimba state-ul global al temei.
          onClick={handleThemeChange}
        >
          Change theme
        </Button>
        {/* Afisam produsele din cart. */}
        {products.map((product) => {
          return (
            <Card
              key={product.dealID}
              style={{ width: '18rem' }}
              className="m-3"
            >
              <Link
                to={`/product/${encodeURI(product.dealID)}`}
                className="text-dark"
              >
                <Card.Img variant="top" src={product.thumb} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="text-danger">
                    {product.salePrice} $
                  </Card.Text>
                </Card.Body>
              </Link>
              <Button
                variant="success"
                onClick={() => {
                  // Construim payload-ul si il pasam ca argument functiei care va apela actiunea addToCart.
                  handleAddToCart({
                    id: product.dealID,
                    image: product.thumb,
                    name: product.title,
                    price: product.salePrice,
                  });
                }}
              >
                Adaugă în coș
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  
                  handleAddToFav({
                    id: product.dealID,
                    image: product.thumb,
                    name: product.title,
                    price: product.salePrice,
                  });
                }}
              >
                Adaugă la favorite
              </Button>
            </Card>
          );
        })}
      </div>
      <Link to="/products">Vezi toate produsele</Link>
    </div>
  );
}
