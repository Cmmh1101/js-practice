var notify = document.querySelector('.notify')
var albums = document.querySelectorAll('.album')
var itemsTotal = document.querySelector('.items-total')
var saveBtn = document.querySelector('.button')

var albumsSelected = []
var i = 0

while (i < albums.length) {
    albums[i].onclick = function (e) {
        var albumTitle = this.querySelector('.title').textContent

        if (this.classList.contains('selected') !== true) {
            this.classList.add('selected')
            albumsSelected.push(albumTitle)
            console.log(albumsSelected)
        } else {
            this.classList.remove('selected')
            albumsSelected = albumsSelected.filter(function (item) {
                return item !== albumTitle
            })
        }
    }
    console.log(i)
    i++
}

saveBtn.onclick = function () {
    itemsTotal.textContent = albumsSelected.length + ' items saved'
    notify.classList.add('active')

    setTimeout(function () {
        notify.classList.remove('active')
    }, 2000)

    console.log('saved')
}





// click albun
// show user he selected album so we add a class selectes to the album div  
// create an array and then add the albuns title we selected to that array
// find out the total of the albums selected
// save button is clicked show notification with sabed items total 