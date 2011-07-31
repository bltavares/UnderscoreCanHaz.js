describe("_CanHaz.js", function() {

  var canhaz;
  var person = {"name": "Bruno","friends": [{"name": "Carol"}, {"name": "Joca"}]};

  beforeEach(function() {
    loadFixtures("basic_template.html");
    canhaz = new _CanHaz();
    canhaz.grabAllTemplates();
  });

  it("should remove the templates from page", function(){    
    expect($("#jasmine-fixtures")).not.toContain("script[type='text/html'");
  });  

  it("should store the templates by id",function(){
    expect(canhaz.templates["person"]).not.toBeUndefined();
  });

  it("should set the default configs",function() {
    expect(canhaz.defaults).toEqual({cache : true, raw: false});
  });

  it("should allow change the default configs",function() {
    var expectation = canhaz.defaults = {cache: false, raw: true};
    expect(canhaz.defaults).toEqual(expectation);
  });

  describe("#Caching", function() {
    it("should check the cache by default", function() { 
      spyOn(canhaz,"get_cached");
      canhaz.person(person);
      expect(canhaz.get_cached).toHaveBeenCalled();
    });

    it("should cache the object",function() {
      canhaz.person(person);
      expect(canhaz.caching.length).toEqual(1);
    });

    it("should not check for caching if required",function() {
      spyOn(canhaz,"get_cached");
      canhaz.person(person, {cache : false});
      expect(canhaz.get_cached).not.toHaveBeenCalled();
    });

    
    it("should not cache the object if required",function() {
      canhaz.person(person, { cache: false });
      expect(canhaz.caching.length).toEqual(0);
    });
  });

  describe("#Jqueryfy", function() {
    it("should return a jquery obj by default", function() { 
      expect(typeof canhaz.person(person)).toEqual("object");
    });

    it("should return only the string if required",function() {       
      expect(typeof canhaz.person(person, { raw: true} )).toEqual("string")
    });
  });

});
