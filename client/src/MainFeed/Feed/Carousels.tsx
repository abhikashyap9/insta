import Carousel from "react-spring-3d-carousel";
import { useState, useEffect } from "react";
import { config } from "react-spring";
import { useSelector, useDispatch } from 'react-redux'
import {setInitialState} from '../../features/Storie/indexSlice.js'
import { useMatchMedia } from "../Sidebar/useMediaMatch.js";




export default function Carroussel(props) {
  const storyIndex=useSelector((state)=>state.storieIndex.initialIndex)
  const dispatch = useDispatch()

  console.log(props.cards)
  
  const table = props.cards.map((element, index) => { 
    return { ...element, onClick: () => setGoToSlide(index) };
  });
  

  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(0);
  const [cards] = useState(table);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
   
  }, [props.offset, props.showArrows]);
  // const isDesktopResolution = useMatchMedia("(min-width:600px)", true);

  // useEffect(()=>{
  // },[isDesktopResolution])

 
  dispatch(setInitialState(goToSlide))
 

  return (
    <div
      style={{ width: props.width, height: props.height, margin: props.margin }}
     
    >
    <div>Close</div>
      <Carousel
        slides={table}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
        // onChange={callback}     
      />
    </div>
  );
}