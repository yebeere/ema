/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

      	// crea nuevo requerimiento para actualizar el Cache
            try{var xmlHttp = new XMLHttpRequest()}
            catch (e){var xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')}
            
	  function overlay() {
                            el = document.getElementById("overlay");
                            el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
                    }
                    
            function modal(){
              console.log('Paso por el modal');
             $("#thedialog").dialog({
                      title: "jQuery Dialog Popup",
                      
                      buttons: {
                          Close: function () {
                              $(this).dialog('close');
                          }
                      }
                  });
                  return false;


            };					

	// decodifica el JSONP
            var $jsonp = (function(){
                var that = {};

                  that.send = function(src, options) {
                    var callback_name = options.callbackName || 'callback',
                      on_success = options.onSuccess || function(){},
                      on_timeout = options.onTimeout || function(){},
                      timeout = options.timeout || 10; // sec

                    var timeout_trigger = window.setTimeout(function(){
                      window[callback_name] = function(){};
                      on_timeout();
                    }, timeout * 1000);

                    window[callback_name] = function(data){
                      window.clearTimeout(timeout_trigger);
                      on_success(data);
                    }

                    var script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.async = true;
                    script.src = src;

                    document.getElementsByTagName('head')[0].appendChild(script);
                  }

                  return that;
                })();
           
            /* función que envía la solicitud de parametros al servidor*/
            
            function retornaEmas() {
            //	refreshGadget();
            //$jsonp.send('http://meta.fi.uncoma.edu.ar/cuentagotas/ws_clima_inta/index.php/api/listaEmas?callback=handleStuff', {
            	$jsonp.send('http://localhost/yii/ws_clima_inta/index.php/api/listaEmas?callback=handleStuff', {
                                    callbackName: 'handleStuff',
                                    onSuccess: function(json){
                                        //console.log('success!', json[0].codigoEma);
                                         var datosEMA=json;
                                        //console.log('DatosEma!', datosEMA[0].codigoEma);
                                         cantidad=datosEMA.length;
                                          //console.log(datosEMA);
                                          //console.log(cantidad);
                                          texto="";
                                          var i;
                                          var select = document.getElementById("comboemas");
                                          for (i=0;i<cantidad;i++) {
                                                        select.options.add(new Option(datosEMA[i].nombreEma,datosEMA[i].codigoEma));
                                                        //select.appendChild(option);
                                           }
							        
                                    },
                                    onTimeout: function(){
                                                //console.log('timeout!');
                                                var option = document.createElement("option");
                                                    option.text ="Hay problemas";
                                                    option.value = 0;
                                                    var select = document.getElementById("comboemas");
                                                    select.appendChild(option);
                                    },
                                    timeout: 15
                                });
                
            }
            
            
            function retornaDatosEma() {
               var ema=document.getElementById('comboemas').options[document.getElementById('comboemas').selectedIndex].value; 
               //xmlHttp.open("GET", URL, false); //true mean call is asynchronous
							 //xmlHttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
               //refreshGadget;
                var URL = 'http://meta.fi.uncoma.edu.ar/cuentagotas/ws_clima_inta/index.php/api/datosActuales/ema/INTACINCO?callback=handleStuff';
                //xmlHttp.open("GET", URL, false); //true mean call is asynchronous
               // xmlHttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT");
               // xmlHttp.onreadystatechange = getweatherData;
               // xmlHttp.send(null);
               $jsonp.send('http://localhost/yii/ws_clima_inta/index.php/api/datosActuales/ema/'+ema+'?callback=handleStuff', {
             // $jsonp.send('http://localhost/yii/ws_clima_ima_inta/index.php/apiinta/index.php/api/datosActuales/ema/INTAGUERR?callback=handleStuff', {
              //http://localhost/yii/ws_clima_inta/index.php/api/datosActuales/ema/INTAGUERR
              //
                callbackName: 'handleStuff',
                onSuccess: function(json){
                    console.log('success!', json.error);
                    if (json.error==""){
                         console.log('pROBLEMA=',json.error);
                        var datosEMA=json;
                        weather = {};
                      //  document.getElementById("date").innerHTML=datosEMA.fecha;
                      //  document.getElementById("hour").innerHTML=datosEMA.hora;
                        
                       
                        units='C';
                        
                        if (parseFloat(datosEMA.temperatura) > 27) {
                           $('#content').animate({backgroundColor: '#F7AC57'}, 1500);
                         } else {
                           $('#content').animate({backgroundColor: '#0091c2'}, 1500);
                         }
                       
                        html = '<ul><li id="ema" onClick="overlay();">'+datosEMA.estacion+'</li></ul>';
                       	html += '<h2>'+datosEMA.temperatura+'&deg;'+units+'</h2>';
                        html += '<ul><li>'+datosEMA.fecha+' '+datosEMA.hora+'</li>';
                        html += '<li class="currently"><b>Humedad:</b>'+datosEMA.humedad+' %'+'</li>';
                        html += '</ul><br /><ul><li>Presion:'+datosEMA.presion+' mBar'+'</li><li></li></ul>';
                        //datosEMA.fecha=moment(datosEMA.fecha,"YY-MM-DD");
                        moment.locale('es');
                        console.log(datosEMA.fecha);
                        fecha='20'+datosEMA.fecha+' '+datosEMA.hora;
                        var timestamp = moment(fecha,'YYYY-MM-DD HH:mm');
                         console.log(timestamp);
                         html += '<p class="updated">Actualizado '+moment(timestamp).fromNow()+'</p>';


                        $("#weather").html(html);

                    } else {
                            error='<ul><li id="ema" onClick="overlay();"><p>Problemas con la Estacion</p><p>Elija otra</p></li></ul>';
                        $("#weather").html('<p>'+error+'</p>');
                          }
								        
								        
                    },
                    error: function(error) {
                        $("#weather").html('<p>'+error+'</p>');
                      },
                    onTimeout: function(){
                        error='Problemas de comunicacion';
                        $("#weather").html('<p>'+error+'</p>');					        
                    },
                    timeout: 5
                });
               //setTimeout(retornaDatosEma,2*60*1000);
               //window.setInterval(retornaDatosEma, 2*60*1000);
            }
            

       
