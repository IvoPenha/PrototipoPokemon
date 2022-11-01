const main = document.querySelector('.main')
const button = document.querySelectorAll('button')

function addDiv(name, image, id){
    const div = (document.createElement('div'))
    const h1 = (document.createElement('h1'))
    const info = document.createElement('div')
    const imgMask = document.createElement('div')
    const span =(document.createElement('span'))
    const img = (document.createElement('img'))
    info.classList.add('info')
    div.className = 'pokemon'
    imgMask.className='img-mask'
    info.appendChild(h1)
    info.appendChild(span)
    div.appendChild(info)
    div.appendChild(imgMask)
    imgMask.appendChild(img)
    if (id<10)
        id = '00'+id
    else if(id<100)
        id= '0' + id
    span.innerText = '#' + id
    h1.innerText= name
    img.src = image
    return div
}

async function fetchImage(item){
    const image = await fetch(item.url)
    .then(r=>r.json())
    .then(pokemon =>{ 
         main.append(addDiv((pokemon.name), (pokemon.sprites.front_default), pokemon.id))
    })

}
function initAPI(){
fetch('https://pokeapi.co/api/v2/pokemon')
.then(r=> r.json())
.then(pokemon => {
    pokemon.results.forEach( (item) => {
        fetchImage(item)
     })
    
    })
    button.forEach(
        item=>item.classList.toggle('inativo')
    )
}
let i =20
function nextAPI(){
    fetch('https://pokeapi.co/api/v2/pokemon?offset='+i+'&limit=20')
    .then(r=> r.json())
    .then(pokemon => {
        pokemon.results.forEach( (item) => {
            fetchImage(item)
         })
        
        })
    i+=20
}

button[1].addEventListener('click', nextAPI)


button[0].addEventListener('click', 
initAPI)
const up = document.querySelector('.up')
const html = document.querySelector('html')
up.addEventListener('click', ()=> {
    window.scrollTo(0,0)
    up.classList.add('inativo')
})
window.addEventListener('scroll', (event)=>{
    window.pageYOffset>=700 && up.classList.remove('inativo')
})
