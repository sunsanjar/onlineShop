const URL = 'https://run.mocky.io/v3/00ffeb2d-7feb-4fe8-b699-1323e30845c0';
let cart = {};
let goods = [];
// let k = 0;////////////////////////////////

let loadGoods = () => {
    fetch(URL)
    .then(response => response.json()) // .json() говорит что нужно преобразовать всё в json 
    .then(data => {
    showGoods(data);
    showMiniCart();
    })
}

let showGoods = (data) => {
    goods = data;
    let out = '';
    for (let key in data){
        out += '<div class="product__item">';
        out += '<img src="image/products/' + data[key].img + '" alt="" class="product__img">';
        out += '<div class="product__discount">30%</div>'; // <div class="product__discount">30%</div>
        out += '<div class="product__des">';
        out += '<div class="product__des-title">' + data[key].name + '</div>';
        out += '<div class="product__des-price">';
        out += '<span class="product__des-old-price">' + data[key].oldprice + '$</span>' + data[key].price + '$</div>';
        out += '<div class="product__des-buy">';
        out += '<button data-id="' + key +'" type="submit" class="product__add">В корзину</button>';
        out += '<button class="product__link">Подробнее ...</button>';
        out += '</div></div></div>';
    }
    document.querySelector('.product__list').innerHTML = out;///////////

    let btns = document.querySelectorAll('.product__add');
    for(let i = 0; i < btns.length; i++){
        btns[i].addEventListener('click', addToCart)
    }
}

function addToCart() {
    let id = this.dataset.id;
    if (cart[id]){
        cart[id]++;
    }
    else{
        cart[id] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    checkCart();
    showMiniCart();
}

function showMiniCart(){
    let k = 0;
    for(let key in cart){
        for(let key2 in goods){
            if(key2 == key){
               k += goods[key2].price * cart[key];
            }       
        }
    }
    // console.log(k);
    document.querySelector('#summ').innerText = k;
}

function checkCart(){
    let json = localStorage.getItem('cart');
    if(json !== null){
        cart = JSON.parse(json);
    }
}

loadGoods();
checkCart();

// {
//     "1":{
//         "img":"1.jpg",
//         "name":"BELL PEPPER",
//         "oldprice":120,
//         "price":80        
//      },
//      "2":{
//         "img":"2.jpg",
//         "name":"STRAWBERRY",
//         "oldprice":120,
//         "price":80
//      },
//      "3":{
//         "img":"3.jpg",
//         "name":"GREEN BEANS",
//         "oldprice":120,
//         "price":80
//      },
//      "4":{
//         "img":"4.jpg",
//         "name":"PURPLE CABBAGE",
//         "oldprice":120,
//         "price":80
//      },
//      "5":{
//         "img":"5.jpg",
//         "name":"TOMATOE",
//         "oldprice":120,
//         "price":80
//      },
//      "6":{
//         "img":"6.jpg",
//         "name":"BROCCOLI",
//         "oldprice":120,
//         "price":80
//      },
//      "7":{
//         "img":"7.jpg",
//         "name":"CARROTS",
//         "oldprice":120,
//         "price":80
//      },
//      "8":{
//         "img":"8.jpg",
//         "name":"FRUIT JUICE",
//         "oldprice":120,
//         "price":80
//      }
//   }