import { User } from 'firebase/auth';
import { AccountCharacters, Character, defaultAccountCharacters } from '../models/character';
import { FireBaseApiHelper } from './FireBaseApiHelper';

const CHARACTER_COLLECTION = "Character"

// Storing Methods

const setUsingUid = async (uid: string, data: AccountCharacters): Promise<String> => {
    return await FireBaseApiHelper.set(uid, CHARACTER_COLLECTION, data)
}

const set = async (user: User, data: AccountCharacters): Promise<String> => {
    return await setUsingUid(user.uid, data);
}

const addCharacter = async (user: User, newCharacter: Character): Promise<AccountCharacters> => {
    if(!newCharacter) throw new Error('Character is undefiend');
    if(!(newCharacter.name) || newCharacter.name.trim().length===0) throw new Error('Character name is invalid');
    const characters = await get(user);
    const alrHasCharacter = characters.characters.find(c => c.name === newCharacter.name);
    if (alrHasCharacter) {
        throw new Error(`cannot add ${newCharacter.name} as ${newCharacter.name} already exists`);
    } else {
        characters.characters.push(newCharacter);
        await set(user, characters);
        return characters;
    }
}

// Fetching Methods

const getUsingUid = async (uid: string): Promise<AccountCharacters> => {
    return await FireBaseApiHelper.get(uid, CHARACTER_COLLECTION, defaultAccountCharacters, AccountCharacters.parse)
}

const get = async (user: User): Promise<AccountCharacters> => {
    return await getUsingUid(user.uid);
}

const listen = (user: User, callback:(_:AccountCharacters)=>void, errCallback:(_:any)=>void) => {
    return FireBaseApiHelper.listen(user.uid, CHARACTER_COLLECTION, callback, errCallback, defaultAccountCharacters, AccountCharacters.parse)
}

export const CharacterApi = {
    set,
    addCharacter,
    listen,

    // these two are neede by the CloudFunction
    setUsingUid,
    getUsingUid,
}