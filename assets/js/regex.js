const str = `Lorem ipsum dolor sit amen't, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqu'a. 
Urna cursus eget nunc scelerisque viverra mauris. Facilisi: 'nullam vehicula ipsum' a arcu cursus vitae congue. 
Elementum facilisis leo's vel fringilla est. Aliquam vestibulum morbi blandit cursus.
Et malesuada fames ac turpis egestas integer eget aliquet. Vitae justo eget magna fermentum iaculis eu non diam.
Facilisi etiam dignissim diam quis enim lobortis. Urna nunc: 'id cursus metus'. Molestie ac feugiat sed lectus.`;

const regexField = document.querySelector('.regexStr');
const regexHTML = document.querySelector('.regex');
const btn = document.querySelector('.regBtn');
let regex;

regexField.innerHTML = str;

  regex = new RegExp(regexHTML.value, 'gm');

regexHTML.addEventListener('input', event => {
  regex = new RegExp(event.target.value = regexHTML.value, 'gm');
})

const regReplacer = (str) => {
  console.log(regex);
  return regexField.innerHTML = str.replaceAll(regex, '"$1"');
}


btn.addEventListener('click', () => regReplacer(str));
