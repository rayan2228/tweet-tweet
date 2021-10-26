// selector
let addTweetInputElm = document.querySelector("#addtweetinput")
let addTweetBtnElm = document.querySelector("#addtweetbtn")
let deleteAllBtnElm = document.querySelector("#deleteallbtn")
let tweetListElm = document.querySelector(".list")
let searchBoxElm = document.querySelector("#searchtextbox")
let saveIndexElm = document.querySelector("#saveindex")
let updateTweetBtnElm = document.querySelector("#updatetweetbtn")
let msgElm = document.querySelector(".msg")
let chacheckElm = document.querySelector(".chacheck")
// all even listener
const allEvanListener = () => {
    addTweetBtnElm.addEventListener("click", saveLocalStorage)
    deleteAllBtnElm.addEventListener("click", deleteAll)
    updateTweetBtnElm.addEventListener("click", updateTweet)
    searchBoxElm.addEventListener("input", searchTweet)
    addTweetInputElm.addEventListener("input", checkInput)
}
// show msg
msgElm.innerHTML = "Please Write Something"
// check and save tweet in local storage
const saveLocalStorage = () => {
    addTweetInputElmVal = addTweetInputElm.value
    if (addTweetInputElmVal === "") {
        msgElm.innerHTML = "Please Write Something"
    } else {
        checkLocalStorage = localStorage.getItem("tweetStorage")
        if (checkLocalStorage === null) {
            tweet = []
        } else {
            tweet = JSON.parse(checkLocalStorage)
        }
        const date = new Date().toDateString()
        const hour = new Date().toLocaleTimeString()
        const time = `${date} at ${hour}`
        tweetInner ={
            tweetName : addTweetInputElmVal,
            time
        }
        tweet.push(tweetInner)
        localStorage.setItem("tweetStorage", JSON.stringify(tweet))
        showTweets()
        addTweetInputElm.value = "" 
    }
}

// show tweets
const showTweets = () => {
    checkLocalStorage = localStorage.getItem("tweetStorage")
    if (checkLocalStorage === null) {
        tweet = []
    } else {
        tweet = JSON.parse(checkLocalStorage)
        let tweetList = ""
        tweet.forEach((item, index) => {
            tweetList += `<li><span class="tweet-number">${index + 1}</span><span class="tweet-name">${item.tweetName}</span><span class="tweet-time">${item.time}</span><button type="button" class="edit-tweet" onclick="editTweet(${index})"><i
                class="fas fa-edit"></i>Edit</button><button type="button"
            class="delete-tweet" onclick="deleteTweet(${index})"><i class="fas fa-trash-alt"></i>Delete</button></li>`
            tweetListElm.innerHTML = tweetList
            msgElm.innerHTML = ""
        });
    }
}
// edit task
const editTweet = (index) => {
    checkLocalStorage = localStorage.getItem("tweetStorage")
    tweet = JSON.parse(checkLocalStorage)
    addTweetInputElm.value = tweet[index].tweetName
    saveIndexElm.value = index
    updateTweetBtnElm.style.display = "block"
    addTweetBtnElm.style.display = "none"
    msgElm.innerHTML = ""
}
// update tweet
const updateTweet = () => {
    checkLocalStorage = localStorage.getItem("tweetStorage")
    tweet = JSON.parse(checkLocalStorage)
    saveIndexVal = saveIndexElm.value
    tweet[saveIndexVal].tweetName = addTweetInputElm.value
    localStorage.setItem("tweetStorage", JSON.stringify(tweet))
    showTweets()
    updateTweetBtnElm.style.display = "none"
    addTweetBtnElm.style.display = "block"
    addTweetInputElm.value = ""
}
// delete  tweet
const deleteTweet = (index) => {
    checkLocalStorage = localStorage.getItem("tweetStorage")
    tweet = JSON.parse(checkLocalStorage)
    tweet.splice(index, 1)
    if (tweet.length === 0) {
        tweetListElm.innerHTML = ""
        msgElm.innerHTML = "Please Write Something"
    }
    localStorage.setItem("tweetStorage", JSON.stringify(tweet))
    showTweets()
    addTweetInputElm.value = ""
}
// delete all tweet
const deleteAll = () => {
    checkLocalStorage = localStorage.getItem("tweetStorage")
    if (checkLocalStorage === null) {
        tweet = []
    } else {
        tweet = []
    }
    if (tweet.length === 0) {
        tweetListElm.innerHTML = ""
        msgElm.innerHTML = "Please Write Something"
    }
    localStorage.setItem("tweetStorage", JSON.stringify(tweet))
    showTweets()
    addTweetInputElm.value = ""
}
// search tweet
const searchTweet = () => {
    document.querySelectorAll(".list li").forEach((item) => {
        let text = item.firstElementChild.nextElementSibling.innerText.toLowerCase()
        let searchVal = searchBoxElm.value.toLowerCase()
        if (text.indexOf(searchVal) === -1) {
            item.style.display = "none"
        } else {
            item.style.display = "flex"
        }
    })
}
// check input
const checkInput = () => {
    let valueLength = addTweetInputElm.value.length
    if (valueLength === "" || valueLength >= 250) {
        msgElm.innerHTML = "Not More than 250 Character"
        chacheckElm.innerHTML = `${valueLength}/250`
        chacheckElm.style.color = "red"
    } else if (valueLength < 250) {
        msgElm.innerHTML = ""
        chacheckElm.innerHTML = `${valueLength}/250`
        chacheckElm.style.color = "black"
    }
}

// call all functions
allEvanListener()
showTweets()



