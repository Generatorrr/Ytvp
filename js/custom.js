export default function(selector){
  var elements = document.querySelectorAll(selector);
  elements.__proto__.addClass = function(classes){
    Array.prototype.forEach.call(this, (node, i) => {
      var classNames = classes;
      if(typeof classes == 'function'){
        classNames = classes(i, node.className);
      }
      if(classNames) {
        classNames.split(" ").forEach((className) => node.classList.add(className));
      };
      
    })
    return this;
  }
  elements.__proto__.append = function(selector){
    Array.prototype.forEach.call(this, (node)=>{
        let div = document.createElement('div');
        div.innerHTML = (typeof selector == 'object') ? selector.innerHTML : selector;
        var realElement = div.firstChild;
        node.appendChild(realElement);
      
    })
    return this;
  }
  elements.__proto__.html = function(html){
    if(!html){
      return this[0].innerHTML;
    }else{
      Array.prototype.forEach.call(this, (node)=>{
        node.innerHTML = html;      
      })
      return this;
    }
  }
  elements.__proto__.attr = function(attr, value){
    if(value){
      Array.prototype.forEach.call(this, (node)=>{
        node.setAttribute(attr, value);     
      })
      return this;
    }else{
      return this[0].getAttribute(attr);
    }
  }
  elements.__proto__.children = function(selector){
    if(selector){
      const childrens = this[0].querySelectorAll(selector);
      return childrens;
    }else{
      return this[0].childNodes;
    }
  }
  elements.__proto__.css = function(property){
    if(typeof property == 'object'){
      Array.prototype.forEach.call(this, (node)=>{
        for(let key in property){
          node.style[key] = property[key];
        }     
      })
      return this;
    }else{
      return this[0].style[property];
    }
  }
  elements.__proto__.data = function(name, value){
    if(!name){
      return this[0].dataset;
    }
    if(name && !value){
      if(typeof name == 'object'){
          Array.prototype.forEach.call(this, (node) => {
            for(let key in name) {
              node.dataset[key] = name[key];
            }     
          })
      }else{
        return this[0].dataset[name];
      }
    }else if(value){
      Array.prototype.forEach.call(this, (node) => {
        node.dataset[name] = value;
      })
    }
    return this;
  }
  elements.__proto__.on = function(eventName, second, third){
    if(!third){
      Array.prototype.forEach.call(this, (node) => {
        node.addEventListener(eventName, second);
      })
    }else{
      let childrens = this[0].querySelectorAll(second);
      Array.prototype.forEach.call(childrens, (node) => {
        node.addEventListener(eventName, third);
      })
    }
    return this;
  }
  elements.__proto__.one = function(eventName, handler){
    Array.prototype.forEach.call(this, (node) => {
      const handlerWrapper = (...args) => {
        handler.apply(this, args);
        node.removeEventListener(eventName, handlerWrapper)
      };
      node.addEventListener(eventName, handlerWrapper);
    })
    return this;
  }
  elements.__proto__.each = function(callback){
    for(var i = 0; i < this.length; i++){
      let result = callback.bind(this[i])(i, this[i]);
      if(result === false){
        break;
      }
    }
    return this;
  }
  return elements;
}