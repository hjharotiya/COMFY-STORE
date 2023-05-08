import { getElement } from './utils.js';

const toggleNav = getElement(".toggle-nav");
const sidebarOverlay = getElement(".sidebar-overlay");
const sidrbarClose = getElement(".sidebar-close");

toggleNav.addEventListener("click", () => {
	sidebarOverlay.classList.add("show");
	
})
sidrbarClose.addEventListener("click", () => {
	sidebarOverlay.classList.remove("show");

})