(function($){
  var _CanHaz = function() {
    var self = this;
    self.templates = {};
    self.caching = [];
    self.defaults = { raw : false, cache : true };

    self.get_cached = function(data)
    {
      return  _.detect(self.caching, function(cached) {
          return cached.id == data.id && _.isEqual(cached.data, data.data);
        });
    };

    self.addTemplate = function(name, template){
      if(name in self.templates || name in self) throw "Duplicate template: " + name;

      self.templates[name] = _.template(template);

      self[name] = function(data, opts)
      {
          opts = _.extend(self.defaults, (opts || {}));
          var cache = { id: name, data: (data || {}) },
            result = (opts.cache ? self.get_cached(cache) : false);

          if(!result) {
            result = _.extend(cache, { template: self.templates[name](cache.data) });
            if(opts.cache) {
              self.caching.push(result);
            }
          }

          return opts.raw ? result.template : $(result.template);
      };
    };

    self.grabAllTemplates = function() {
      $(document.getElementsByTagName('script')).filter(function() {
        var script = this;
        return script && script.innerHTML && script.id && (script.type === "text/html" || script.type === "text/x-_canhaz");
      }).each(function(k,e) {
        var $this = $(this), text = $.trim(this.innerHTML);
        self.addTemplate($this.attr("id"), text);
        $this.remove();
      });
    };

    return self;
  };

  window._CanHaz = _CanHaz;
  window._chz = new _CanHaz();

  $(function () {
      _chz.grabAllTemplates();
  });
})(jQuery);
