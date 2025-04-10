const triggers = {
    menu: document.querySelector(`#js-triggers li:first-child a`),
    modal: document.querySelector(`#js-triggers li:nth-child(2) a`),
};

const components = {
    menu: document.querySelector(`nav`),
    modal: document.querySelector(`.modal-panel`),
    content: document.querySelector(`.modal-content`),
};

let isMenuOpen = false;
let isModalOpen = false;
const toggleMenu = (e) => {
    e.preventDefault();
    isMenuOpen = !isMenuOpen;
    components.menu.classList.toggle(`menu-active`, isMenuOpen);
};

const toggleModal = (e) => {
    e.preventDefault();
    isModalOpen = !isModalOpen;
    components.modal.classList.toggle(`active`, isModalOpen);

    if (isModalOpen) {
        components.content.innerHTML = `<h2>Important Notice</h2>
            <p>This modal should obscure all other page elements.</p>`;
        document.body.style.overflow = `hidden`;
    } else {
        document.body.style.overflow = ``;
    }
};

const handleResize = () => {
    const wasMenuOpen = isMenuOpen;
    const wasModalOpen = isModalOpen;

    if (wasMenuOpen || wasModalOpen) {
        components.menu.classList.remove(`menu-active`);
        components.modal.classList.remove(`active`);
        isMenuOpen = false;
        isModalOpen = false;
        document.body.style.overflow = ``;
    }
};

const handleKeyPress = (e) => {
    if (e.key === `Escape` && isModalOpen) toggleModal(e);
};

triggers.menu.addEventListener(`click`, toggleMenu);
triggers.modal.addEventListener(`click`, toggleModal);
window.addEventListener(`resize`, handleResize);
document.addEventListener(`keydown`, handleKeyPress);

components.modal.addEventListener(`click`, (e) => {
    if (e.target === components.modal) toggleModal(e);
});
