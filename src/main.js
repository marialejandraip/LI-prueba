const createPost = document.querySelector('.create');
const modal = document.querySelector("#myModal");
const span = document.getElementsByClassName("close")[0];
const post = document.querySelector('.form-post');
const sharedPost = document.querySelector('.container-created-post');

const form = document.querySelector('.form-post');
const containerPost = document.querySelector('.container-created-post');
const fileImg = document.querySelector('.file-img');
const containerImgModal = document.querySelector('.container-image');
const sortSelect = document.querySelector('sort-select');

const user = 'Nicolás Rojas Nino';
const name = document.querySelector('.name');
const date = document.querySelector('.date');
const text = document.querySelector('.text');


/* const data = [
  {
    date: Date.now(),
    user: "Nicolás Rojas Nino",
    text: "Primer post",
    imagen: "Probablemente"
  }
] */

/* Funcionalidad de Modal */
createPost.addEventListener('click',()=>{
  modal.style.display = "block";
})

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/* Post ya existente */
function renderAsset(txt, dt, nm){
  text.textContent= txt
  date.textContent = dt
  name.textContent = nm
}

fetch('post.json',{
})
.then( res => res.json())
.then( data => {
  renderAsset(data.shared, data.date, data.user)
})

/* Previsualización de la imagen en el modal */
const renderImageModal=(formData)=>{
  const image = formData.get('image')
  const file = URL.createObjectURL(image)
  containerImgModal.setAttribute('src',file)
  containerImgModal.setAttribute('class', 'image-post')
}

fileImg.addEventListener('change',() => {
  const formData = new FormData(form);
  renderImageModal(formData)
})

/* Publicación de post y creación de elementos */
const renderTextnImage = (formData) => {
  const id = formData.get('id')
  const user = formData.get('user')
  const date = formData.get('date')
  const text = formData.get('textarea')
  const image = formData.get('image')
  const file = URL.createObjectURL(image)

  /* Container del post  */
  const containerSharedPost = document.createElement('div')
  containerSharedPost.setAttribute('id', id)
  containerSharedPost.setAttribute('class', 'post-container')

  /* Elementos dentro del container del post */
  const containerUser = document.createElement('h2')
  const containerText = document.createElement('p')
  const containerDate = document.createElement('p')
  const deleteBtn = document.createElement('button')
  deleteBtn.setAttribute('class', 'btn-delete')

  /* Publicar la imagen dentro del container del post */
/*   const containerImage = document.createElement('img');
  containerImage.setAttribute('src',file)
  containerImage.setAttribute('class', 'image-post') */

  containerText.textContent = text
  containerDate.textContent = date
  deleteBtn.textContent ="Eliminar"
  containerUser.textContent = user
  
  containerSharedPost.appendChild(containerUser)
  containerSharedPost.appendChild(containerDate)
  containerSharedPost.appendChild(containerText)
  //containerSharedPost.appendChild(containerImage)
  containerSharedPost.appendChild(deleteBtn)

  containerPost.appendChild(containerSharedPost)
  
  deleteBtn.addEventListener('click', () => {
    containerPost.removeChild(containerSharedPost)
  })
}

const renderImage=(formData)=>{
  const image = formData.get('image')
  const file = URL.createObjectURL(image)
  const containerImage = document.createElement('img');
  containerImage.setAttribute('src',file)
  containerImage.setAttribute('class', 'image-post')
  containerSharedPost.appendChild(containerImage)
}

let data =[]
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  formData.set('date', new Date())
  formData.set('id',Math.random())
  formData.set('user', user);
  renderTextnImage(formData)
  renderImage(formData)
  data.push(localStorage.setItem('formData', JSON.stringify(Object.fromEntries(formData.entries())))) 
  modal.style.display = "none";
  containerImgModal.setAttribute('src',"")
  form.reset();
})

/* Orden de post por fechas */
// sort
sortSelect.addEventListener('change', (e) => {
  const sorting = e.target.value;
  const sortArray = arrayPost.sort((a, b) => b.date - a.date)
  if (sorting === "asc"){
    sortArray
  }else{
    sortArray.reverse()
  }
})
