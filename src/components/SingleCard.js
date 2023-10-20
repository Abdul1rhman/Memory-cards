import React from 'react'
import { useEffect } from 'react'

function SingleCard({card, handelChoice, flipped, disabled}) {
  

  

  const handleClick=()=>{
    if(!disabled){
      handelChoice(card)
    }
    
  }
  return (
    <div>
        
          <div className='card'>
            <div className={flipped? 'flipped' : ''}>
              <img className='front' src={card.src} alt='img'
              // style={{
              //   transform: `rotateY(${showCards ? '0' : ''}deg)` 
              // }}
              />
              <img className='back' src='/img/cover.png' alt='img' onClick={handleClick}/>
            </div>
          </div>
        
        
        
    </div>
  )
}

export default SingleCard