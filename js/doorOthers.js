// ===================== Пример кода первой двери =======================
/**
 * @class Door0
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door0(number, onUnlock) {
    DoorBase.apply(this, arguments);

    var buttons = [
        this.popup.querySelector('.door-riddle__button_0'),
        this.popup.querySelector('.door-riddle__button_1'),
        this.popup.querySelector('.door-riddle__button_2')
    ];

    buttons.forEach(function(b) {
        b.addEventListener('pointerdown', _onButtonPointerDown.bind(this));
        b.addEventListener('pointerup', _onButtonPointerUp.bind(this));
        b.addEventListener('pointercancel', _onButtonPointerUp.bind(this));
        b.addEventListener('pointerleave', _onButtonPointerUp.bind(this));
    }.bind(this));

    function _onButtonPointerDown(e) {
        e.target.classList.add('door-riddle__button_pressed');
        checkCondition.apply(this);
    }

    function _onButtonPointerUp(e) {
        e.target.classList.remove('door-riddle__button_pressed');
    }

    /**
     * Проверяем, можно ли теперь открыть дверь
     */
    function checkCondition() {
        var isOpened = true;
        buttons.forEach(function(b) {
            if (!b.classList.contains('door-riddle__button_pressed')) {
                isOpened = false;
            }
        });

        // Если все три кнопки зажаты одновременно, то откроем эту дверь
        if (isOpened) {
            this.unlock();
        }
    }
}

// Наследуемся от класса DoorBase
Door0.prototype = Object.create(DoorBase.prototype);
Door0.prototype.constructor = DoorBase;
// END ===================== Пример кода первой двери =======================

/**
 * @class Door1
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door1(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия второй двери здесь ====
    // ==== Дверь открывается, если перетащить пятиугольник в область круга ====


  var draggable = {};
    var element = this.popup.querySelector('.door-riddle__pentagon');
  
    var placeholder = {};
    placeholder.elem =  this.popup.querySelector('.door-riddle__placeholder');
    placeholder.posX = placeholder.elem.offsetLeft;
    placeholder.posY = placeholder.elem.offsetTop;
    
    element.addEventListener('pointerdown', _onDraggablePointerDown.bind(this));
    element.addEventListener('pointerup', _onDraggablePointerUp.bind(this));
    element.addEventListener('pointermove', _onDraggablePointerMove.bind(this));
    element.addEventListener('pointercancel', _onDraggablePointerUp.bind(this));
    element.addEventListener('pointerleave', _onDraggablePointerUp.bind(this));
    
    function _onDraggablePointerDown(e) {

      e.target.classList.add('door-riddle__pentagon_pressed');    
      

      // запомнить переносимый объект
      draggable.elem = element;

      // запомнить координаты, с которых начат перенос объекта
      draggable.downX = e.pageX;
      draggable.downY = e.pageY;   
    }
  
    function _onDraggablePointerMove(e) {
      
      if (!draggable.elem) return; // элемент не зажат
      
      e.target.classList.add('door-riddle__pentagon_moving');   
          
      e.target.style.left = e.pageX + 'px';
      e.target.style.top = e.pageY + 'px';

      draggable.coordX = e.pageX - placeholder.posX;
      draggable.coordY = e.pageY - placeholder.posY;

    }
    
    function _onDraggablePointerUp(e) {
      
      e.target.classList.remove('door-riddle__pentagon_pressed','door-riddle__pentagon_moving');      
      
      checkCondition.apply(this);
    }

    function checkCondition(e) {
      var isOpened = false;      
        if ( draggable.coordY > 0 && draggable.coordY < 80) {         
          if(draggable.coordX > 0 && draggable.coordX < 80){            
            isOpened = true;
            placeholder.elem.classList.add('door-riddle__placeholder_hidden');
          }          
        }      
  
      // Если попали в круг, то откроем эту дверь
      if (isOpened) {
        setTimeout(function(){
          this.unlock();
        }.bind(this),350);        
      }
    }
    
    // ==== END Напишите свой код для открытия второй двери здесь ====
}
Door1.prototype = Object.create(DoorBase.prototype);
Door1.prototype.constructor = DoorBase;

/**
 * @class Door2
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Door2(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия третей двери здесь ====
    // ==== Дверь открывается, если раздвинуть щепоткой рычаги (круги) ====
  
    var pinchers = [
      this.popup.querySelector('.door-riddle__pincher_0'),
      this.popup.querySelector('.door-riddle__pincher_1')
    ];
    var line = this.popup.querySelector('.door-riddle__line');
    var evCache = [];
    var prevDiff = -1;
  
    pinchers.forEach(function(b) {
      b.addEventListener('pointerdown', _onPincherPointerDown.bind(this));
      b.addEventListener('pointerup', _onPincherPointerUp.bind(this));
      b.addEventListener('pointermove', _onPincherPointerMove.bind(this));
      b.addEventListener('pointercancel', _onPincherPointerUp.bind(this));
      b.addEventListener('pointerleave', _onPincherPointerUp.bind(this));
    }.bind(this));


    function _onPincherPointerDown(e) {
      e.target.classList.add('door-riddle__pincher_pressed');
      var isPinched = true;
      pinchers.forEach(function(b) {
        if (!b.classList.contains('door-riddle__pincher_pressed')) {
          isPinched = false;
        }
      });
      
      if(isPinched){
        console.log('pinched,' + pinchers.length);
      }      
      evCache.push(e);
      
    }

    function _onPincherPointerMove(e) {
      for (var i = 0; i < evCache.length; i++) {
        if (e.pointerId == evCache[i].pointerId) {
          evCache[i] = e;
          break;
        }
      }
      
      if(evCache.length == 2){
        var curDiff = Math.abs(evCache[0].clientY - evCache[1].clientY);
        
        if (prevDiff > 0) {
          if (curDiff > prevDiff) {
           
            pinchers.forEach(function(b) {
              b.classList.add('door-riddle__pincher_moved')              
            });
            line.classList.add('door-riddle__line_moved');
          }          
        }
        
        prevDiff = curDiff;

      }
    }
  
    function _onPincherPointerUp(e) {
      e.target.classList.remove('door-riddle__pincher_pressed');
      remove_event(e);
      if (evCache.length < 2) prevDiff = -1;
      checkCondition.apply(this);
    }

    function remove_event(e) {
      
      for (var i = 0; i < evCache.length; i++) {
        if (evCache[i].pointerId == e.pointerId) {
          evCache.splice(i, 1);
          break;
        }
      }
    }
    function checkCondition(e) {
      var isOpened = false;
      if(line.classList.contains('door-riddle__line_moved')){
        isOpened = true;
      }
  
      if (isOpened) {
        setTimeout(function(){
          this.unlock();
        }.bind(this),450);
      }
    }
    // ==== END Напишите свой код для открытия третей двери здесь ====
}
Door2.prototype = Object.create(DoorBase.prototype);
Door2.prototype.constructor = DoorBase;

/**
 * Сундук
 * @class Box
 * @augments DoorBase
 * @param {Number} number
 * @param {Function} onUnlock
 */
