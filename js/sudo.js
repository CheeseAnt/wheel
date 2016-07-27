function create_Table(table) {
	var cell = document.createElement("td");
	for(var i = 1; i<=9; i++) {
		var tr = document.createElement("tr");
		for(var j = 1; j<=9; j++) {
			var td = document.createElement("td");
			var inp = document.createElement("input");
			inp.type = "text";
			inp.id = "matrix["+i+"]["+j+"]";
			inp.size = "1";
			inp.value = "-";
			td.appendChild(inp);
			if(j % 3 == 0 && j != 9)
				td.appendChild(document.createTextNode(" | "));
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

function sudo_Solve(tabl) {
	var table = document.getElementById("tebl");
	var sadoku = new Array(9);
	for(var i = 0; i < 9; i++) {
		sadoku[i] = new Array(9);
		for(var j = 0; j < 9; j++) {
			sadoku[i][j] = new Array(10);
			var val = document.getElementById("matrix["+(i+1)+"]["+(j+1)+"]").value;
			for(var k = 0; k < 10; k++)
				sadoku[i][j][k] = (k + 1);
			sadoku[i][j][9] = '-';
			if(val !== "-") {
				sadoku[i][j][9] = val;
				console.log("sad at "+i+" "+j+" "+sadoku[i][j][k]);
			}
		}
	}
	iterate(sadoku);
	display_Result(sadoku);
}

function iterate(matrix) {
	var n = 0;
	while(n < 50) {
		n++;
		for(var i = 0; i < 9; i++) {
			for(var j = 0; j < 9; j++) {
				if(matrix[i][j][9] != '-')
					continue;
				else {
					for(var k = 0; k < 9; k++)
						if(matrix[i][k][9] != '-') // If vertical has a number
							matrix[i][j][matrix[i][k][9] - 1] = 0; // Eliminate
						else if(matrix[k][j][9] != '-') // If horizontal has a number
							matrix[i][j][matrix[k][j][9] - 1] = 0; // Eliminate
					var x = i - (i % 3) + 3;
					var y = j - (j % 3) + 3;
					for(var s = (i - (i % 3)); s < x; s++)
						for(var e = (j - (j % 3)); e < y; e++)
							if(matrix[s][e][9] != '-')
								matrix[i][j][matrix[s][e][9] - 1] = 0;
				}
			}
		}
		var exterminate;
		var count;
		for(var i = 0; i < 9; i++) {
			for(var j = 0; j < 9; j++) {
				exterminate = 0;
				count = 0;
				for(var k = 0; k < 9; k++) {
					if(matrix[i][j][k] != 0) {
						exterminate = matrix[i][j][k];
						count++;
					}
				}
				if(count == 1 && exterminate != 0)
					matrix[i][j][9] = exterminate;
				console.log(matrix[i][j][9]);
			}
		}
	}
}

function display_Result(matrix) {
	var table = document.createElement("table");
	var cell = document.createElement("td");
	for(var i = 1; i<=9; i++) {
		var tr = document.createElement("tr");
		for(var j = 1; j<=9; j++) {
			var td = document.createElement("td");
			var inp = document.createElement("input");
			inp.type = "text";
			inp.id = "matrix["+i+"]["+j+"]";
			inp.size = "1";
			inp.value = matrix[i - 1][j - 1][9];
			td.appendChild(inp);
			if(j % 3 == 0 && j != 9)
				td.appendChild(document.createTextNode(" | "));
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	document.getElementById("badoo").appendChild(document.createElement("p"));
	document.getElementById("badoo").appendChild(table);
}