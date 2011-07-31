#_CanHaz.js
## Js templates based on Underscore.js (and inspired on ICanHaz)

###Dependencies:
* Jquery
* Undescore.js

It looks similar to andyet's [ICanHaz.js](http://icanhazjs.com/) (It's inspired on it), but uses the [Underscore.js](http://documentcloud.github.com/underscore/) template instead of Mustache.js

###Usage

You can call the template like:

     _chz.template_name(obj, options) #or
     _chz["template_name"](obj, options)


The default options are:
    {
      raw: false, #return the html as an Jquery obj
      cache: true #cache the template based on the obj passed to it
     }

_Probably you are using Jquery and Underscore already, right?_

Check the demo.

__Licensed under LGPL__

