
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
			let n = document.getElementById("n").value
			let arr = [[]]
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
			Grafica(arr,dat)
		}
		function puntos(){
			let n = document.getElementById("n").value
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
					type: "spline",
			      	indexLabelFontSize: 16,
					dataPoints: DatosB,
				}]
			});
			chart.render();
		}
		
