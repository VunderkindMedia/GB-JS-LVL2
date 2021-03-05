
const products = [
  {
    product_name: 'Чайник',
    product_id: 1,
    product_image: 'https://kupilochka.ru/upload/iblock/97e/97e2e66894be1125ba8af346c729c20f.jpg'
  },
  {
    product_name: 'Ноутбук',
    product_id: 2,
    product_image: 'https://cdn.alza.cz/ImgW.ashx?fd=f4&cd=NC370a2a27&i=1.jpg'
  },
  {
    product_name: 'Телефон',
    product_id: 3,
    product_image: 'https://tpshop.ru/i/large/67f8052963b80da384cd416efaa63052.jpeg'
  },
  {
    product_name: 'Шашлычница',
    product_id: 4,
    product_image: 'https://images.satom.ru/i3/firms/28/111/111533/elektroshashlychnica-neptun_e47acadc6782e0c_800x600.jpg'
  }
];

const getProduct = (id) => {
  return products.find(item => item.product_id == id);
}

const getProducts = () => {
  return products;
}

const addProduct = (item) => {
  products.push(item)
  return true;
}

const removeProduct = (id) => {
  const findValue = products.find(item => item.product_id == id);
  return products.splice(products.indexOf(findValue), 1);
}

module.exports = { getProduct, getProducts, addProduct, removeProduct };
