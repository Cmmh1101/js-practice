let count = 0

const value = document.querySelector("#value")
const increase = document.querySelector(".increase")
const reset = document.querySelector(".reset")
const decrease = document.querySelector(".decrease")

increase.addEventListener("click", function(e){
    const action = e.currentTarget.classList;
    if(action.contains("increase")){
        count++
    }
    value.textContent = count
})

decrease.addEventListener("click", function(e){
    const action = e.currentTarget.classList;
    if(action.contains("decrease")){
        count--
    }
    value.textContent = count
})

reset.addEventListener("click", function(e){
    const action = e.currentTarget.classList;
    if(action.contains("reset")){
        count = 0
    }
    value.textContent = count
})