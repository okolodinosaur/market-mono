import { hash } from 'bcrypt';

const SOULT_ROUND = 5;

export async function hashIt(target: string): Promise<string> {
  return hash(target, SOULT_ROUND);
}
