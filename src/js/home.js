
const btnEmpezar = document.getElementById(`btnAgregar`)
const input = document.getElementById('input')
btnEmpezar.addEventListener('onclick', extraeTarea);
let html = '';

traerTareas()
function traerTareas() {
  const tareasLocales = window.localStorage.getItem('tarea')

  if (tareasLocales === null || tareasLocales == '[]' ) {
    tareas = []
    html = ''
    // debugger
    agregarTarea()
    // listContainer.innerHTML = html
  } else {
    tareas = JSON.parse(tareasLocales) //tareas tambien es global
    html = ''
    // debugger
    console.log(tareasLocales);
    tareas.forEach((item, index) => {
      agregarTarea(item, index);
    });
  }
}

function extraeTarea() {
  inputValue = input.value //inputValue es variable global
  if (inputValue.trim()!=0) { //con este if evitamos ingresar tareas vacias
    tareas.push({'tareaPendiente':inputValue, 'status':false})
    window.localStorage.setItem('tarea', JSON.stringify(tareas))
    agregarTarea(tareas[tareas.length-1], tareas.length-1)    
    // traerTareas()
    input.value = ''
  }
}

function agregarTarea(tarea, index) {
  const $listContainer = document.getElementById('list')
  if (tarea != null) { 
    console.log($listContainer);
    html += templateTarea(tarea, index);
    // console.log(HTMLString);
    // const elemento = createTemplate(html)
    // $listContainer.append(elemento);
    $listContainer.innerHTML = html
    // guardaTarea(tarea);
  }
  $listContainer.innerHTML = html
  
}

// function createTemplate(HTMLString) {
//   /**Creación de DOM */
//   const html = document.implementation.createHTMLDocument(); // Crea dentro de memoria de javascript un elemento html
//   html.body.innerHTML = HTMLString //html seria como un selector, innerHTML nos sirve para madarle html al elemento
//   // debugger
//   return html.body.children[0];
//  /**Creación de DOM */
// }

function templateTarea(tarea, index) {
  return (
    `
    <li>
        <button class="checkbox ${tarea.status}Button" id="myCheck" onclick="estadoTarea(${index})">✓</button>
        <button class="${tarea.status}">${tarea.tareaPendiente}</button>
        <button class="delete" onclick="deleteTarea(${index})">X</button>
      </li>
    `
  )
}

function deleteTarea(index){
    let webtask = localStorage.getItem('tarea');
    let taskObj = JSON.parse(webtask);
    // console.log(index);
    taskObj.splice(index, 1);
    localStorage.setItem('tarea', JSON.stringify(taskObj));
    traerTareas()
}

function estadoTarea(index) {
  let webtask = localStorage.getItem('tarea');
  let taskObj = JSON.parse(webtask);
  console.log(typeof(taskObj[index].status));
  if(taskObj[index].status == false){
    taskObj[index].status = true
    localStorage.setItem('tarea', JSON.stringify(taskObj));
    console.log(tareas);
    // debugger
    traerTareas()
  } else {
    // debugger
    taskObj[index].status = false
    localStorage.setItem('tarea', JSON.stringify(taskObj));
    console.log(tareas);
    traerTareas()
  }
}
