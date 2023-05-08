// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';
// set items

const cartItemCountDOM = getElement(".cart-item-count");
const CartItemDOM = getElement('.cart-items');
const CartTotalDOM = getElement(".cart-total");

let cart = getStorageItem('cart');

export const addToCart = (id) => {

  let item = cart.find((cartItem) => cartItem.id === id);
  if (!item) {
    let product = findProduct(id);
  //  add item to the 
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    addToCartDOM(product);
    console.log(cart);
  }
  else {
    // update the values
    const amount = increaseAmount(id);
    console.log(amount);
    const items = [...CartItemDOM.querySelectorAll('.cart-item-amount')];
    console.log(items);
    const newAmount = items.find((value) => value.dataset.id === id);
    
    newAmount.textContent = amount;
  }
  // add one to item on cart
  displayCartItemCount();
  // display cart total 
  displayCartItemTotal();
  setStorageItem('cart', cart);
// more stuff to come
  openCart();
};



function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
}

function displayCartItemTotal() {
  const total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);
  CartTotalDOM.textContent = `Total : ${formatPrice(total)}`;
};

function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount};
    }
    console.log(cartItem);
    return cartItem;
  });
  return newAmount;
}

// DECREASE AMOUNT
function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount};
    }
    console.log(cartItem);
    return cartItem;
  });
  return newAmount;
}

function removeItem(id) {
  console.log(cart);
  cart = cart.filter((cartItem) => cartItem.id !==id)
  console.log(cart);
  // return cart;
}

function setupCartFunctionality() {
  cart.forEach((cartItem) => {
    addToCartDOM(cartItem)
  });

  CartItemDOM.addEventListener('click', (e) => {
    const element = e.target;
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = parent.dataset.id;
    console.log(element, parent, parentID);
    
    // REMOVE
    if (element.classList.contains('cart-item-remove-btn')) {
      console.log('remove');
      removeItem(id);
      // parent.parentElementID.remove();
      parent.parentElement.remove();
      element.parentElement.parentElement.remove();
    }
// INCREASE
    if (parent.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
    }

// DECREASE
    if(parent.classList.contains('cart-item-decrease-btn')){
      const newAmount = decreaseAmount(parentID);
      
      if (newAmount === 0) {
        removeItem(id);
        parent.parentElement.parentElement.remove();
      }
      else {
        parent.previousElementSibling.textContent = newAmount;
        
      }

    }

    displayCartItemCount();
    displayCartItemTotal();
    setStorageItem('cart', cart);


  });
  


}


const init = () => {
  displayCartItemCount();

  displayCartItemTotal();

  setupCartFunctionality();
}
init();
