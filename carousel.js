const imgs = [
    `https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220822-home-relaxation-en1.jpg`,
    `https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220822-bedroom-en.jpg`,
    `https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220822-samsung-tvs-en.jpg`,
    `https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220822-ipad-en.jpg`,
    `https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220822-mvm-coupons-week04-en.jpg`,
    `https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220822-travel-en.jpg`
];

const descriptions = [
    `Relax at home`,
    `Furniture`,
    `Samsung TV`,
    `iPad`,
    `Member-only Savings`,
    `Travel`
];

const data = {
    imgs: imgs,
    descriptions: descriptions,
    index:0,
    timerId: null,
    arrBtns:[],
};

const objs = {
    imgs: document.querySelector('.carousel img'),
    btnBar:document.querySelector('.carousel .btnBar'),
    navPrev: document.querySelector('.prev'),
    navNext: document.querySelector('.next'),
};

const cbClick = function (evt) {    //cbClick = call back click
    console.log('clicked', evt.target.dataset.imgID);
    const imgID = Number(evt.target.dataset.imgID);
    console.log(typeof  imgID);
    objs.imgs.src = data.imgs[imgID];
};

const timerHandler = function () {

    if (data.index === data.imgs.length) {
        data.index = 0;
    } else {
        objs.imgs.src = data.imgs[data.index];
        updateSelected(data.index);
        data.index++;
    }
};

const startAnimate = function () {
    data.timerID=setInterval(timerHandler,3*1000);

};

const stopAnimate = function () {
    if (data.timerID) {
        clearInterval(data.timerID)
        data.timerId = null;
    };
};

const cbMouseEnter = function (evt) {
    stopAnimate();
};

const cbMouseLeave = function (evt) {
    startAnimate();
};
const updateSelected = function (index) {
    data.arrBtns.forEach(function (btn, i){
        btn.classList = '';
        i === index && data.arrBtns[index].classList.add('btnSelected');
    })
};

const cbPagePrev = function () {
    data.index > 0 && data.index--;
    objs.imgs.src = data.imgs[data.index];
    updateSelected(data.index);
};

const cbPageNext = function () {
    data.index < data.imgs.length-1 && data.index++;
    objs.imgs.src = data.imgs[data.index];
    updateSelected(data.index);
};

const createCarousel = function () {
    objs.imgs.src = data.imgs[data.index];
    objs.imgs.addEventListener('mouseenter', cbMouseEnter);
    objs.imgs.addEventListener('mouseleave', cbMouseLeave);
    objs.navPrev.addEventListener('click', cbPagePrev);
    objs.navNext.addEventListener('click', cbPageNext);

    for (let [i, description ] of data.descriptions.entries() ) {
        let eleBtn = document.createElement('button');
        eleBtn.innerText = description;
        eleBtn.dataset.imgID = i;
        eleBtn.addEventListener('click',cbClick );
        objs.btnBar.appendChild(eleBtn);
        data.arrBtns.push(eleBtn);
        updateSelected(data.index);
        // console.log(i);
    };
};

createCarousel();
startAnimate();

