import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export const saveQuestions = async (id, questions) => {
  return await addDoc(collection(db, 'survey'), {
    id,
    questions
  })
}

export const saveAnswers = async (questionsId, answers) => {
  return await addDoc(collection(db, 'survey'), {
    questions_id: questionsId,
    answers
  })
}

export const getData = async () => {
  const querySnapshot = await getDocs(collection(db, 'survey'))
  const rankings = querySnapshot.docs.map(doc => doc.data())
  return rankings
}
