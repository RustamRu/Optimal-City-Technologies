export interface IMessage {
  date: number;
  text: string;
}

export interface IUserMessage extends IMessage {
  author: 'user';
}

export interface IChatbotMessage extends IMessage {
  author: 'chatbot';
  reactions?: (keyof IUserReactions)[];
}

export interface IUserReactions {
  [key: string]: string;
}

export interface IChatbotResponsesMap {
  [key: string]: {
    text: string;
    reactions?: (keyof IUserReactions)[]
  };
}