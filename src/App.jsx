import { useState } from 'react'
import './App.css'
import { saveQuestions } from './components/firestore'

export default function App () {
  const [question1, setQuestion1] = useState('')
  const [question2, setQuestion2] = useState('')
  const [question3, setQuestion3] = useState('')
  const [question4, setQuestion4] = useState('')
  const [alert, setAlert] = useState(false)
  const [url, setUrl] = useState('')

  const handleChange = (e) => {
    switch (e.target.id) {
      case 'question1':
        setQuestion1(e.target.value)
        break
      case 'question2':
        setQuestion2(e.target.value)
        break
      case 'question3':
        setQuestion3(e.target.value)
        break
      case 'question4':
        setQuestion4(e.target.value)
        break
      default:
    }
  }

  const idGenerator = () => {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let randomNumber = 0

    for (let i = 0; i < 6; i++) {
      randomNumber += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return randomNumber
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const clean1 = question1.trim()
    const clean2 = question2.trim()
    const clean3 = question3.trim()
    const clean4 = question4.trim()
    if (clean1 === '' || clean2 === '' || clean3 === '' || clean4 === '') {
      setAlert(true)
      setTimeout(() => setAlert(false), 1500)
    } else {
      const id = idGenerator()
      const questions = [question1, question2, question3, question4]
      saveQuestions(id, questions)
      setQuestion1('')
      setQuestion2('')
      setQuestion3('')
      setQuestion4('')
      setUrl(id)
    }
  }

  return (
    <div className='vh-100 bg-dark text-white'>
      <div className='container form-content'>
        {url
          ? <div>
            <h2>Share your form: <a href={`http://127.0.0.1:5173/${url}`}>http://127.0.0.1:5173/{url}</a></h2>
            <h2>View the answers: <a href={`http://127.0.0.1:5173/${url}/responses`}>http://127.0.0.1:5173/{url}/responses</a></h2>
          </div>
          : <form className='w-50' onSubmit={handleSubmit}>
            {alert ? <h1 className='text-danger'>Please complete the form</h1> : ''}
            <div className='mb-3 mt-4'>
              <label htmlFor='question1' className='form-label'>Question one</label>
              <input type='text' onChange={handleChange} className='form-control' id='question1' value={question1} />
            </div>
            <div className='mb-3'>
              <label htmlFor='question2' className='form-label'>Question two</label>
              <input type='text' onChange={handleChange} className='form-control' id='question2' value={question2} />
            </div>
            <div className='mb-3'>
              <label htmlFor='question3' className='form-label'>Question three</label>
              <input type='text' onChange={handleChange} className='form-control' id='question3' value={question3} />
            </div>
            <div className='mb-3'>
              <label htmlFor='question4' className='form-label'>Question four</label>
              <input type='text' onChange={handleChange} className='form-control' id='question4' value={question4} />
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
            </form>}
      </div>
    </div>
  )
}
