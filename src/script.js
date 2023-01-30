import { format, compareAsc,  differenceInDays } from "date-fns"
import fi from "date-fns/esm/locale/fi/index.js"
import { Result } from "postcss"
import { check } from "prettier"

async function loadTours() {
    const responsel = await fetch(
        "https://www.bit-by-bit.ru/api/student-projects/tours"
    )
    const dataTyrs = await responsel.json()
    return dataTyrs
}

function renderTyr(tours) {
    /*добавление туров в карточки*/
    let container = document.getElementById("container")
   
    container.innerHTML = ""
    if(!tours || tours.length === 0){
        container.innerHTML = `
        <div class= "">
        </div>
        <div>
        <p class = "text-xl text-center lg:text-3xl"> Туры не найдены </p>
        <p class = "text-base text-center lg:text-xl">измените параметры поиска</p>
        </div>
        `  
    } else{

    
    tours.forEach((tyr) => { 
        const city = checkCity(tyr)
        container.innerHTML += `
     
        <div class="gap-10 rounded-md">
        <div class="bg-gray-50 shadow-lg rounded-md px-4 py-2 h-[550px] md:h-[600px] w-[300px] flex flex-col justify-between box px-4 m-auto  " >
            <div class ="h-[300px]">
                <div class="flex flex-col justify-end">
                <div class="flex flex-col justify-end">
                        <img
                                src="${tyr.image}"
                                alt=""
                                class="rounded-md w-42 h-48"
                            
                                />
                            
                    
                        <span class="absolute text-white pb-2 pl-2 flex row "
                                >${tyr.rating}
                                <img src="https://cdn2.iconfinder.com/data/icons/onebit/PNG/onebit_46.png" alt="" class=" w-5 ml-1">
                                
                        </span>
                </div>
                    
                    <p class="text-cyan-900 text-sm pt-4 font-serif hover:underline cursore  max-[400px]: text-lg">
                    ${tyr.country}
                    ${city}
                    </p>
                    <h2 class="text-xl pb-3 font-serif font-semibold text-gray-900 max-[400px]: text-xl">
                    ${tyr.hotelName} 
                    </h2>
                </div>
            </div>
                <div>
                
                        <p class="text-cyan-900 text-lg  lg:text-base pt-4 font-serif font-mono hover: cursore pointer">
                                ${format(new Date(tyr.startTime),"dd/MM/yyyy")} 
                                до ${format(new Date(tyr.endTime), "dd/MM/yyyy")}
                                <p class="text-lg  lg:text-sm text-cyan-900 pt-1 font-serif font-mono">Продолжительность тура:
                                <br> ${
                                    differenceInDays(
                                    new Date(tyr.endTime),
                                    new Date(tyr.startTime)
                                    
                                )}
                                дней </p>
                        </p>
                        <p
                    class="text-cyan-900 text-xl lg:text-base  pt-4 pb-2 font-serif hover:underline cursore"
                >
                ${tyr.price} рублей
                </p>
                </div>
                

            <div class="flex flex-col lg:w-60 md:w-60  sm: mx-auto justify-end ">

                <button class="text-sm font-serif text-gray-600 border-solid border-2 rounded-sm border-cyan-900 px-2 py-1 mb-2 hover:bg-cyan-800 hover:text-white" id="infoButton">
                Подробнее
                </button>  
                    
                    
                <button
                    class="text-sm font-serif text-gray-600 border-solid border-2 rounded-sm border-cyan-900 px-2 py-1 hover:bg-cyan-800 hover:text-white"
                    id="selectedButton-${tyr.id}"
                    >
                    Добавить в избранное
                </button>
                <button
                    class="text-sm font-serif text-gray-600 border-solid border-2 rounded-sm border-cyan-900 px-2 py-1 mt-2 hover:bg-cyan-800 hover:text-white"
                    id="bookingButton-${tyr.id}"
                    >
                    Забронировать
                </button>

            </div>
        </div>
     `
    })
    }
    tours.forEach((tyr) =>{
        document.getElementById(`selectedButton-${tyr.id}`).addEventListener('click', () => {
            let selectedID = tyr.id
            console.log(selectedID)
            let selectedTour = tours.find((tyr) =>{
                if (tyr.id === selectedID){
                    selectedTours.push(tyr)
                    console.log(selectedTours)
                }
              })
        })
    })
    
}

window.onload = function () {
    document.querySelector(".preloader").classList.add("preloader-remove")
}
$(window).on("load", function () {
    $(".preloader").addClass("preloader-remove")
})

$(window).on("load", function () {
    $(".preloader").addClass("preloader-remove")
})

/*сортировка*/
function mySort (tour){
    let sortTours = tours.sort
    console.log(tours)
}



