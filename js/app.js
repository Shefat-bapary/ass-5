let listCount = 0;
function displayProductOnCart(card){
    listCount++;
    const productName = card.children[1].children[1].innerText;
    const p = document.createElement("p");
    p.innerText = listCount + ". " + productName;
    const cartItemContainer = document.getElementById('cart-item');
    cartItemContainer.appendChild(p)
}


function calculateAndDisplayProductPrices(card){
    const productPriceString = card.children[1].children[2].children[0].innerText;
    const newProductPrice = parseFloat(productPriceString);
    const totalProductBalance = document.getElementById('product-total-price')
    const previousProductTotalPriceString = totalProductBalance.innerText;

    const previousProductTotalPrice = parseFloat(previousProductTotalPriceString);
    const productTotalPrice = previousProductTotalPrice + newProductPrice;
    console.log(previousProductTotalPrice, newProductPrice);
    console.log(productTotalPrice)
    totalProductBalance.innerText = productTotalPrice;
    
    if(productTotalPrice > 0){
        const purchaseBtn = document.getElementById('purchase-btn');
        purchaseBtn.removeAttribute('disabled');
    }
}
const cards = document.getElementsByClassName('card');
for(const card of cards){
    card.addEventListener('click', function(){
       displayProductOnCart(card);
       calculateAndDisplayProductPrices(card);

    })
}