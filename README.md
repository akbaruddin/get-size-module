# getSizeModule

Get the size of elements.

``` js
var size = getSize( elem );
// elem can be an element
var size = getSize( document.querySelector('.selector') )
// elem can be a selector string
var size = getSize('.selector')
```

Returns an object with:

+ width, height
+ innerWidth, innerHeight
+ outerWidth, outerHeight
+ paddingLeft, paddingTop, paddingRight, paddingBottom
+ marginLeft, marginTop, marginRight, marginBottom
+ borderLeftWidth, borderTopWidth, borderRightWidth, borderBottomWidth
+ isBorderBox

Browser support: Chrome 51+, Firefox 50+, Edge 12+, Safari 10+,

## Install

npm: `npm install get-size-module`

Yarn: `yarn add get-size-module`

## MIT License

getSize is released under the MIT License. Have at it.
