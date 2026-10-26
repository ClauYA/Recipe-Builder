const btnDelete = document.getElementsByClassName("btn-delete");
const btnEdit = document.getElementsByClassName("btn-edit");
const cuadroDeDialogo =  document.getElementById('dialog-edit-recipe');
const formEditMenu = document.getElementById('form-edit-recipe');

//editar en cuadro de dialogo
Array.from(btnEdit).forEach(function(element) {
     element.addEventListener('click', async () => {
        try {
          //aca para editar traemos directamente desde la db ya tengo mi getOneRecipe
          const res = await fetch(`/recipes/${element.dataset.id}`)
          if (!res.ok) throw new Error("Couldn't load recipe")
          const recipe = await res.json()
          console.log([...formEditMenu.elements].map(el => el.name))
          formEditMenu.elements.recipeId.value = recipe._id
          formEditMenu.elements.title.value = recipe.title
          formEditMenu.elements.description.value = recipe.description ?? ''
          formEditMenu.elements.category.value = recipe.category
          formEditMenu.elements.servings.value = recipe.servings
          formEditMenu.elements.preptime.value = recipe.preptime
          formEditMenu.elements.cooktime.value = recipe.cooktime
          formEditMenu.elements.difficulty.value = recipe.difficulty
          formEditMenu.elements.instructions.value = recipe.instructions ?? ''
          cuadroDeDialogo.showModal()
     }catch(err){
      alert(err.message)
     }
     })
});
//este es mi boton para la cancelacion del update en el cuadro de dialogo
document.getElementById('edit-cancel').addEventListener('click', () => cuadroDeDialogo.close());


formEditMenu.addEventListener('submit', async function (e) {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(formEditMenu))
  const id = data.recipeId
  delete data.recipeId
  data.servings = Number(data.servings)
  data.preptime = Number(data.preptime)
  data.cooktime = Number(data.cooktime)

  try {
    const respuesta = await fetch(`/recipes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!respuesta.ok) throw new Error("Couldn't update")
    window.location.reload()
  } catch (err) {
    console.error(err.message)
    alert(err.message)
  }
})



//eliminar menu works
Array.from(btnDelete).forEach(function(element) {
      element.addEventListener('click', async function(){
        if (!confirm('Delete this menu?')) return
        try{
          const respuesta = await fetch(`/recipes/${element.dataset.id}`, {
          method: 'delete'})
          if(!respuesta.ok) throw new Error("Couldn't delete")
            window.location.reload()
        }catch(err){
          console.error(err.message)
          
        }
      })
});



var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        //const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        //const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
        //console.log(thumbUp)
        const manitoArriba=Number(element.dataset.like)
        console.log(manitoArriba)
        fetch('/messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':manitoArriba
          })
        })
        .then(response => {
          if (response.ok) console.log(response.json()) 
        })
        .then(data => {
          console.log(data)
          window.location.reload();
        })
        .catch(error => console.error(error));
      });
});
//thumbs down
Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        //const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        const manitoAbajo = Number(element.dataset.unlike)

         console.log(manitoAbajo)
        fetch('/manitoAbajo', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbDown':manitoAbajo
            
          })
        })
        .then(response => {
          if (response.ok) console.log(response.json()) 
        })
        .then(data => {
        //  console.log(data)
        //  console.log(data.thumbUp)
        //  console.log(data.thumbDown)
          window.location.reload(true)
        })
      });
});
Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
