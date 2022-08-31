export function randomizePrim(matrix,startNode,finishNode){

    //var matrix=JSON.parse(JSON.stringify(grid));
    matrix = allCellsToWalls(matrix);   
    const walls=getWallsOfTheCell(startNode,matrix);

    while(walls.length>0){
        var tmparr=[...walls];
        var randomElement = tmparr[Math.floor(Math.random() * tmparr.length)];
        
        if(onlyOneCell(randomElement,matrix)){
            randomElement.isWall=false;
            const tmp=getWallsOfTheCell(randomElement,matrix);
            for (let i = 0; i < tmp.length; i++) {
                walls.push(tmp[i]);   
            }
        }
        matrix[randomElement.row][randomElement.col]=randomElement;
        let index=walls.indexOf(randomElement);
        walls.splice(index,1);
    }
    matrix[finishNode.row][finishNode.col]={
        ...finishNode,
        isWall:false,
    }
    return matrix;
}


function onlyOneCell(node,matrix){
    const{col,row}=node;
     var counter=0;

    if(col>0&&!matrix [row][col-1].isWall){
       counter+=1;
            }
    if(row>0&&!matrix [row-1][col].isWall){
        counter+=1
            }
    if(row<matrix.length-1&&!matrix [row+1][col].isWall){
        counter+=1   
            }
    if(col<matrix[0].length-1&&!matrix [row][col+1].isWall){
        counter+=1    
            }
    if(counter==1) {
        return true;
    }else{
        return false;
    }
        
}


function getWallsOfTheCell(node,matrix){
    const walls=[];
    const{col,row}=node;

    if(col>0){
            walls.push(matrix[row][col-1]);  
            }
      if(row>0){
            walls.push(matrix[row-1][col]);
            }
      if(row<matrix.length-1){
            walls.push(matrix[row+1][col]);
            }
      if(col<matrix[0].length-1){
            walls.push(matrix[row][col+1]);
            }         
    return [...walls];
}

function allCellsToWalls(matrix){
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix [0].length; j++) {
            if(!matrix[i][j].isStart){
                matrix[i][j].isWall=true;
            }
        }        
    }
    return [...matrix];
}