'use strict';

// jquery event -->> javascript로 변경하는거 꼭 해보기.
$(document).ready(function () {
  const fileTarget = $('.file-box .cloth-input-file-hidden');
  let filename = '';
  fileTarget.on('change', function () {
    // 값이 변경되면
    if (window.FileReader) {
      // modern browser
      filename = $(this)[0].files[0].name;
    } else {
      // old IE
      filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출
    } // 추출한 파일명 삽입
    $(this).siblings('.cloth-upload-name').val(filename);
  });
});

// 옷장 이미지 slide 구현
const slideList = document.querySelector('.slide-list');
const slideContents = document.querySelectorAll('.slide-content');
const slideButtonNext = document.querySelector('.slide-button-next');
const slideButtonPrev = document.querySelector('.slide-button-prev');
const slideLength = slideContents.length;
const slideSpeed = 300;
const startNum = 0;
let slideWidth = 0;
setInterval(() => {
  if (screen.width >= 768) {
    slideWidth = 330;
  } else {
    slideWidth = 220;
  }
}, 100);

slideList.style.width = slideWidth * slideLength + 'px';

let firstChild = slideList.firstElementChild;
let lastChild = slideList.lastElementChild;
let clonedFirst = firstChild.cloneNode(true);
let clonedLast = lastChild.cloneNode(true);

slideList.appendChild(clonedFirst);
slideList.insertBefore(clonedLast, slideList.firstElementChild);

slideList.style.transform =
  'translate3d(-' + slideWidth * (startNum + 1) + 'px,0px,0px)';

let currentIndex = startNum;
let currentSlide = slideContents[currentIndex];

slideButtonNext.addEventListener('click', () => {
  if (currentIndex <= slideLength - 1) {
    slideList.style.transition = slideSpeed + 'ms';
    slideList.style.transform =
      'translate3d(-' + slideWidth * (currentIndex + 2) + 'px, 0px, 0px)';
  }
  if (currentIndex === slideLength - 1) {
    setTimeout(() => {
      slideList.style.transition = '0ms';
      slideList.style.transform =
        'translate3d(-' + slideWidth + 'px, 0px, 0px)';
    }, slideSpeed);
    currentIndex = -1;
  }
  currentSlide = ++currentIndex;
});

slideButtonPrev.addEventListener('click', () => {
  if (currentIndex >= 0) {
    slideList.style.transition = slideSpeed + 'ms';
    slideList.style.transform =
      'translate3d(-' + slideWidth * currentIndex + 'px, 0px, 0px)';
  }
  if (currentIndex === 0) {
    setTimeout(() => {
      slideList.style.transition = '0ms';
      slideList.style.transform =
        'translate3d(-' + slideWidth * slideLength + 'px,0px,0px)';
    }, slideSpeed);
    currentIndex = slideLength;
  }
  currentSlide = --currentIndex;
});
