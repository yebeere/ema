/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
    function onDeviceReady() {
           //console.log('el dispositivo esta list');
           //window.plugins.insomnia.keepAwake();// plugin de PhoneGAP para dejar la pantalla encendida (cargado en config.xml)
           document.addEventListener("offline", isOffline(), false); //Fuera de red
           document.addEventListener("online", isOnline(), false);   //En red
           //navigator.geolocation.getCurrentPosition(onSuccessGPS, onErrorGPS);
            //buscardatosHistoricos();
           document.addEventListener("backbutton", function(e){
                    if($.mobile.activePage.is('#homepage')){
                        e.preventDefault();
                        window.plugins.toast.showLongCenter("Gracias por utilizar CuentaGOTAS!!");
                        navigator.app.exitApp();
                    }
                    else {
                        navigator.app.backHistory()
                    }
                }, false);

          }

    function isOffline() {
                        error='Problemas de comunicacion';
                        $("#weather").html('<p>'+error+'</p>');	
                        hayRed=false;
                       
                   }
    function isOnline() {
            //alert ('Su dispositivo móvil esta en línea');
           // document.getElementById('net').className = 'estado ok'; //pone el tilde verde
            //parametriza los valores del GPS
            var options = {maximumAge: 100, timeout: 50000, enableHighAccuracy:true};
            hayRed=true;
            //Accede a la geolocalizacion por GPS o Red
            navigator.geolocation.getCurrentPosition(onSuccessGPS, onErrorGPS, options);
           // buscardatosHistoricos();
        }
        
