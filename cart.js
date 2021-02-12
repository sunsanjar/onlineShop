const URL = 'https://run.mocky.io/v3/00ffeb2d-7feb-4fe8-b699-1323e30845c0';
let sale_btn = document.querySelector('#sale_btn');
let destination = document.querySelector('#destination');
let ProceedToCheckout = document.querySelector('#ProceedToCheckout');
let cart = {};
let goods = {};
let goodsArr = [];
let k = 0;
sale_btn.addEventListener('click', costSale);
destination.addEventListener('click', destination_function);
ProceedToCheckout.addEventListener('click', ProceedToCheckout_function);

loadGoods();
checkCart();

function checkCart(){
    let json = localStorage.getItem('cart');
    if(json === null){
    	alert('Корзина пуста');
    } else {
       cart = JSON.parse(json);
    }
}

function loadGoods(){
	fetch(URL)
	.then(response => response.json())
	.then(data => {
        goods = data;
        goodsArr = data;
        showGoods();
        showMiniCart();
    })
}

let showGoods = () => {
	// console.log(goods);
	// console.log(cart);
   let out = '';	
   for(let key in cart){
       for(let key2 in goods){
           if(key == key2){
               out += '<tr class="text-center">';
               out += '<td class="product-remove"><a href="#"><span class="ion-ios-close"></span></a></td>';
               out += '<td class="image-prod"><div class="img" style="background-image:url(image/products/' + key + '.jpg);"></div></td>';
               out += '<td class="product-name">';
               out += '<h3>' + goods[key].name + '</h3>';//
               out += '<p>Far far away, behind the word mountains, far from the countries</p></td>';//
               out += '<td class="price">$' + goods[key].price + '</td>';//
               out += '<td class="quantity">';
               out += '<div class="input-group mb-3">';
               out += '<input type="text" name="quantity" class="quantity form-control input-number" value="' + cart[key] + '"></input>';//
               out += '</div></td><td class="total">$' + goods[key].price * cart[key] + '</td>';                     
               out += '<td><button class="delete" data-id="'+ key +'">delete</button></td>';
               out += '<td><button class="minus" data-id="'+ key +'">-</button></td>';
               out += '<td><button class="plus" data-id="'+ key +'">+</button></td></tr>';
             }
       }  
   }

   document.querySelector('#cartBlock').innerHTML = out;

   let delete_btns = document.querySelectorAll('.delete');

   let minus_btns = document.querySelectorAll('.minus');
   
   let plus_btns = document.querySelectorAll('.plus');

   for(let i = 0; i < delete_btns.length; i++){
    delete_btns[i].addEventListener('click', deleteGoods);
}

   for(let i = 0; i < minus_btns.length; i++){
       minus_btns[i].addEventListener('click', minusGoods);
   }

   for(let i = 0; i < plus_btns.length; i++){
    plus_btns[i].addEventListener('click', plusGoods);
    }
} 

function plusGoods(){
	let id = this.dataset.id;
    cart[id]++;
	showGoods();
	saveCart();
} 

function minusGoods(){
	let id = this.dataset.id;
	if(cart[id] > 1){
	   cart[id]--;
	} else {
      delete cart[id];
    }
	showGoods();
	saveCart();
}

function deleteGoods(){
    let id = this.dataset.id;
    delete cart[id];
    showGoods();
	saveCart();
}

function saveCart(){
	localStorage.setItem('cart', JSON.stringify(cart));
}

function showMiniCart(){
        let json = localStorage.getItem('cart');///////////
        cart = JSON.parse(json);////////////////
        for(let key in cart){
            for(let key2 in goodsArr){
                if(key2 == key){
                   k += goodsArr[key2].price * cart[key];
                   localStorage.setItem('k', JSON.stringify(k));
                }       
            }
        }
        document.querySelector('#summ').innerText = k;
}

function costSale(){
    let code_input = document.querySelector('#code').value;
    let code = "";
    let percent = 0;
    let sale = 0;
    // let summWithSale = k;
    let codes = {
        2020: 40,
        5050: 50,
        4000: 20,
        3002: 80,
    };
    // console.log(codes[code_input]);
    // for (let value of Object.values(codes))
    if(!code_input) {
        alert("Вы не ввели промокод!");
        return;
    } 
    else {
         if(codes[code_input]){
                code = code_input;//  Номер Промокода 
                percent = codes[code_input]; // Процент Скидки
                sale = k * percent / 100; // Скидка в Долларах
                // summWithSale = k - (k * percent / 100); // Сумма после скидки
            }
        else if(!codes[code_input]){
            alert("Введённый код неверный!");
        }
    }
    // document.querySelector('#sale_summ').innerText = summWithSale;
    document.querySelector('#sale_percent').innerText = percent;
    document.querySelector('#sale').innerText = sale;
}

function destination_function(){
    let state_input = document.querySelector('#state1').value;
    let country_input = document.querySelector('#country1').value;
    let phone_input = document.querySelector('#phone1').value;

    document.querySelector('#state_input').innerText = state_input;
    document.querySelector('#country_input').innerText = country_input;
    document.querySelector('#phone_input').innerText = phone_input;

}

function ProceedToCheckout_function(){
    let sale1 = document.querySelector('#sale').innerText;
    let summ1 = document.querySelector('#summ').innerText;
    let summWithSale = summ1 - sale1;
    document.querySelector('#sale_summ').innerText = summWithSale;
}