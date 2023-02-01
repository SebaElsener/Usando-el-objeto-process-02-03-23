const products = document.getElementsByClassName('products')
const deleteProductBtn = document.getElementsByClassName('deleteProductBtn')
const deleteCartBtn = document.getElementsByClassName('deleteCartBtn')

// Evento vaciar carrito
deleteCartBtn[0].addEventListener('click', () => {
    fetch('/api/carrito/63d88079a8cac0b4e425291f', { method: 'DELETE'})
    .then(res => res.json())
    .then(json => {
        console.log(json)
        document.location.reload()
    })
})

// Evento borrar producto según su id
for (let i=0;i < deleteProductBtn.length;i++) {
    deleteProductBtn[i].addEventListener('click', () => {
        fetch(`/api/carrito/63d88079a8cac0b4e425291f/productos/${deleteProductBtn[i].id}`, { method: 'DELETE'})
        .then(res => res.json())
        .then(cart => {
            const cartProds = cart.productos.map(product => {
                    return `<div class='productDiv'>
                                <div class='productContainer'>
                                    <p class='productContainerP'><span class='productContainerSpan'>Producto: </span>${product.product}</p>
                                    <p class='productContainerP'><span class='productContainerSpan'>Precio: </span>$${product.price}</p>
                                    <p class='productContainerP'><span class='productContainerSpan'>Descripción: </span>${product.description}</p>
                                    <p class='productContainerP'><span class='productContainerSpan'>Stock: </span>${product.stock}</p>
                                </div>
                                <div class='thumbnailContainer'>
                                    <img class='thumbnail thumbnailImg' src='${product.thumbnail}' alt='imagen producto' width='60px'>
                                </div>
                                <div class='deleteProductBtnContainer'>
                                    <button class='deleteProductBtn' id='${product.id}'>Eliminar</button>
                                </div>
                            </div>
                            `
            })
            products[0].innerHTML = cartProds.join('') || `<p class='emptyCart'>Carrito vacío</p>`
            document.location.reload()
        })
    })
}