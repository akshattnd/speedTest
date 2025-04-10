export interface Result {
  _id: string;
  userId: string;
  wpm: number;
  accuracy: number;
  testId: string;
  timeTaken: string;
  createdAt: Date;
  updatedAt?: Date;
}
export interface User {
  _id: string;
  username: string;
  email: string;
  password?: string;
  results: string[];
  createdAt: Date;
}
export interface TestResult {
  start: boolean, wpm: number, accuracy: number, testId: string, timeTaken: number
}
export interface Test {
  success: boolean, data: string[];
}