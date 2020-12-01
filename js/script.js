n = 3
let arr = [[]]
puntos()
		function bezier(puntos,t){  
  			if (puntos.length == 2){
    			x = ((1-t)*puntos[0][0]) + (t*puntos[1][0])
   		 		y = ((1-t)*puntos[0][1]) + (t*puntos[1][1])
    			return [x,y]
  			} else {  
  				newpuntos = []
  				for(i = 0;i<puntos.length-1;i++){
  					newpuntos[i] = [0,0]
  				}
  				for(p = 0;p<newpuntos.length;p++){
  					newpuntos[p][0] = ((1-t)*puntos[p][0]) + (t*puntos[p+1][0])      
      				newpuntos[p][1] = ((1-t)*puntos[p][1]) + (t*puntos[p+1][1])
  				}        
    			return bezier(newpuntos,t)
    		}
		}
		function graficar(){
			
			let inputSubmit = document.getElementById("btn2")
			let box = document.getElementById("box")
			
			for(i = 0;i<n;i++){
				let x = document.getElementById("x" + (i+1)).value
				let y = document.getElementById("y" + (i+1)).value
				let val = [parseFloat(x),parseFloat(y)]
				arr[i] = val
			}
			let dat = [[]]
			for(j = 0;j <= 100;j++){
				dat[j] = bezier(arr,j/100);
			}
			//mostrarFormula(dat);
			Grafica(arr,dat)
			document.getElementById("x1").value = 0;
			document.getElementById("y1").value = 0;
			for(i = 1;i<n;i++){
				box.removeChild(document.getElementById("x" + (i+1)))
				box.removeChild(document.getElementById("y" + (i+1)))
			}
			inputSubmit.parentNode.removeChild(inputSubmit)
			let inputSubmit2 = document.createElement("input")
			inputSubmit2.type = "submit"
			inputSubmit2.id = "btn2"
			inputSubmit2.setAttribute("onclick","agregarPunto()")
			inputSubmit2.classList.add("btn2")
			inputSubmit2.value = "Añadir Boton"
			box.appendChild(inputSubmit2)
		}
		function agregarPunto(){
			let x = document.getElementById("x1").value
			let y = document.getElementById("y1").value
			let val = [parseFloat(x),parseFloat(y)]
			arr.push(val)
			n++;
			if(n <=8){
				let dat = [[]]
				for(j = 0;j <= 100;j++){
					dat[j] = bezier(arr,j/100);
				}
				Grafica(arr,dat)
			} else {
				alert("No se pueden ingresar mas puntos, actualice la pagina para reiniciar el gráfico")
			}
		}
		function puntos(){
			let aux = n
			let box = document.getElementById("box")
			box.appendChild(document.createElement("br"))
			box.appendChild(document.createElement("br"))
			for(i = 0;i<n;i++){
				let inputX = document.createElement("input")
				let inputY = document.createElement("input")
				inputX.type = "number"
				inputX.id = "x" + (i+1)
				inputY.type = "number"
				inputY.id = "y" + (i+1)
				inputX.placeholder = "x" + (i+1)
				inputY.placeholder = "y" + (i+1)
				inputX.classList.add("xy")
				inputY.classList.add("xy")
				box.appendChild(inputX)
				box.appendChild(inputY)
				box.appendChild(document.createElement("br"))
			}
			let inputSubmit = document.createElement("input")
			inputSubmit.type = "submit"
			inputSubmit.id = "btn2"
			inputSubmit.setAttribute("onclick","graficar()")
			inputSubmit.classList.add("btn2")
			inputSubmit.value = "Calcular Curva"
			box.appendChild(inputSubmit)

		}
		function Grafica(Valores,ValoresB){
			let Datos = [],DatosB = [];
			for (let i = 0; i < Valores.length; ++i){
				Datos[i] = {x: Valores[i][0], y: Valores[i][1]};
			}
			for (let i = 0; i < ValoresB.length; ++i){
				DatosB[i] = {x: ValoresB[i][0], y: ValoresB[i][1]};
			}
			var chart = new CanvasJS.Chart("chartContainer", {
				animationEnabled: true,
				theme: "light2",
				title:{
					text: "Curvas de Bezier"
				},
				data: [{        
					type: "line",
			      	indexLabelFontSize: 16,
					dataPoints: Datos,
				},{
					lineColor: "red",
					type: "spline",
			      	indexLabelFontSize: 16,
					dataPoints: DatosB,
				}]
			});
			chart.render();
		}
		
