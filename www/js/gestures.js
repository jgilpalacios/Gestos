var app={
  inicio: function(){
    this.iniciaBotones();
    this.iniciaFastClick();
    this.iniciaHammer();
  },

  iniciaFastClick: function () {
    FastClick.attach(document.body);
  },
  
  iniciaBotones: function(){
    var botonClaro = document.querySelector('#claro');
    var botonOscuro = document.querySelector('#oscuro');
    
    botonClaro.addEventListener('click',this.ponloClaro,false);
    botonOscuro.addEventListener('click',app.ponloOscuro,false);

    document.body.addEventListener('webkitAnimationEnd',function(e){
      document.body.className='';
    });
  },

  iniciaHammer: function() {
    var zona = document.getElementById('zona-gestos');
    var hammertime = new Hammer(zona);
    
    hammertime.get('pinch').set({ enable: true });
    hammertime.get('rotate').set({ enable: true });

    zona.addEventListener('webkitAnimationEnd',function(e){
      zona.className='';
    });

    hammertime.on('tap', function(ev) {
      zona.className='tap';
    });
    
    hammertime.on('doubletap', function(ev) {
      zona.className='doubletap';
    });

    hammertime.on('press', function(ev) {
      zona.className='press';
    });

    hammertime.on('swipe', function(ev) {
      var clase=undefined;
      direccion=ev.direction;
      
      if (direccion==4) clase='swipe-derecha';
      if (direccion==2) clase='swipe-izquierda';
      
      zona.className=clase;
    });


    hammertime.on('rotate', function(ev) {
      var umbral=25;
      if (ev.distance > umbral) {
          if(ev.eventType==2) zona.className='rotateder';
          if(ev.eventType==4) zona.className='rotateiz';
          document.querySelector('#info').innerHTML=JSON.stringify(ev);
      }
    });
  },

  ponloClaro: function(){
    //document.body.className = 'claro';
    document.body.className = 'claroprogresivo';
  },

  ponloOscuro: function(){
    //document.body.className = 'oscuro';
    document.body.className = 'oscuroprogresivo';
  },

};

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        app.inicio();
    }, false);
}

