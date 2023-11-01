document.addEventListener("DOMContentLoaded", function () {

    var currentPage = 1;

    var carouselElement = document.getElementById("carouselExample");

    var carousel = new bootstrap.Carousel(carouselElement);

    var prevArrow = carouselElement.querySelector(".carousel-control-prev");
    prevArrow.classList.add("d-none");
    var nextArrow = carouselElement.querySelector(".carousel-control-next");

    var totalSlides = carouselElement.querySelectorAll(".carousel-item").length;

    carouselElement.addEventListener("slide.bs.carousel", function (e) {

        if (e.to === 0) {
        prevArrow.classList.add("d-none");
        nextArrow.classList.remove("d-none");
        } else if (e.to === totalSlides - 1) {
        prevArrow.classList.remove("d-none");
        nextArrow.classList.add("d-none");
        } else {
        prevArrow.classList.remove("d-none");
        nextArrow.classList.remove("d-none");
        }
  });

   // Adicione evento de clique para os botões personalizados (prevTen e nextTen)
   var prevTenButton = document.getElementById("prevTen");
   prevTenButton.classList.add("d-none");
   var nextTenButton = document.getElementById("nextTen");
   // Oculte o botão "prevTen" no primeiro slide e o botão "nextTen" no último slide
   carouselElement.addEventListener("slide.bs.carousel", function (e) {
     if (e.to === 0) {
       prevTenButton.classList.add("d-none");
       nextTenButton.classList.remove("d-none");
     } else if(e.to === totalSlides - 1) {
       prevTenButton.classList.remove("d-none");
       nextTenButton.classList.add("d-none"); 
     } else {
       prevTenButton.classList.remove("d-none");
       nextTenButton.classList.remove("d-none");
     }
   });
   
   prevArrow.addEventListener("click", function () {
    currentPage-=1
    updatePageTracker();
  });

   prevTenButton.addEventListener("click", function () {
     var currentSlide = carouselElement.querySelector(".active");
     var currentIndex = Array.from(carouselElement.querySelectorAll(".carousel-item")).indexOf(currentSlide);
     var targetIndex = Math.max(currentIndex - 10, 0);
     carousel.to(targetIndex);
     currentPage=Math.max(currentPage - 10, 1);
     updatePageTracker();
   });

   nextArrow.addEventListener("click", function () {
    currentPage+=1
    updatePageTracker();
   });
 
   nextTenButton.addEventListener("click", function () {
     var currentSlide = carouselElement.querySelector(".active");
     var currentIndex = Array.from(carouselElement.querySelectorAll(".carousel-item")).indexOf(currentSlide);
     var totalSlides = carouselElement.querySelectorAll(".carousel-item").length;
     var targetIndex = Math.min(currentIndex + 10, totalSlides - 1);
     carousel.to(targetIndex);
     currentPage=Math.min(currentPage + 10, 24);
     updatePageTracker();
   });

   function updatePageTracker() {
        var pageTracker = document.getElementById("pageTracker");
        if (pageTracker) {
            pageTracker.textContent = `Página ${currentPage} de 24`;
        }   
   }

   updatePageTracker();

});