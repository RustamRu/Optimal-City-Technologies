import { IChatbotResponsesMap, IUserReactions } from "../types/types"

export const userReactions: IUserReactions = {
  pizza: 'Закажи пиццу',
  alarm: 'Установи будильник',
  weather: 'Какая сегодня погода?',
  thanks: 'Спасибо!',
}

export const chatbotResponsesMap: IChatbotResponsesMap = {
  initial: {
    text: 'Привет! Что я могу для вас сделать?',
    reactions: ['pizza', 'alarm', 'weather'],
  },
  pizza: {
    text: 'Я заказала пиццу "Пепперони"',
    reactions: ['thanks']
  },
  alarm: {
    text: 'Я установила будильник на 8:00',
    reactions: ['thanks']
  },
  weather: {
    text: 'Сегодня будет солнечно',
    reactions: ['thanks']
  },
  thanks: {
    text: 'Рада помочь!',
  },
  unknown: {
    text: 'Не поняла вас. Чем я могу помочь?',
    reactions: ['pizza', 'alarm', 'weather'],
  }
}