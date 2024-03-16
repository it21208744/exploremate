import OpenAI from 'openai'
import { jsonStringToObject } from './stringToObject.js'

const apiKey = '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'

const openAIClient = new OpenAI({
  apiKey: apiKey,
})

export const generatePlans = async (location, dates, type) => {
  const query = `Give a ${dates} plan to ${location}. Give the answer as a json. like {
  "plan1": {
    "day": "Day 1",
    "actions": "Visit the local markets and try traditional African cuisine"
  },
  "plan2": {
    "day": "Day 2",
    "actions": "Go on a safari to see the amazing wildlife in their natural habitat"
  }
}. give only the json as answer. mention where to go. tour must be ${type}`
  const response = await openAIClient.chat.completions.create({
    messages: [
      { role: 'system', content: 'you are a helpful assistant' },
      { role: 'user', content: query },
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0,
  })

  // return response.choices[0].message
  console.log(response.choices[0].message.content)
  return jsonStringToObject(response.choices[0].message.content)
}

export const generateList = async () => {
  const query = `Give a ${dates} plan to ${location}. Give the answer as a json. like {
  "plan1": {
    "day": "Day 1",
    "actions": "Visit the local markets and try traditional African cuisine"
  },
  "plan2": {
    "day": "Day 2",
    "actions": "Go on a safari to see the amazing wildlife in their natural habitat"
  }
}. give only the json as answer. mention where to go. tour must be ${type}`
  const response = await openAIClient.chat.completions.create({
    messages: [
      { role: 'system', content: 'you are a helpful assistant' },
      { role: 'user', content: query },
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0,
  })

  return response.choices[0].message
}
