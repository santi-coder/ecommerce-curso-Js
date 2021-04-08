//sweetAlert agregar al carrito

$(".agregar-carrito").click(function(){
	
	Swal.fire({
		html:` <p class="sweetAlert"> ¡Buen Provecho! </p>`,
		icon:"success",
		width: "300px",
		background: "rgba(0, 0, 0, .8)",
		backdrop: false,
		timer:1000,
		toast:true,
		position:"bottom",
		showConfirmButton: false,
	});
})

