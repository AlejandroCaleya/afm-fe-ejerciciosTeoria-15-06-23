//Programa principal del 3 en raya
//Author: Javier Soriano - IES Santiago Hernandez
//v4.0 Esta versiÃ³n juega con tablero de N filas y columnas.
/*
Se ha intentado ser didÃ¡ctico y claro. Por eso ocasiones hay cÃ³digo comentado con la misma
funcionalidad que un cÃ³digo mÃ¡s compacto que estÃ¡ a continuaciÃ³n. Por ejemplo cuando se hace 
uso del operador ternario. 
*/

	//creamos la funcion constructora de los objetos casillas
	function Casilla(id, clikada, valor){
		this.id = id;
		this.clikada = clikada;
		this.valor = valor;	
	}

	//Declaramos las variables globales.
	var nCasillas;
	var nFilas;
	var numerador = 0;
	var turnos = 0;
	var turnoX = false;
	var tab = [];
	
	//creamos las casillas en funcion de una variable nCasillas que por ahora es 9
	function iniciarJuego(){
        var tablero = document.getElementById("tablero");
		//limpiamos primero de todo el tablero.
		tablero.innerHTML="";
		//inicializamos las variables globales
		numerador=0;
		turnos=0;
		turnoX=false;
		//inicializamos el array 
		tab.length=0;
		//el tamaÃ±o del tablero lo cogemos del desplegable
		var s=document.getElementById("selectortab").options.selectedIndex;
		nFilas = document.getElementById("selectortab").options[s].text;
		nCasillas = nFilas * nFilas;
		console.log("NÃºmero de filas es: "+nFilas+" NÃºmero de casillas es: "+nCasillas);
		for(var j=0;j<nFilas;j++){
			var f=document.createElement("div");
			f.className="fila";	
			for(var i=0;i<nFilas;i++){
				//creamos el objeto 
				var objCas = new Casilla("c"+numerador,false,numerador);
				tab[numerador]=objCas;
				//creamos los objetos en el DOM
				var d = document.createElement("div");
				d.className = "casilla";
				d.id = "c"+numerador;
				numerador +=1;
				var dd = document.createElement("div");
				dd.className ="dentroCasilla";
				var c = document.createTextNode("");
				dd.appendChild(c);
				d.appendChild(dd);
				f.appendChild(d);
				//console.log("AÃ±adido "+d.id);
				//console.log("probando el objeto, damos el id: "+tab[numerador-1].id);
			}
			tablero.appendChild(f);
		}
		//Asignamos los eventos, una vez creado el tablero.
		var cas = document.getElementsByClassName("casilla");
		for (var i=0;i<cas.length;i++){
			cas[i].addEventListener("click",jugar,false);	
		}
	}

	//Al cargar la pagina llenamos el select y lanzamos el juego.
	window.onload = function(){
		//llenamos el sel
		var sel = document.getElementById("selectortab");
		var cadena = "<option  selected='selected'>3</option>";
		for (var i=4;i<20;i++){
			cadena += "<option>"+i+"</option>";
		}
		sel.innerHTML=cadena;
		//lanzamos el primer juego
		iniciarJuego();
		//aÃ±adimos un listerner para el onchange del select
		sel.addEventListener("change",iniciarJuego,false);
        //aÃ±adimos un listener para el boton de reinicio.
        var rei = document.getElementById("reiniciador");
        rei.addEventListener("click",iniciarJuego,false);
	};
		
	function terminado(){
        return (turnos == nCasillas);
		/*if (turnos == nCasillas){
			return true;
		}else{
			return false;
			}*/	
	};
	
	function victoria(){
		//esta funcion solo sirve para el 3 en raya por el momento.
		var c="";
		c= (turnoX) ? "X" : "O";
		//hemos usado el operador ternario para sustituir esto de abajo:
		/*if (turnoX){
			//asignamos Xs
			c ="X";
		}else{
			//asignamos Os
			c="O";
		}*/
		//comprobamos columnas
		var vic=true;
		var aux=false;
		var pos=0;
		for (var i=0;i<nFilas;i++){
			for (var j=0;j<nFilas;j++){
				pos=i+(j*nFilas);
				console.log("posicion par col es: "+pos);
				aux = (tab[pos].valor==c);
				console.log("igual a "+c+" es: "+ aux);
				vic = (vic && aux);
				if (!aux){break;}
			}
			if (vic){return true;}else{vic=true;}
		}
		//comprobamos filas
		for (var i=0;i<nFilas;i++){
			for (var j=0;j<nFilas;j++){
				pos=j+(i*nFilas);
				console.log("posicion para fil es: "+pos);
				aux = (tab[pos].valor==c);
				console.log("igual a "+c+" es: "+ aux);
				vic = (vic && aux);
				if (!aux){break;}
			}
			if (vic){return true;}else{vic=true;}
		}
		//comprobamos diagonales: diagonal en bajada
		for (var i=0;i<nFilas;i++){
				pos=(i*nFilas)+i;
				console.log("posicion para diag es: "+pos);
				aux = (tab[pos].valor==c);
				console.log("igual a "+c+" es: "+ aux);
				vic = (vic && aux);
				if (!aux){break;}
		}
		if (vic){return true;}else{vic=true;}
		//comprobamos diagonales: diagonal en subida
		for (var i=1;i<=nFilas;i++){
				pos=i*(nFilas-1);
				console.log("posicion para diag2 es: "+pos);
				aux = (tab[pos].valor==c);
				console.log("igual a "+c+" es: "+ aux);
				vic = (vic && aux);
				if (!aux){break;}
		}
		if (vic){
			return true;
		}else{
			vic=true;
		}
		return false;
	}
	
	function jugar(ev){
		var casilla_pulsada=ev.target.id;
		//console.log("Pulsada casilla: "+ casilla_pulsada);
		var posicion = casilla_pulsada.slice(1);
		//console.log("La posicion es: " + posicion);
		
		//podemos buscar con el id en tab y modificar el tablero que es un array de casillas
		if (terminado()){
			var r=confirm("La partida ya ha terminado, pulse OK para empezar otra.");
			if(r==true){
				iniciarJuego();
				}
		}else{
			if (tab[posicion].clikada == false){
				turnos +=1;
				tab[posicion].valor=(turnoX)? "X":"O";
				/*if (turnoX){
					tab[posicion].valor="X";
				}else{
					tab[posicion].valor="O";
				}*/
				var di=document.getElementById(casilla_pulsada);
				//Aqui mostramos X u O en funcion del turno.
				//di.firstChild.innerHTML = tab[posicion].valor;
				di.classList.add('marca');
				if(turnoX==true){
					di.classList.remove('marcaO');
					di.classList.add('marcaX');
				}else{
					di.classList.remove('marcaX');
					di.classList.add('marcaO');
				}
				tab[posicion].clikada=true;
				//verificamos Victoria 
				var v=victoria();
				if (v){
					alert("Victoria del jugador con fichas " + tab[posicion].valor);
					turnos=nCasillas;
				}else{
					if (turnos==nCasillas){
						alert("Partida finalizada en tablas");
					}
					turnoX= !turnoX;
				}
				
			}
		}
	}