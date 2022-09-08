import slider from './modules/slider.js';

window.addEventListener('DOMContentLoaded', () => {  
    // Передаём в слайдер объект с настройками, где в '' прописан соот-й класс селектора
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
});