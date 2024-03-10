export async function fetchAmbiances() {
    try {
        const response = await fetch('/api/ambiances');
        const ambiances = await response.json();
        return ambiances.ambiances;
    }
    catch (err) {
        console.log('Error getting ambiances', err);
        throw err;
    }
}

export async function fetchAudios() {
    try {
        const response = await fetch('/api/audios');
        const audios = await response.json();
        return audios.audios;
    }
    catch (err) {
        console.log('Error getting audios', err);
        throw err;
    }
}