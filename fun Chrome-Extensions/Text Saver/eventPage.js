var menuItem = {
    "id": "Savetext-1",
    "title": "Save Text",
    "contexts": ["selection"]
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){   
    if (clickData.menuItemId == "Savetext-1" && clickData.selectionText){
        chrome.storage.sync.get(['text'], function(result) {
            if(result.text == null){
                chrome.storage.sync.set({text : [clickData.selectionText]}, function(){
                    
                });
            }else{
                chrome.storage.sync.set({text : result.text.concat(clickData.selectionText)}, function(){

                });
            }
        });

    }

});

chrome.contextMenus.create({
    id: 'show-settings', // or any other name
    title: 'Saved Items',
    contexts: ['page_action', 'browser_action']
});
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId == 'show-settings') {
        chrome.tabs.create({
            url: chrome.runtime.getURL('Options.html')
        });
    }
});

