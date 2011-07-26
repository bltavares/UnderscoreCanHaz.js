(function($){
  var _CanHaz = function() {
    var self = this;
    self.templates = {};

    self.addTemplate = function(name, template){
      if(name in self.templates || name in self) throw "Duplicate template: " + name;
      
      self.templates[name] = template;

      self[name] = function(data, raw)
      {
          var locals = data || {};
          var result = _.template(self.templates[name], locals);         
          return raw ? result : $(result);
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
