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
    const totalBalanceElement = document.getElementById('product-total-price')
    const previousProductTotalPriceString = totalBalanceElement.innerText;

    const previousProductTotalPrice = parseFloat(previousProductTotalPriceString);
    const productTotalPrice = previousProductTotalPrice + newProductPrice;
    totalBalanceElement.innerText = productTotalPrice;
    
    const purchaseBtn = document.getElementById('purchase-btn');
    if(productTotalPrice > 0){
        purchaseBtn.removeAttribute('disabled');
    }
    const applyCouponBtn = document.getElementById('apply-coupon');
    if(productTotalPrice >= 200){
        purchaseBtn.removeAttribute('disabled');
        document.getElementById('apply-coupon').addEventListener('click', function(){
            const couponCode = document.getElementById('coupon-field').value;
            if(couponCode === 'SELL200'){
                const newTotalDiscountAmount = productTotalPrice * 0.2.toFixed(2);
                const previousDiscountElement = document.getElementById('discount');
                const previousDiscount = parseFloat(previousDiscountElement.innerText);
                previousDiscountElement.innerText = newTotalDiscountAmount;
                const productDiscountPrice = productTotalPrice - newTotalDiscountAmount;
                const priceWithDiscountElement = document.getElementById('price-with-discount');
                priceWithDiscountElement.innerText = productDiscountPrice;
            }
            console.log('btn clicked');
        })
    }
}
const cards = document.getElementsByClassName('card');
for(const card of cards){
    card.addEventListener('click', function(){
       displayProductOnCart(card);
       calculateAndDisplayProductPrices(card);

    })
}


// popup
document.getElementById('purchase-btn').addEventListener('click', function(){
    const removeOpacity = document.getElementById('overlay');
    removeOpacity.classList.add('overlay');
    const openPopup = document.getElementById('order-complete-popup');
    openPopup.classList.remove('hide');
})

document.getElementById('go-back-home').addEventListener('click', function(){
    location.reload();
})