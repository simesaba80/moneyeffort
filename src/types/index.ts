// src/types/index.ts
export interface Goal {
  id: string;
  title: string;
  description: string;
  amount: number;
  deadline: string;
  achieved?: boolean;
}

export interface Achievement {
  id: string;
  goalId: string;
  dateAchieved: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  achievements: Achievement[];
}

export interface Rank {
  userId: string;
  rankLevel: number;
  rankName: string;
}
