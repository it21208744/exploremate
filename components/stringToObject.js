export function jsonStringToObject(inputString) {
  try {
    // Remove unnecessary escape characters from the input string
    const cleanedString = inputString.replace(/\\n/g, '\n').replace(/\\"/g, '"')

    // Parse the cleaned string into a JSON object
    const jsonObject = JSON.parse(cleanedString)

    return jsonObject
  } catch (error) {
    console.error('Error parsing JSON string:', error)
    return null
  }
}
