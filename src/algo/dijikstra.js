export function djikstra(matrix,start,finish){

    var currentNode=start;
    var finishNode=finish;
    const visitedNodes=[];
    currentNode.distance=0;
    const unvisitedNodes = getAllNodes(matrix);
    while(unvisitedNodes.length>0){
                
        
        unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
        
        currentNode= unvisitedNodes.shift();
       if(currentNode.isWall){
        continue;}

       if(currentNode.distance===Infinity) {
        return visitedNodes;}
        
        getNeightbors(currentNode,matrix);
        currentNode.isVisited=true;
        visitedNodes.push(currentNode);
        if (currentNode.isFinish) {
          return visitedNodes;}
        updateUnvisitedNeighbors(currentNode,matrix);
    }

 }


 function updateUnvisitedNeighbors(node,grid){
    const unvisitedNeighbors=getNeightbors(node,grid);
    for (let i = 0; i < unvisitedNeighbors.length; i++) {
        unvisitedNeighbors[i].distance=node.distance+1;
        unvisitedNeighbors[i].previousNode=node;
        
    }

 }

 function getNeightbors(currentNode,matrix){
    const {col,row}=currentNode;
    const neighbors=[];
          if(col>0){
            neighbors.push(matrix [row][col-1]);
                }
          if(row>0){
            neighbors.push(matrix [row-1][col]);
                }
          if(row<matrix.length-1){
            neighbors.push(matrix [row+1][col]);
                }
          if(col<matrix[0].length-1){
            neighbors.push(matrix [row][col+1]);
                }
    return neighbors.filter(neighbor => !neighbor.isVisited);

   }


 function getAllNodes(matrix) {
  const nodes=[];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {          
          nodes.push(matrix[i][j]);
      }      
  }
    return nodes;
  }

  export function getShortestPath(endNode){
    const shortestPath= [];
    
    while(endNode.previousNode!=null){
      shortestPath.push(endNode);
      endNode=endNode.previousNode;
    }

    return shortestPath;
  }



