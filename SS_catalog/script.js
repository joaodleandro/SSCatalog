document.addEventListener("DOMContentLoaded", function () {

    var currentPage = 1; // A página atual
    var totalPages = 24; // O total de páginas no catálogo

    var carouselElement = document.getElementById("carouselExample");

    var carousel = new bootstrap.Carousel(carouselElement);

    var prevArrow = carouselElement.querySelector(".carousel-control-prev");
    prevArrow.classList.add("d-none");

    var totalSlides = carouselElement.querySelectorAll(".carousel-item").length;

    carouselElement.addEventListener("slide.bs.carousel", function (e) {
        var nextArrow = carouselElement.querySelector(".carousel-control-next");

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
   
   prevTenButton.addEventListener("click", function () {
     var currentSlide = carouselElement.querySelector(".active");
     var currentIndex = Array.from(carouselElement.querySelectorAll(".carousel-item")).indexOf(currentSlide);
     var targetIndex = Math.max(currentIndex - 10, 0);
     carousel.to(targetIndex);
   });
 
   nextTenButton.addEventListener("click", function () {
     var currentSlide = carouselElement.querySelector(".active");
     var currentIndex = Array.from(carouselElement.querySelectorAll(".carousel-item")).indexOf(currentSlide);
     var totalSlides = carouselElement.querySelectorAll(".carousel-item").length;
     var targetIndex = Math.min(currentIndex + 10, totalSlides - 1);
     carousel.to(targetIndex);
   });

    // Atualize o elemento de rastreamento de página
    var pageTracker = document.getElementById("pageTracker");
    if (pageTracker) {
        pageTracker.textContent = `Página ${currentPage} de ${totalPages}`;
    }   

});