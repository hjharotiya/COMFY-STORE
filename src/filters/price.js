import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupPrice = (store) => {
	const priceInput = getElement('.price-filter');
	const priceValue = getElement(".price-value");

	// set up filter
	let maxPrice = store.map((product) => {
		return product.price;
	});
	maxPrice = Math.max(...maxPrice);
	// console.log(maxPrice);
	maxPrice = Math.ceil(maxPrice / 100);
	priceInput.value = maxPrice;
	priceInput.max = maxPrice;
	priceInput.min = 0;
	priceValue.textContent = `value:$${maxPrice}`;

	priceInput.addEventListener('input', () => {
		const value = parseInt(priceInput.value);
		priceValue.textContent = `value$${value}`;
		let newStore = store.filter((product) => product.price/100 <= value);
		
		if (newStore.length<1) {
			const productsEl = getElement(".products-container");
			productsEl.innerHTML = `<h3 class="filter-error" > sorry no item matched your search</h3> `;
		}
		else {
			display(newStore, getElement(".products-container"),true);
			
		}
	});


};

export default setupPrice;