
const productsForm = document.getElementById('productsForm')
const updateBtn = document.getElementsByClassName('updateBtn')
const deleteBtn = document.getElementsByClassName('deleteBtn')
const buyBtn = document.getElementsByClassName('buyBtn')
const cartLinkSpan = document.getElementsByClassName('cartLinkSpan')

// Evento nuevo ingreso de producto al servidor
productsForm.addEventListener('submit', (e) => {
    e.preventDefault()
    newProduct = {
        product: productsForm[0].value,
        price: productsForm[1].value,
        stock: productsForm[2].value,
        description: productsForm[3].value,
        code: productsForm[4].value,
        thumbnail: productsForm[5].value
    }
    fetch('/api/productos/',
        {
            method: 'POST',
            body: JSON.stringify(newProduct),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(res => {
        document.location.reload()})
    // Reset del form luego del ingreso
    productsForm.reset()
})

// Evento para mostrar contenido carrito al cargar ventana actual
window.addEventListener('load', () => {
    fetch('/api/carrito/63d88079a8cac0b4e425291f/productos')
    .then(res => res.json())
    .then(cart => {
        let prodsQty = []
        cart === null ? true : prodsQty = cart.productos
        cartLinkSpan[0].innerHTML = `: ${prodsQty.length} PRODUCTO(S)`
    })
})

// Evento borrar producto
for (let i=0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', () => {
        productId = updateBtn[i].parentElement.previousElementSibling.childNodes[1].id
        fetch(`/api/productos/${productId}`,
            {
                method: 'DELETE'
            }
        ).then(res => res.json()).then(json => {
            console.log(json)
            document.location.reload()})
    })
}

// Evento modificar producto
for (let i=0; i < updateBtn.length; i++) {
    updateBtn[i].addEventListener('click', () => {
        productId = updateBtn[i].parentElement.previousElementSibling.childNodes[1].id
        productToUpdate = {
            product: updateBtn[i].parentElement.parentElement.childNodes[1].value,
            price: updateBtn[i].parentElement.parentElement.childNodes[3].childNodes[3].value,
            stock: updateBtn[i].parentElement.parentElement.childNodes[9].childNodes[3].value,
            description: updateBtn[i].parentElement.parentElement.childNodes[7].value,
            code: updateBtn[i].parentElement.parentElement.childNodes[13].value,
            thumbnail: updateBtn[i].parentElement.parentElement.childNodes[5].childNodes[1].src
        }
        fetch(`/api/productos/${productId}`,
            {
                method: 'PUT',
                body: JSON.stringify(productToUpdate),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(res => res.json()).then(json => {
            console.log(json)
        })
    })
}

// Evento comprar producto
for (let i=0;i < buyBtn.length;i++) {
    buyBtn[i].addEventListener('click', () => {
        // fetch para traer todos los productos en route auxiliar arrayproductos
        fetch('/api/productos/arrayproductos').then(res => res.json())
        .then(productos => {
            const selectedProduct = productos.find(product => product.id === buyBtn[i].id)
            // Fetch para agregar producto comprado al carrito
            fetch(`/api/carrito/63d88079a8cac0b4e425291f/productos/${buyBtn[i].id}`,
                {
                    method: 'POST',
                    body: JSON.stringify(selectedProduct),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            .then(res => res.json()).then(cart => {
                const prodsQty = cart.productos.length
                cartLinkSpan[0].innerHTML = `: ${prodsQty} PRODUCTO(S)`
            })
        })
    })
}