import OpenAI from 'openai'
import { jsonStringToObject } from './stringToObject.js'
//import 

const apiKey = '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'

const openAIClient = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true 
})

export const generatePlans = async (location, dates, type) => {
  const query = `Give a ${dates} plan to ${location}. Give the answer as a json. like 
  {
  "plan1": {
    "day": "Day 1",
    "actions": "Visit the local markets and try traditional African cuisine"
  },
  "plan2": {
    "day": "Day 2",
    "actions": "Go on a safari to see the amazing wildlife in their natural habitat"
  }
}. 

give only the json as answer. mention where to go. tour must be ${type}`
  const response = await openAIClient.chat.completions.create({
    messages: [
      { role: 'system', content: 'you are a helpful assistant' },
      { role: 'user', content: query },
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0,
  })

  return jsonStringToObject(response.choices[0].message.content)
}

export const generateList = async (descSituation, temp, windSpeed) => {
  const query = `Give a packing list. Consider these things when creating the list. 
  The location Im planning to go is ${descSituation}.
  And the temperature of that location is ${temp}.
  And the wind-speed of that location is ${windSpeed}

  
  Give the answer as a json. like 
  {
  "Item1": {
    "ItemName": "Warm clothing",
    "ReasonToChoose": "Because of the cold temperatures"
  },
  "Item2": {
    "ItemName": "Umbrella",
    "ReasonToChoose": "Because of the high sunlight due to less clouds"
  }
}. 

give all the necessary items. give at least 10 items. 
mention what weather condition causes to choose the certain item.
give only the json as answer. mention the specific item name.`
  const response = await openAIClient.chat.completions.create({
    messages: [
      { role: 'system', content: 'you are a helpful assistant' },
      { role: 'user', content: query },
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0,
  })
  return jsonStringToObject(response.choices[0].message.content)
}

//---------------------Budget Planning-------------------------------
//and ${FilterTaxiList}
export const budgetPlanning = async (NumDays,filtereHotelList,FilterTaxiList) => {
  let relatedHotels = []

  filtereHotelList.forEach((hotel)=>{
      relatedHotels.push({
        id:hotel._id,
        HotelName:hotel.HotelName,
        Description:hotel.Description,
        Price: hotel.Amenties,
        TotalExpense:hotel.Amenties*NumDays

      })
    })

    if (relatedHotels.length == 0)
      return 

    const stringObj = JSON.stringify(relatedHotels)
    
    
  
  const query = `Give a ${NumDays} plan to each hotel in the following list of object. 
  ${stringObj}

  Only using this list of object Give the answer as a json. dont add anything from yourself.  use below template. 
  {
  "Hotel1": {
    "id": "66327d788f64da6a03363577" //replace this with given id in the list of objects
    "HotelName": "Galadari",
    "costPerNight": 1000,
    "Description": "This has the best sea view  among others. And this is also located near a forest.",
    "TotalExpense": Leave this as it is
    "Plan":{
      "morning": "Use description for this",
      "evening": "Use description for this",
      "night": "Use description for this"
    }
  }
}. 

calculate the total expense using this equation. number of days * cost per night
give only the json as answer. `
  const response = await openAIClient.chat.completions.create({
    messages: [
      { role: 'system', content: 'you are a helpful assistant' },
      { role: 'user', content: query },
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0,
  })

  
 
  return jsonStringToObject(response.choices[0].message.content)

}


