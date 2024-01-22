var matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
  console.log(matrix[0][0]);
  console.log(matrix[1][2]); 
  matrix[2][1] = 10; 
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      console.log(matrix[i][j]);
    }
  }