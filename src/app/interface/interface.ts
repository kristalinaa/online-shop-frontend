export interface Condition {
  id: number;
  regex: string;
  description: string;
}



export interface ChatMessage {
  id?: number;
  body: string;
  createdAt: string; 
  isRead: boolean;
  mine?: boolean;

  sender: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    
  };

  recipient: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}
