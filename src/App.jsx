import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/bee-1.png", matched: false },
  { "src": "/img/chicken-1.png", matched: false },
  { "src": "/img/allay-1.png", matched: false },
  { "src": "/img/cat-1.png", matched: false },
  { "src": "/img/ocelot-1.png", matched: false },
  { "src": "/img/fox-1.png", matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        // console.log('those cards match')
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        // console.log('those cards do not match')
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)


  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])


  return (
    <div className="App">
      <h1>MINECRAFT Match</h1>
      <button className='new-btn' onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p className='count'>Turns: {turns}</p>
    </div>
  )
}

export default App
