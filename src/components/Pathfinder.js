
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MUIAlert from '@mui/material/Alert';
//MUI imports
import React from 'react';
import Node from './Node/Node';
import './Pathfinder.css'
import { djikstra, getShortestPath } from '../algo/dijikstra';
import {aSearch, getShortestPathAsearch} from '../algo/aSearch';




//START AND FINISH NODES
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 17;
const FINISH_NODE_COL = 25;

 function Pathfinder(){

    const [matrix,setMatrix]=React.useState([]);
    
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    React.useEffect(()=>{
        fillTheGrid();
    },[])

    function fillTheGrid(){
        const grid = [];
        for (let i = 0; i < 20; i++) {
            const row=[]
           for (let j = 0; j < 80; j++) {
                row.push(CreateNode(j,i)); 
           }
            grid.push(row);
        }
        setMatrix(grid);
    }

    const CreateNode=(col,row)=>{
        return {
            col,
            row,
            isStart:col==START_NODE_COL && row==START_NODE_ROW,
            isFinish:col==FINISH_NODE_COL&&row==FINISH_NODE_ROW,
            isWall:false,
            isVisited:false,
            distance:Infinity,
            previousNode:null,
            
        }
    }

    //ANIMATION
   function animateAlgo(visitedNodes,shortestPath) {
        for (let i = 1; i <= visitedNodes.length-2; i++) {
            if(i==visitedNodes.length-2){
                setTimeout(() => {
                animateShortestPath(shortestPath);
          }, 12 * i);
            }
          setTimeout(() => {
            const node = visitedNodes[i];              
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-visited';
          }, 10*i );
        }
      }
    
    function animateShortestPath(shortestPath) {
        for (let i = 1; i < shortestPath.length; i++) {
          setTimeout(() => {
            const node = shortestPath[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path';
          }, 60 * i);
        }
      }

      //ALGO CALLS
    const handleDijkstra = ((event)=>{
       const visitedNodes= djikstra(matrix,matrix[START_NODE_ROW][START_NODE_COL],matrix[FINISH_NODE_ROW][FINISH_NODE_COL])
       const node=visitedNodes[visitedNodes.length-1];
       if(node.isFinish==true){
        const shortestPath=getShortestPath(node);
        animateAlgo(visitedNodes,shortestPath); 
       }else{
        
        handleOpen();
        console.log("NO WAY OUT")
       }
      
    })


    const handleAsearch= ((event)=>{
        matrix.forEach(node => {
            node.isVisited=false;
            node.previousNode=null;
        });
        const visitedNodes=aSearch(matrix,matrix[START_NODE_ROW][START_NODE_COL],matrix[FINISH_NODE_ROW][FINISH_NODE_COL])
        const node=visitedNodes[visitedNodes.length-1];  
        if(node.isFinish==true){
            const shortestPath=getShortestPathAsearch(node);
             animateAlgo(visitedNodes,shortestPath); 
            }else{
                handleOpen();
             console.log("NO WAY OUT")
            }
    })
    
    //support functions

    const handleWall = ((row,col)=>{
        const newGrid=matrix;
        const node=matrix[row][col];
        
        const newWallNode={
            ...node,
            isWall:!node.isWall,
        }
        newGrid[row][col]=newWallNode
        setMatrix(newGrid);
        
    })



    const handleClearMatrix= ((event)=>{

        setTimeout(()=>{setMatrix([])},4);
        setTimeout(()=>{fillTheGrid()},10);
        
    })

    const handleClearHalfMatrix= (()=>{
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                const currentNode=matrix[i][j];
                if(!(currentNode.isFinish||currentNode.isWall||currentNode.isStart)){
                    document.getElementById(`node-${i}-${j}`).className =
                  'node ';                
                }
            }
            
        }   
    })
    return (
        <>
        <Stack direction="row" spacing={2} pt={1} pl={1}>
            <Button variant="outlined" onClick={handleDijkstra} >Dijkstra algo</Button>
            <Button variant="outlined" onClick={handleAsearch}>A* algo</Button>
            <Button variant="outlined" onClick={handleClearMatrix}>Clear the grid</Button>
            <Button variant="outlined" onClick={handleClearHalfMatrix}>Clear the animation</Button>
        </Stack>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <MUIAlert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                There is now way to finish node!!
            </MUIAlert>
        </Snackbar>
        <div className="grid" >
        { matrix.map((row,rowIndex)=>{
            return(
            <div key={rowIndex}>    
            {row.map((node)=>{
                const {row,col,isStart,isFinish,isWall}=node;
                return(
                
                    <Node col={col} row={row} isStart={isStart} isFinish={isFinish} isWall={isWall} onClick={(row,col)=>handleWall(row,col)} onDragEnter={(row,col)=>handleWall(row,col)}  >
                    </Node>
                
                );
            })
            }   
            </div>
        ) 
        })
           
        }
        </div>
       
       </>
    )

}

export default Pathfinder;