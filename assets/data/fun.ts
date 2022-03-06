import {v4 as uuidv4} from 'uuid';

export function mCreateUUID() {
    console.log("uuid", uuidv4);
    
    return uuidv4();
}
