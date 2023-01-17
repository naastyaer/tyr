import { format, compareAsc,  differenceInDays } from "date-fns"
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
    tours.forEach((tyr) => { 
        const city = checkCity(tyr)
        container.innerHTML += `
     
        <div class="gap-8 rounded-md">
        <div class="bg-gray-50 shadow-lg rounded-md px-4 py-2 h flex flex-col justify-between box" >
            <div>
                <div class="flex flex-col justify-end">
                <div class="flex flex-col justify-end">
                        <img
                                src="${tyr.image}"
                                alt=""
                                class="rounded-md  w-96 h-48"
                            />
                            
                    
                        <span class="absolute text-white pb-2 pl-2 flex row"
                                >${tyr.rating}
                                <img src="https://cdn2.iconfinder.com/data/icons/onebit/PNG/onebit_46.png" alt="" class=" w-5 ml-1">
                                
                        </span>
                </div>
                    
                    <p
                class="text-cyan-900 text-sm pt-4 font-serif hover:underline cursore">
            ${tyr.country}
            ${city}
            </p>
                        <h2
                            class="text-xl pb-3 font-serif font-semibold text-gray-900" 
                            
                        >
                        ${tyr.hotelName} 
                        </h2>
                    

                    

                    
                </div>
            </div>
                <div>
                
                        <p class="text-cyan-900 text-base pt-4 font-serif font-mono hover: cursore pointer">
                                ${format(new Date(tyr.startTime),"dd/MM/yyyy")} 
                                до ${format(new Date(tyr.endTime), "dd/MM/yyyy")}
                                <p class="text-sm text-cyan-900 pt-1 font-serif font-mono">Продолжительность тура:
                                <br> ${
                                    differenceInDays(
                                    new Date(tyr.endTime),
                                    new Date(tyr.startTime)
                                    
                                )}
                                дней </p>
                        </p>
                        <p
                    class="text-cyan-900 text-sm pt-4 font-serif hover:underline cursore"
                >
                ${tyr.price} рублей
                </p>
                </div>
                

            <div class="flex flex-col w-60 mx-auto justify-end">

            <button class="text-sm font-serif text-gray-600 border-solid border-2 rounded-sm border-cyan-900 px-2 py-1 mb-2 hover:bg-cyan-800 hover:text-white" id="infoButton">
            Подробнее
            </button>  
                
                
                <button
                    class="text-sm font-serif text-gray-600 border-solid border-2 rounded-sm border-cyan-900 px-2 py-1 hover:bg-cyan-800 hover:text-white"
                    id="priceButton-${tyr.id}"
                    >
                    Добавить в избранное
                </button>
                
                <div
                    class="flex flex-row w-60 justify-between pt-2"
                >
                    
                </div>
            </div>
        </div>
     `
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
    tours.forEach((tyr) =>{
     
        if ( tyr.city && tyr.city.length > 0 && tyr.city.includes(text) || tyr.country.includes(text) ){
            searchTours.push(tyr) 
        }
        
    
    })
    if(searchTours.length > 0){
      renderTyr(searchTours)  
    }
    else{
        const massge = 'Туры не найдены'
        alert(massge)
    }
    
}

inputText.addEventListener ('change', (e)=>{
    search(inputText.value)
})
/**/ 


let tours
async function initApp() {
    tours = await loadTours()
    renderTyr(tours)
    addListener(tours)  
}

initApp()


