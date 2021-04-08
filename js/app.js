const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const listaProductos = document.querySelector("#lista-productos");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

let articulosCarrito = [];



listaProductos.addEventListener("click", agregarProducto);
carrito.addEventListener("click", eliminarProducto);
vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
carrito.addEventListener("click", sumarProducto)


document.addEventListener("DOMContentLoaded", guardarEnStorage);


function guardarEnStorage (){
	articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
	insertarProducto();		

}


function vaciarCarrito(){
	borrarHTML();
	articulosCarrito = [];
	guardarStorage();
}


function agregarProducto(e){
	e.preventDefault();
	if (e.target.classList.contains("agregar-carrito")) {
		const productoSeleccionado = e.target.parentElement.parentElement;

		obtenerDatosProductos(productoSeleccionado);
	
	};
}


function eliminarProducto(e){
	e.preventDefault();
	if(e.target.classList.contains("borrar-producto")){
	const productoid = e.target.getAttribute("data-id");

	articulosCarrito=articulosCarrito.filter(producto=> producto.id !== productoid);
	insertarProducto();
	guardarStorage();
	}
}


function obtenerDatosProductos(producto) {

	const productoAgregado = {
		imagen: producto.querySelector(".imgMenuComidas img").src,
		nombre: producto.querySelector(".textMenu h1").textContent,
		precio: producto.querySelector(".textMenu p").textContent,
		id: producto.querySelector(".textMenu a").getAttribute("data-id"),
		cantidad: 1
	}

	const existe = articulosCarrito.some( function (producto) {
		return producto.id === productoAgregado.id;
	}) 	

	if(existe){
		const productos = articulosCarrito.map(producto =>{
			if(producto.id === productoAgregado.id) {
				producto.cantidad++;
				//producto.precio = Number(productoAgregado.precio.slice(1))*producto.cantidad;
				return producto;
			}else{
				return producto;
			}
		});

		articulosCarrito = [...productos];
	} else {
		articulosCarrito = [...articulosCarrito, productoAgregado];
	}

	insertarProducto()
	console.log(articulosCarrito);
}


function insertarProducto(){
	
	borrarHTML();

	articulosCarrito.forEach(producto=>{
		const{nombre, imagen, precio, cantidad, id } = producto;

		const row = document.createElement("tr");
		row.innerHTML = `
		<td>
			<img src="${imagen}" width=90>
		</td>
		<td>
			${nombre}
		</td>
		<td>
			${precio}
		</td>
		<td>
			${cantidad}
		</td>
		<td>
			<a href="#" class="sumar-producto" data-id="${id}" id="estiloBotonesRow"> + </a>
		</td>
		<td>
			<a href="#" class="restar-producto" data-id="${id}" id="estiloBotonesRow"> - </a>
		</td>
		<td>
			<a href="#" class="borrar-producto" data-id="${id}" id="estiloBotonesRow"> x </a>
		</td>

	` 
	contenedorCarrito.appendChild(row);
	});
	guardarStorage();
	actualizarTotal()
}




function guardarStorage(){
		localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
	}


function borrarHTML() {
	while(contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild)
	}
}


//aumentar y disminuir cantidad desde boton + y - 

function sumarProducto(e){
	
		if (e.target.attributes[1].nodeValue === "sumar-producto") {
		articulosCarrito.forEach(producto=>{
			if (producto.id == e.target.attributes[2].value){
				producto.cantidad ++
			}
		})
	} else {
			articulosCarrito.forEach(producto=>{
				if (producto.id == e.target.attributes[2].value){
					producto.cantidad --
	        }
	        if(producto.cantidad == 0){
	        	articulosCarrito.splice(articulosCarrito.indexOf(producto),1)
	        }	        
	    })
    } insertarProducto()
}


//actualizar el precio total 

function actualizarTotal(){
	let total = 0;
	const montoTotal= document.querySelector(".montoTotal");
	
	 articulosCarrito.forEach(producto=>{
	
	let cantidad =  Number(producto.cantidad)
	let precio = Number(producto.precio.slice(1))

	total= total + precio*cantidad;
	//console.log(total) 
	});
	montoTotal.innerHTML = ` Total: $ ${total} `

}



//transition jquery sobre imagenes 

$(document).ready(function(){
    $('.zoom').hover(function() {
        $(this).addClass('transition');
    }, function() {
        $(this).removeClass('transition');
    })
})