function Box(number, onUnlock) {
    DoorBase.apply(this, arguments);

    // ==== Напишите свой код для открытия сундука здесь ====
    // ==== Дверь откроется, если перевернуть сундук так, чтобы он стоял на своем основании (примерно 160 - 180 градусов)  ====
  
    var rotatable = this.popup.querySelector('.door-riddle');
    var evCache = [];
  

  rotatable.addEventListener('pointerdown', _onRotatablePointerDown.bind(this));
    rotatable.addEventListener('pointerup', _onRotatablePointerUp.bind(this));
    rotatable.addEventListener('pointermove', _onRotatablePointerMove.bind(this));
    rotatable.addEventListener('pointercancel', _onRotatablePointerUp.bind(this));
    rotatable.addEventListener('pointerleave', _onRotatablePointerUp.bind(this));


    function _onRotatablePointerDown(e) {
      evCache.push(e);
    }

    function _onRotatablePointerMove(e){
      for (var i = 0; i < evCache.length; i++) {
        if (e.pointerId == evCache[i].pointerId) {
          evCache[i] = e;
          break;
        }
      }
      if(evCache.length == 2){
       
        var posY_1 = evCache[0].clientY;
        var posX_1 = evCache[0].clientX;
        var posY_2 = evCache[1].clientY;
        var posX_2 = evCache[1].clientX;  
        
        var angle = Math.atan2(posY_2 - posY_1, posX_2 - posX_1) * 180 / Math.PI ;
        
        console.log(angle);
        
        if(angle > 160 && angle < 180 ){
          rotatable.classList.add('door-riddle_rotated')
        }    
        
        rotatable.style.transform = 'rotate(' + angle + 'deg)';
        
      }
    }

    function _onRotatablePointerUp(e) {      
      remove_event(e);
      
      checkCondition.apply(this);
    }
    
    function remove_event(e) {
      
      for (var i = 0; i < evCache.length; i++) {
        if (evCache[i].pointerId == e.pointerId) {
          evCache.splice(i, 1);
          break;
        }
      }
    }
  
    function checkCondition(e) {
      var isOpened = false;
      if(rotatable.classList.contains('door-riddle_rotated')){
        isOpened = true;
      }  
      if (isOpened) {
        setTimeout(function(){
          this.unlock();
        }.bind(this),100);
      }
    }

  
    // ==== END Напишите свой код для открытия сундука здесь ====

    this.showCongratulations = function() {
        alert('Поздравляю! Игра пройдена!');
    };
}
Box.prototype = Object.create(DoorBase.prototype);
Box.prototype.constructor = DoorBase;
