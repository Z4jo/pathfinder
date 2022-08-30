import React from "react";
import './Node.css';

function Node(props){

   const {
      col,
      row,
      isFinish,
      isStart,
      onClick,
      onDragEnter
    } = props;
    const [isWall,setWall]=React.useState(props.isWall)
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';


 return(
    <div id={`node-${row}-${col}`}
    className={`node ${extraClassName}`}
    onClick={()=>{onClick(row,col);
            setWall(!isWall);
   }} 
   onDragEnter={()=>{onDragEnter(row,col);
      setWall(!isWall);
   }}
    >
    </div>
 )

}


export default Node;