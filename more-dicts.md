# How to add more dictionaries?
More dictionaries are needed, or maybe not just dictionaries, any usefull website could be added, such as wikipedia, google or bing.

Two ways to add a website:   
First, for development and testing, try by code, but it's not permanent.  
Second, send me a pull request on github.

## By code 
At the settings page, open chrome's devtool, use function like this:

```
addExtraDict(
    {
        dictName: 'Google Search', 
        windowUrl: 'https://www.google.com/search?q=<word>', 
        css: '#searchform,#top_nav {display: none;}'
    }
)
```
**The "css" code is to hide the website's original search form, and to make it more adapted to this app. It will be injected to the target website to make it work.**

Then the new dictionary "Google Search" will appear as the last item of the dictionaries list.  
Click it to open and try.  
Note this is not permanent, after you restart this extension, it will be gone.

## Pull request

Please clone this project, and edit [extra-dicts.json](src/resources/extra-dicts.json) to add the extra dictionary.

Current example:

```
{
  "extra": [
    {
      "dictName": "Bing Image",
      "windowUrl": "https://www.bing.com/images/search?q=<word>",
      "css": "header,#miniheader {display: none !important;} body {margin-top: 50px !important;}"
    }
  ]
}
```
`dictName`: unique dictionary name;  
`windowUrl`: note the placeholder `<word>` is necessary;  
`css`:  "css" code is to hide the website's original search form, and to make it more adapted to this app.   
