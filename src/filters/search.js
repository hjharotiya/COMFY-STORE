import { getElement } from '../utils.js';
import display from '../displayProducts.js';
const setupSearch = (store) => {
	// console.log("hello");
	const form = getElement('.input-form');
	const nameInput = getElement('.search-input');

	form.addEventListener("keyup", () => {
		const valueIn = nameInput.value;
		if (valueIn) {
			const newstore = store.filter((product) => {
				let { name } = product;
				name = name.toLowerCase();
				if (name.startsWith(valueIn)) {
					return product;
				}
			});
			display(newstore, getElement('.products-container'));
			if (newstore.length < 1) {
				const products = getElement('.products-container');
				products.innerHTML = `<h3 class="filter-error">
				sorry no product matched your search
				</h3>`
			}
		}
		else {
			display(store, getElement('.products-container'),true);
		}


	})
};

export default setupSearch;

