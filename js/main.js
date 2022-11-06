

const Products = [];

const carrito = JSON.parse(localStorage.getItem('carrito')) || [];




const loadEvents = () =>{

        let buttons = document.querySelectorAll('.button');
        for (const button of buttons){
            button.addEventListener('click', ()=>{
                let prod = carrito.find(product => product.id == button.id);
                    if(prod){
                        prod.quantity++;
                        localStorage.setItem('carrito', JSON.stringify(carrito));                    
                }
                else{
                    let prod = Products.find(element => element.id == button.id);
                        if(prod){
                            let newProduct ={
                                
                                id: prod.id,
                                name: prod.name,
                                description: prod.description,
                                price: prod.price,
                                image: prod.image,
                                quantity: 1
                            }

                            carrito.push(newProduct);
                            localStorage.setItem('carrito', JSON.stringify(carrito));
                            
                        }                        
                }   
            });
        }
    }


const loadProducts = (Products) => {

    let container = document.querySelector('#container');
    for (const product of Products){
        let div = document.createElement('div');
        div.setAttribute('class', 'card');
        div.innerHTML = `

            <div class="card-e-shop margin round-borders-4">
            <img class="card-img-top photo-card-shop round-borders-7" src="${product.image}" alt="${product.description}">
            <h3>$${product.price.toFixed(3)}</h3>
            <h4 class="card-font-size">${product.name}</h4>
            <a class="btn button-font-size photo-card-shop btn-color2" href="${product.info}">Mas info</a>
            <button class="btn button button-font-size photo-card-shop btn-color" id="${product.id}">Agregar</button>
            </div>

        `;
        container.appendChild(div);
    }
    loadEvents();
}

const getData = async () =>{
    try{
        const response = await fetch('../js/data.json');
        const data = await response.json();
        loadProducts(data);
        Products.push(...data);
    }
    catch(e){
        console.log(e)
    }
}

getData();

