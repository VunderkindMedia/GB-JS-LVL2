
const cartList = [

];


const getCartList = () => {
  return cartList;
}

const addCartItem = (item) => {
  cartList.push(item)
  return true;
}

const removeCartItem = (id) => {
  const findValue = cartList.find(item => item.product_id == id);
  return cartList.splice(cartList.indexOf(findValue), 1);
}

module.exports = { getCartList, addCartItem, removeCartItem };
