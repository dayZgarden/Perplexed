import {collection} from '@firebase/firestore';
import { db } from '../firebase/fire';

const a = 1;

export const pointsRef = collection(db, 'userPoints')
