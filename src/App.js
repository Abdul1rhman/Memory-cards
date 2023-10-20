import { useEffect, useState } from 'react';
import './App.css'
import SingleCard from './components/SingleCard';
import Confetti from 'react-confetti'
const cardImage =[
  {"src":"/img/helmet-1.png", matched:false},
  {"src":"/img/potion-1.png", matched:false},
  {"src":"/img/ring-1.png", matched:false},
  {"src":"/img/scroll-1.png",matched:false},
  {"src":"/img/shield-1.png", matched:false},
  {"src":"/img/sword-1.png", matched:false}
]

function App() {
  const [cards, setCards]=useState([]);
  const [turns ,setTurns]=useState(0);
  const [choiceOne, setChoiceOne]=useState(null);
  const [choiceTwo, setChoiceTwo]=useState(null);
  const [disabled, setDisabled] = useState(false);
  const [finshed, setFinshed] = useState(0)
  //shuffle cards
  const shuffleCards = () =>{
    const shuffledCards = [...cardImage,...cardImage]
    .sort(()=>Math.random() - 0.5)
    .map((card) =>({...card, id: Math.random() }))
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards)
    setTurns(0)
    
  }

  const handelChoice=(card)=>{
    if(card.id === choiceOne?.id) return;
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    
    
  }

  useEffect (() =>{
    if(choiceOne && choiceTwo){
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src ){
        setCards(prevCards => {
          return prevCards.map(card =>{
            if(card.src === choiceOne.src){
              finshedd()
              return {...card, matched:true}
            }
            else{
              return card
            }
          })
        })
        restTurns()
      }else{
        
        setTimeout(()=>restTurns(),400)
      }

    }
    
  }, [choiceOne, choiceTwo])

  console.log(cards)

  const restTurns = () =>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)

    setTurns(prevTurns => prevTurns + 1 )
  }
  const finshedd = () =>{
    setFinshed(prevfinshed => prevfinshed + 1);
  }

  useEffect(()=>{
    shuffleCards()
  },[])

  

  
  const allMatched = cards.every(item => item.matched);
  
  return (
    
    <div className="App">
    {allMatched&& <Confetti/>}
      {/* <h1>Magic Match</h1> */}
      <button onClick={shuffleCards}>New Game</button>
      
      
      <h2>Turns: {turns}</h2>
      <h2>{allMatched? turns===6?'excellent':turns>6&&turns<10 ?'average':'you should try harder':'' }</h2>
      
      <div className='card-grid'>
        
        {cards.map(card =>(
          <SingleCard key={card.id} card={card} handelChoice={handelChoice} 
          flipped={card === choiceOne || card ===choiceTwo || card.matched}
          disabled={disabled}
          
          />
            ))}
      </div>
      
      
        
     
    </div>
  );
}

export default App