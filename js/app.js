//Variables 
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click',agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso)

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}

//Funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        // console.log('Agregando al carrito');
        // console.log(cursoSeleccionado);
        leerDatosCurso(curso);

    }   
}

//Lee el contenido del curso a agregar
function leerDatosCurso(curso){
    //Crear objeto con el contenido del curso actual 
    const infoCurso={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1

    }

    //Revisa si un elemento ya existe en el carrito
  
    if(articulosCarrito.some(curso=> curso.id === infoCurso.id)){
        //Actualizamos la cantidad
        const cursos= articulosCarrito.map(curso=> {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso //retorna el objeto actualizado 
            }else{
                return curso
                //retorna los objetos que no son los duplicados
            }
        })

        articulosCarrito=[...cursos];

    }else{
        //Agrega elementos al arreglo de carrito
        articulosCarrito=[...articulosCarrito,infoCurso]

    }

    console.log(articulosCarrito);


//    console.log(articulosCarrito);

   carritoHtml();
}

//Elimina el curso del carrito
function eliminarCurso(e){
    
    e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          const cursoId = e.target.getAttribute('data-id')
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

      console.log(articulosCarrito);
     }
}


//Muestra el carrito de compras en el HTML

function carritoHtml(){

    //Limpiar HTML

 limpiarHTML();


    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach((curso)=>{

        //Destructuring
        const {imagen,titulo,precio,cantidad,id}=curso;
     
        const row= document.createElement('tr')
        row.innerHTML=`
        <td>  
             <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>${curso.cantidad} </td>
        <td>
             <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
   `;

        //Agrega el HTML  del carrito al tbody
        contenedorCarrito.appendChild(row);


    })


}


function limpiarHTML(){
    // Forma lenta
    // contenedorCarrito.innerHTML=''

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}






