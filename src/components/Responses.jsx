import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getData } from './firestore'

export default function Responses () {
  const { id } = useParams()
  const [data, setData] = useState([])
  const [questions, setQuestions] = useState([])

  const fetch = async () => {
    const data = await getData()
    const elements = []
    data.forEach((element) => {
      if (element.questions_id === id) {
        elements.push(element)
      }
    })
    const found = data.find(element => element.id === id)
    setData(elements)
    setQuestions(found)
  }

  const idGenerator = () => {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let randomNumber = 0

    for (let i = 0; i < 6; i++) {
      randomNumber += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return randomNumber
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div className='bg-dark text-white'>
      <div className='container'>
        <h1>Responses:</h1>
        {data.map(element => (
          <div className='d-flex flex-column' key={idGenerator()}>
            <div className='mt-5'>
              {element.answers.map((answer, index) => (
                <div className='card border-white bg-dark mb-3 rounded p-2' key={idGenerator()}>
                  <h2>{questions.questions[index]}</h2>
                  <p>{answer}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ height: '350px' }} />
      </div>
    </div>
  )
}
