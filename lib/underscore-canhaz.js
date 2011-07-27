(function($){
  var _CanHaz = function() {
    var self = this;
    self.templates = {};
    self.compileds = [];

    self.get_cached = function(data)
    {
      return  _.detect(self.compileds, function(cached) { return cached.id == data.id && cached.locals == data.locals });
    }

    self.addTemplate = function(name, template){
      if(name in self.templates || name in self) throw "Duplicate template: " + name;
      
      self.templates[name] = template;

      self[name] = function(data, raw)
      {
          var cache = { id: name, data: (data || {}) },
            result = self.get_cached(cache);

          if(!result) {
            result = $.extend(cache, { template: _.template(self.templates[name], cache.data) });
            self.compileds.push(result);
          }

          return raw ? result.template : $(result.template);
      }
    };
    
    self.grabAllTemplates = function() {
      $('script[type="text/html"]').each(function(k,e) { 
        var $this = $(this), text = $.trim($this.text());
        self.addTemplate($this.attr("id"), text);
        $this.remove();
      });
    };

    return self;
  };

  window. _chz = new _CanHaz();

  $(function () {
      _chz.grabAllTemplates();
  });
})(jQuery);
