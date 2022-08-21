import { db } from '../firebase/fire';

export default async function getUserData(UID) {
    return await db().ref(`Users/${UID}`).once('value');
  }