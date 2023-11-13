const commonFunction  = { 
    stringToHash: stringToHash
}

function stringToHash(key: string) { 
    let hash = 0;
    if(!key.length) return hash;
    for (let index = 0; index < key.length; index++) {
        const char = key.charCodeAt(index);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}

export default commonFunction