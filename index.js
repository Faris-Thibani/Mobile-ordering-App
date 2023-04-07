import { menuArray } from './data.js';

const completeOrderButton = document.querySelector('.complete-order-button');
const order = [];

const menuHtml = menuArray.map((item, index) => {
  return `
    <div class="menu-item">
      <span class="emoji">${item.emoji}</span>
      <h3>${item.name}</h3>
      <p>${item.ingredients.join(", ")}</p>
      <span class="price">$${item.price.toFixed(2)}</span>
      <button class="order-button" data-item-id="${index}">Order Now</button>
    </div>
  `;
}).join("");

// Add the HTML string to the menu container
const menuContainer = document.querySelector(".menu");
menuContainer.innerHTML = menuHtml;

// Get the "Order Now" buttons and add a click event listener to each one
const orderButtons = document.querySelectorAll('.order-button');
orderButtons.forEach(button => {
  button.addEventListener('click', (event ) => {
    const item = menuArray[event.target.dataset.itemId];
    const orderSection = document.querySelector('.order-section');
orderSection.style.display = 'block';
    order.push(item);
    updateOrderList();
    updateTotalPrice();
  });
});

// Remove item from the order
const orderList = document.querySelector('.order-list');
orderList.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-button')) {
    const index = event.target.dataset.itemIndex;
    order.splice(index, 1);
    updateOrderList();
    updateTotalPrice();
  }
});

// Complete order
completeOrderButton.addEventListener('click', () => {
  // do something when the order is completed
});

// Update the order list in the DOM
function updateOrderList() {
    orderList.innerHTML = '';
  
    // Create a new array with unique items and their quantities
    const uniqueOrder = order.reduce((acc, item) => {
      const existingItem = acc.find(x => x.item.name === item.name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        acc.push({ item: item, quantity: 1 });
      }
      return acc;
    }, []);
  
    // Add each item to the order list
    uniqueOrder.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.item.name} (${item.quantity})</span>
        <span>$${(item.item.price * item.quantity).toFixed(2)}</span>
        <button class="remove-button" data-item-index="${order.indexOf(item.item)}">Remove</button>
      `;
      orderList.appendChild(li);
    });
  }
  

// Update the total price in the DOM
const totalPrice = document.querySelector('.total-price');
function updateTotalPrice() {
  const total = order.reduce((acc, item) => acc + item.price, 0);
  totalPrice.textContent = `Total: $${total.toFixed(2)}`;
}

const paymentModal = document.querySelector('#payment-modal');
const paymentForm = paymentModal.querySelector('form');

completeOrderButton.addEventListener('click', () => {
  paymentModal.style.display = 'block';
});

paymentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Do something with the payment data, e.g. send it to a server
    paymentModal.style.display = 'none';
  
    const orderSection = document.querySelector('.order-section');
    orderSection.innerHTML = 
    `<h3> "Thanks, your order is on the way!"</h3>
     `
      const submitRatingButton = document.querySelector('.submit-rating-button');
      submitRatingButton.addEventListener('click', () => {
        const rating = document.querySelector('input[name="rating"]:checked').value;
        // Do something with the rating data, e.g. send it to a server
        const ratingSection = document.querySelector('.rating-section');
        ratingSection.innerHTML = `<h3>Thanks for your rating!</h3>`;
      });
  });