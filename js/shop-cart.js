
const loadEvents = (total) =>{
    const btn = document.querySelector('#finalizarOrden');
        btn.addEventListener('click', () =>{
            localStorage.removeItem('carrito');
            location.reload(true);
            
            Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Gracias por tu compra!',
            showConfirmButton: false,
            timer: 2500
            })


            //alert('Compra finalizada, el total es de:', total);

    });
    const borrarBtns = document.querySelectorAll('.remove-button'); 
    for(const boton of borrarBtns){

        boton.addEventListener('click', () =>{
            const otroCar = shopCart.filter(element => element.id != boton.id);
            localStorage.setItem('carrito', JSON.stringify(otroCar));
            location.reload(true);
            
        })

    }
}

const actualizarCarrito = (carrito) =>{
    let carritoContainer = document.querySelector('#carrito');
    let container = document.querySelector('#carritoContainer');
        if(container){
            container.parentNode.removeChild(container);
        }
    let div = document.createElement('div');
    div.setAttribute('id','carritoContainer');
    div.innerHTML +=`
    <div class="grey-background-h2 cart-item">
    <img src="../img/cart.svg" alt="Carrito de compras" width=45 >
    </div>
    `;
    for (const product of carrito){
        div.innerHTML +=`

        <div class="cart-item grey-background-h2">
            <h4 class="table-text">${product.name} </h4>
            <h4 class="table-text">$${product.price.toFixed(3)} </h4>
            <h4 class="table-text">Cantidad: ${product.quantity} </h4>
            <button id="${product.id}" class="remove-button btn button button-font-size photo-card-shop btn-color">Eliminar</button>
        </div>

        `;
        //actualizarCarrito(carrito);
    }

    


    const total = carrito.reduce((acc, item) => acc + item.price * item.quantity, 0);
    div.innerHTML +=`

        <div class="cart-item grey-background-h2">
            <h4 class="table-text">Total: $${total.toFixed(3)} </h4>
        </div>

    `;
    div.innerHTML +=`<button id="finalizarOrden" class="btn button button-font-size photo-card-shop btn-color">Finalizar</button>`;
    carritoContainer.appendChild(div);
    
    loadEvents(total);

}

const shopCart = JSON.parse(localStorage.getItem('carrito')) || []

actualizarCarrito(shopCart);