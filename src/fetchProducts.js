import { allProductsUrl } from './utils.js';

const fetchProducts = async () => {

	try {
		const respone = await fetch(allProductsUrl);
		if (respone) {
			// console.log(respone);
			// console.log(await respone.json());
			return await respone.json();
		}
	} catch (error) {
		console.log(error);
	}

};

export default fetchProducts;
