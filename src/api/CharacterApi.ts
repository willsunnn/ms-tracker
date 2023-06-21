import { User } from 'firebase/auth';
import { AccountCharacters, defaultAccountCharacters } from '../models/character';
import { FireBaseApiHelper } from './FireBaseApiHelper';

const CHARACTER_COLLECTION = "Character"

// Storing Methods

const set = async (user: User, data: AccountCharacters): Promise<String> => {
    return await FireBaseApiHelper.set(user, CHARACTER_COLLECTION, data)
}

// Fetching Methods

const listen = (user: User, callback:(_:AccountCharacters)=>void, errCallback:(_:any)=>void) => {
    return FireBaseApiHelper.listen(user, CHARACTER_COLLECTION, callback, errCallback, defaultAccountCharacters, AccountCharacters.parse)
}

export const CharacterApi = {
    set,
    listen,
}