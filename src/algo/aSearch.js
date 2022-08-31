export function aSearch(matrix,startingNode,finishNode){

    const openList= [];
    const closedList=[];
    var currentNode=startingNode;
    currentNode.distance=0;
    openList.push(currentNode);

    while(openList.length>0){
        sortByDistance(openList)
        var qNode= openList.shift();
        if(qNode.isWall)continue;
        if(qNode.distance===Infinity){
            return closedList};
       var neighbors=generateSucessors(qNode,matrix,finishNode); 

       const finalNode=neighbors.find(node => node.isFinish==true)
       if(finalNode===finishNode) {
        closedList.push(finalNode);
        return closedList;}
        
       
        
       neighbors.forEach(node => {
           const openListNode= openList.find(element=> element.row==node.row&&element.col==node.col);
           const closedListNode= closedList.find(element=> element.row==node.row&&element.col==node.col);
            if(openListNode===undefined||openListNode.distance>node.distance) {
                if(closedListNode===undefined||closedListNode.distance>node.distance){
                    openList.push(node);
                }
            }
       });
       qNode.isVisited=true;
       closedList.push(qNode);
       
    }

    return closedList;
    
}

function sortByDistance(nodes){nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);}

function generateSucessors(qNode,matrix,finishNode){

        const {col,row}=qNode;
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
       

        return calculateDistanceforNodes(neighbors,qNode,finishNode);
    
}

function calculateDistanceforNodes(neighbors,qNode,finishNode){

    for (let i = 0; i < neighbors.length; i++) {
        const currentNode=neighbors[i];
        if(!currentNode.isStar&&currentNode.isVisited==false){
            currentNode.previousNode=qNode;
        }
        const sucessorG=qNode.distance+1;
        const sucessorH=Math.abs(currentNode.col-finishNode.col)+Math.abs(currentNode.row-finishNode.row);
        const sucessorF=sucessorG+sucessorH;
        currentNode.distance=sucessorF;
        neighbors[i]=currentNode;
    }

    return neighbors;
}

export function getShortestPathAsearch(endNode){
    const shortestPath= [];
    while(endNode.previousNode!=null){
        shortestPath.push(endNode);
        endNode=endNode.previousNode;
    }

    return shortestPath;
  }