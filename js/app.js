let listCount = 0;
const applyCouponBtn = document.getElementById('apply-coupon');
const purchaseBtn = document.getElementById('purchase-btn');
const priceWithDiscountElement = document.getElementById('product-total-price');

let subTotalPrice;

function displayProductOnCart(card) {
    listCount++;
    const productName = card.children[1].children[1].innerText;
    const p = document.createElement("p");
    p.innerText = listCount + ". " + productName;
    const cartItemContainer = document.getElementById('cart-item');
    cartItemContainer.appendChild(p);

    const newProductPriceString = card.children[1].children[2].children[0].innerText;
    const newProductPrice = parseFloat(newProductPriceString);

    const previousProductTotalPriceElement = document.getElementById('product-subtotal-price');
    const previousProductTotalPriceString = previousProductTotalPriceElement.innerText;
    const previousProductTotalPrice = parseFloat(previousProductTotalPriceString);

    const productTotalPrice = previousProductTotalPrice + newProductPrice;
    // set subtotal price in variable
    subTotalPrice = productTotalPrice;
    // set subtotal price
    previousProductTotalPriceElement.innerText = productTotalPrice.toFixed(2);
    // set subtotal price
    priceWithDiscountElement.innerText = productTotalPrice.toFixed(2);

    if (productTotalPrice > 0) {
        purchaseBtn.removeAttribute('disabled');
    }
    if (productTotalPrice >= 200) {
        applyCouponBtn.removeAttribute('disabled');
    }
}

function calculateDiscount() {
    const couponField = document.getElementById('coupon-field');
    const couponCode = couponField.value;
    if (couponCode === 'SELL200') {
        const newTotalDiscountAmount = subTotalPrice * 0.2;
        const previousDiscountElement = document.getElementById('discount');
        previousDiscountElement.innerText = newTotalDiscountAmount.toFixed(2);
        const productDiscountPrice = subTotalPrice - newTotalDiscountAmount;
        priceWithDiscountElement.innerText = productDiscountPrice.toFixed(2);

        couponField.value = "";
    }
    else {
        alert('INVALID COUPON')
    }
}

applyCouponBtn.addEventListener('click', calculateDiscount);


const cards = document.getElementsByClassName('card');
for (const card of cards) {
    card.addEventListener('click', function () {
        displayProductOnCart(card);

    })
}


// popup
document.getElementById('purchase-btn').addEventListener('click', function () {
    const removeOpacity = document.getElementById('overlay');
    removeOpacity.classList.add('overlay');
    const openPopup = document.getElementById('order-complete-popup');
    openPopup.classList.remove('hide');
})

document.getElementById('go-back-home').addEventListener('click', function () {
    location.reload();
})