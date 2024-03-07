const urlInput = document.getElementById('url-input')
const urlSaveBtn = document.getElementById('save-url-btn')
const saveTabBtn = document.getElementById('save-tab-btn')
const deleteBtn = document.getElementById('delete-btn')
const leadsList = document.getElementById('leads-list')
let myLeads = []
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('leads'))


if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads)
}


// saveTabBtn.addEventListener('click', function(){
//     chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
//         myLeads.push(tabs[0].url)
//         localStorage.setItem('leads', JSON.stringify(myLeads))
//         renderLeads(myLeads)
//     })
// })

saveTabBtn.addEventListener('click', function(){
    browser.tabs.query({active:true, currentWindow: true}).then(function(tabs){
        myLeads.push(tabs[0].url);
        browser.storage.local.set({'leads': myLeads});
        renderLeads(myLeads);
    });
});


urlSaveBtn.addEventListener('click', function(){
    myLeads.push(urlInput.value)
    urlInput.value = ''
    localStorage.setItem('leads', JSON.stringify(myLeads))
    renderLeads(myLeads)
})
// localStorage.clear()





function renderLeads(arr){
    let urls = ''

    for (let i=0; i<arr.length; i++){
        if (arr[i]){
            urls += `<li><a target='_blank' href="${arr[i]}" >${arr[i]}</a></li>`
        }
        
    }
    leadsList.innerHTML = urls
}



deleteBtn.addEventListener('dblclick', function(){
    localStorage.clear()
    myLeads = []
    renderLeads(myLeads)
})

