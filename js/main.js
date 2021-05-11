let urlCategories = "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=B1kAMcnaIU28VqMqCKzc2tt6gAZHKnec"
let urlCategoriesArray = [];

let acumulador = ``;
let collapse = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Teen"];
let tituloIngresado;

function buscarPorTitulo(categoria){

    fetch(urlCategoriesArray[categoria])
        .then(response => response.json())
        .then(data => {
            
            tituloIngresado = document.getElementById(collapse[categoria]).value.toUpperCase();

            const resultadosFiltrado =  data["results"]["books"].filter(libro => libro.title.includes(tituloIngresado.toUpperCase()));
            
            let acumuladorResultados = ``;
            
            resultadosFiltrado.forEach(libro => {
                
                acumuladorResultados += ` 
                <a href="https://www.google.com/search?q=${libro.title}+${libro.author}" class="card-link col-3">
                    <div class="card resultadobusqueda">
                        <div class="card-body">
                            <h5 class="card-title">${libro.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${libro.author}</h6>
                            <p class="card-text">${libro.description}</p>
                        </div>
                    </div>
                </a>`
                
                if(document.getElementById("resultadoBusqueda")){
                        document.getElementById("resultadoBusqueda").innerHTML = acumuladorResultados;
                }         
        });
    });
}


fetch(urlCategories)
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < 10; i++){

            urlCategoriesArray.push(`https://api.nytimes.com/svc/books/v3/lists/current/${data["results"][i].list_name_encoded}.json?api-key=B1kAMcnaIU28VqMqCKzc2tt6gAZHKnec`);

            acumulador +=`
            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="heading${collapse[i]}">
                    <h2 class="mb-0">
                        <button class="btn btn-link btn-block text-center" type="button" data-toggle="collapse" data-target="#collapse${collapse[i]}" aria-expanded="true" aria-controls="collapse${collapse[i]}">
                        ${data["results"][i].list_name}
                        </button>
                    </h2>
                    </div>       
                    <div id="collapse${collapse[i]}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div class="card-body">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Ingrese un titulo</span>
                                </div>
                                <input type="text" aria-label="titulo" placeholder="Buscar todos"class="form-control" id="${collapse[i]}">
                                <a href="#resultadoBusqueda">
                                <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onclick="buscarPorTitulo(${i})">Buscar</button></a>
                            </div>
                            
                    </div>
                </div>
            </div>
            `
        }

        if(document.getElementById("categorias")){
            document.getElementById("categorias").innerHTML = acumulador;
        }
    })