/*function mySort(){
    let container = document.getElementById("container")
    for (let i=0; i< container.children.length; i++){
        for (let j=i; j< container.children.length; i++){
            if (+container.children[i].getAttribute('data-price') > +container.children[j].getAttribute('data-price')){
                replacedNode = container.replaceChild(container.children[j], container.children[i])
                insertAfter(replacedNode, container.children[i])
            }
        }
    }
}
function insertAfter (elem, refElem){
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling)
}*/

function addListener(tours) {
    tours.forEach((t) => {
        const priceButton = document.getElementById(`priceButton-${t.id}`)
        priceButton.addEventListener("click", () => test(t))
    })
    const sortMinButton = document.getElementById("sortMinButton")
    sortMinButton.addEventListener("click", () => mySort())
    bookingButton.addEventListener('click', function(){
        openModal()
    })
    

}
/*фильтрация*/
document.querySelector('nav').addEventListener('click', event => {
    if( event.target.tagName !== "LI") return false
    let filterClass = event.target.dataset['f'] /*определяет значение страны*/
    

    const filteredTours = tours.filter(tour  => tour.country === filterClass)
        if (filterClass=== 'All') {
        renderTyr(tours)
        addListener(tours)  
        }
        else{
        renderTyr(filteredTours)
        addListener(filteredTours)  
        }
    
    
})

/*проверка города*/
function checkCity(tyr){
    let city
    if( tyr.city &&  tyr.city.length > 0){
        city = tyr.city
    } else{
        city = '' 
    }
    return city
}

/*поиск*/
let inputText = document.getElementById('inputText')
let submitForm = document.getElementById('submitForm')

function search (text){
    let searchTours = []
    text = text.toLowerCase()
    tours.forEach((tyr) =>{
        
     
        if ( tyr.cit && tyr.city.length > 0 && tyr.city.toLowerCase().includes(text) || tyr.country.toLowerCase().includes(text) ){
            searchTours.push(tyr) 
        }
        
    
    })
    if(searchTours.length > 0){
      renderTyr(searchTours)
      text = ''
      

    }
    else{
        renderTyr()
        //const massge = 'Туры не найдены'
        //alert(massge)
    }
    
}

inputText.addEventListener ('input', (e)=>{
    search(inputText.value)
})
/**/ 

/*выпадающий список*/
let select = document.querySelector('select')
let filterButton = document.getElementById('filterButton')
select.addEventListener('change', function(){
    console.log(select.value)
    let filterTours = []
    tours.forEach((tyr) =>{
     
        if ( tyr.rating >= select.value ){
            filterTours.push(tyr) 
        }
        
    
    })
    if(filterTours.length > 0){
      renderTyr(filterTours) 
      openFilter() 
    }
    else{
        const massge = 'Туры не найдены'
        alert(massge)
        openFilter()
        /*нужно доработать*/
    }   
})
/**/ 
/*фильтр по цене*/
function filterByPrice(tours){
    let price = document.getElementById('price').value
    document.getElementById('toSee').innerHTML = ''
    document.getElementById('toSee').innerHTML +=
    `
<div class="">Вы выбрали цену  ${price} рублей </div>
    `
const filtered = tours.filter((tour) =>{
    return tour.price <=price
})
renderTyr(filtered)
}
document.getElementById('price').addEventListener('change', function(){
    filterByPrice(tours)
})
/**/ 
/*функция отрытия и закрытия блока с фильтрами*/
let filterBox = document.getElementById('filterBox')
let filterB = document.getElementById('filterB')
function openFilter(){
    if(filterBox.classList.contains("flex")){
        filterBox.classList.remove("flex");
        filterBox.classList.add("hidden");
    } else{
        filterBox.classList.remove("hidden");
        filterBox.classList.add("flex");
    }
}
filterB.addEventListener('click', function(){
    openFilter()
})
/**/
/*функция открытия и закрытия модального окна*/
let bookingButton = document.getElementById('bookingButton-${tyr.id}')
console.log(bookingButton)
let modal = document.getElementById('modal')
function openModal(){
    if(modal.classList.contains("flex")){
        modal.classList.remove("flex");
        modal.classList.add("hidden");
    } else{
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    }
}

/* */
/*добавление в избранное*/
const selectedTours = [] /*массив с выбранными турами*/
document.getElementById('selected').addEventListener('click', function(){
    renderTyr(selectedTours)
})
document.getElementById('allTours').addEventListener('click', function(){
    renderTyr(tours)
}) /*но если я сразу нажму при загрузке страницы, то не сработает*/
/**/

let tours
async function initApp() {
    tours = await loadTours()
    renderTyr(tours)
    addListener(tours)  
}

initApp()


