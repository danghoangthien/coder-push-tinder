export const ENDPOINT = process.env.REACT_APP_ENDPOINT

// feel free to modify this with your User ID ( please cordinate with User table )
const CURRENT_USER = process.env.REACT_APP_CURRENT_USER || '60c64a26d11ec6460f56e362'

export const getCurrentUserId = () => CURRENT_USER
