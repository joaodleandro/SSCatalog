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

   var cart = [];
   var productNames;
   var productPrices;

   document.querySelectorAll('[data-product-modal-id]').forEach(button => {
    button.addEventListener('click', function () {
     const productIds = this.getAttribute('data-product-ids').split(',').map(Number);
     productNames = this.getAttribute('data-product-names').split(',');
     productPrices = this.getAttribute('data-product-prices').split(',').map(Number);
   
     const modalBody = document.querySelector('#productModal .modal-body');
     modalBody.innerHTML = '';
   
     for (let i = 0; i < productIds.length; i++) {
       const productId = productIds[i];
   
       // Verificar se o produto já está no carrinho
       const productInCart = cart.find(item => item.id === productId);
   
       // Preencher a quantidade no modal com a quantidade do carrinho, se aplicável
       const initialQuantity = productInCart ? productInCart.quantity : 0;
       console.log(initialQuantity)
   
       modalBody.innerHTML += `
       <p>
         ${productNames[i]} - €${productPrices[i].toFixed(2)}
         <span>
           <button class="btn btn-secondary btn-sm" onclick="decrementQuantity(${i}, ${productIds[i]})">-</button>
           <span id="product-quantity-${productIds[i]}">${initialQuantity}</span>
           <button class="btn btn-secondary btn-sm" onclick="incrementQuantity(${i}, ${productIds[i]})">+</button>
         </span>
       </p>
     `;
   }
   console.log(cart)
  });
});

window.incrementQuantity = function(index, productId) {
  const quantityElement = document.querySelector(`#product-quantity-${productId}`);
  const currentQuantity = parseInt(quantityElement.textContent, 10);
  quantityElement.textContent = currentQuantity + 1;
   
  // Encontre o produto no carrinho e atualize a quantidade
  const productIndex = cart.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    cart[productIndex].quantity = currentQuantity + 1;
  } else {
    // Adicione o produto ao carrinho se ainda não estiver lá
    cart.push({ id: productId, name: productNames[index], price: productPrices[index], quantity: 1 });
  }

  // Atualize o modal do carrinho
  updateCartModal();
};

window.decrementQuantity = function(index, productId) {
  const quantityElement = document.querySelector(`#product-quantity-${productId}`);
  const currentQuantity = parseInt(quantityElement.textContent, 10);
  if (currentQuantity > 0) {
    quantityElement.textContent = currentQuantity - 1;
 
    // Encontre o produto no carrinho e atualize a quantidade
    const productIndex = cart.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
      cart[productIndex].quantity = currentQuantity - 1;
    } else {
      // Adicione o produto ao carrinho se ainda não estiver lá
      cart.push({ id: productId, name: productNames[index], price: productPrices[index], quantity: 0 });
    }

    // Atualize o modal do carrinho
    updateCartModal();
  }
};

const cartModalBody = document.querySelector('#cartModalBody');
cartModalBody.innerHTML = '';
cartModalBody.textContent = 'Carrinho vazio, adicione produtos!';


function updateCartModal() {
  cartModalBody.innerHTML = '';
  cartModalBody.textContent = '';

  let cartTotal = 0;
  let cartItemCount = 0;

  // Percorra os produtos no carrinho
  for (const product of cart) {
    cartModalBody.innerHTML += `
      <p>
        ${product.name} - €${(product.price * product.quantity).toFixed(2)} (Quantidade: ${product.quantity})
        <button class="btn btn-secondary btn-sm" onclick="incrementCartItem(${product.id})">+</button>
        <button class="btn btn-secondary btn-sm" onclick="decrementCartItem(${product.id})">-</button>
      </p>
    `;

    cartTotal += product.price * product.quantity;
    cartItemCount += product.quantity;
  }

  if (cart.length > 0) {
    whatsappButton.disabled = false; // Habilita o botão
  } else {
    cartModalBody.textContent = 'Carrinho vazio, adicione produtos!';
    whatsappButton.disabled = true; // Desabilita o botão
  }

  // Atualize o total e o número de itens no modal do carrinho
  document.querySelector('#cartTotal').textContent = cartTotal.toFixed(2);
  document.querySelector('#cartItemCount').textContent = cartItemCount;
}

window.incrementCartItem = function(productId) {
  // Encontre o produto no carrinho e atualize a quantidade
  const productIndex = cart.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    cart[productIndex].quantity += 1;
    updateCartModal();
  }
}

window.decrementCartItem = function(productId) {
  // Encontre o produto no carrinho e atualize a quantidade
  const productIndex = cart.findIndex(p => p.id === productId);
  if (productIndex !== -1 && cart[productIndex].quantity > 0) {
    cart[productIndex].quantity -= 1;

    if (cart[productIndex].quantity === 0) {
      // Remova o produto do carrinho se a quantidade for zero
      cart.splice(productIndex, 1);
    }

    updateCartModal();
  }
}  

const whatsappButton = document.getElementById('whatsappButton');
whatsappButton.disabled = true;

document.querySelector('#whatsappButton').addEventListener('click', function () {
  const cartTotal = document.querySelector('#cartTotal').textContent;

  let whatsappMessage = `Aqui vai a minha wishlist de produtos *by_sofiasoeiro*%0A`;

  // Percorra os produtos no carrinho
  for (const product of cart) {
    whatsappMessage += `${product.quantity} x ${product.name} - ${product.price.toFixed(2)}%0A`;
  }

  whatsappMessage += `*Total: ${cartTotal} EUR*%0AObrigado!`;

  const whatsappLink = `https://api.whatsapp.com/send?phone=+351912253629&text=${whatsappMessage}`;

  window.open(whatsappLink);
});


   
});