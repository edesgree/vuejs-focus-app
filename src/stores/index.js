import { fetchAmbiances, fetchAudios } from '@/utils/api';
import { defineStore } from 'pinia';
import { ref } from 'vue'; // Import ref for reactive variables
export const useSoundscapeStore = defineStore('ambiances', () => {
    // State
    const ambiances = ref([]);

    const currentAmbianceAudios = ref([]);
    const error = ref(null);
    const loading = ref(false);
    /*
    const selectedAmbiance = ref(null);
    const currentPlayingAmbiance = ref(null);
    const selectedAmbianceIsPlaying = ref(false);
*/
    const currentAmbiance = ref(null);
    // Getters
    const getAmbiances = async () => {
        loading.value = true;
        try {
            const data = await fetchAmbiances();
            ambiances.value = data;
            return data;
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };
    const getAllAudios = async () => {
        loading.value = true;
        try {
            const data = await fetchAudios();
            currentAmbianceAudios.value = data;
            return data;
        }
        catch (err) {
            error.value = err;
        }
        finally {
            loading.value = false;
        }
    };

    const getError = () => error.value;
    const getLoading = () => loading.value;
    const getCurrentAmbianceId = () => currentAmbiance.value ? currentAmbiance.value.id : null;
    const getCurrentAmbianceIsPlaying = () => currentAmbiance.value.isPlaying;


    // Actions

    const setCurrentAmbiance = async (ambianceId) => {
        const selectedAmbiance = ambiances.value.find((ambiance) => ambiance.id === ambianceId);
        if (selectedAmbiance) {

            currentAmbiance.value = { ...selectedAmbiance, isPlaying: false };
            console.log('setCurrentAmbiance found match', currentAmbiance.value.id);
        } else {
            console.error(`No ambiance found with id ${ambianceId}`);
            return;
        }
        try {
            const audiosFiltered = await getAudiosFiltered(ambianceId);
            currentAmbianceAudios.value = audiosFiltered;
            console.log('list audios for this ambiance', currentAmbianceAudios.value);
        } catch (err) {
            console.error('Error filtering audios:', err);
        }


    };
    const setCurrentAmbianceIsPlaying = (isPlaying) => {
        if (currentAmbiance.value.id) {
            currentAmbiance.value.isPlaying = isPlaying;
        }
    };
    const setCurrentAmbianceAudios = (audios) => {
        currentAmbianceAudios.value = audios;
    };
    /*
        const setCurrentAmbianceIsPlaying = (ambianceId) => {
            if (currentAmbiance.value.id === ambianceId) {
                currentAmbiance.value.isPlaying = !currentAmbiance.value.isPlaying;
            }
        };
        */
    const getAudiosFiltered = async (ambianceId) => {
        // get arrays of audios corresponding to the ambiance id
        const audiosId = ambiances.value.find((ambiance) => ambiance.id === ambianceId).audiosId;
        loading.value = true;
        if (!audiosId) {
            console.log('this ambiance has no audios ids');
            return []; // Handle undefined audiosId
        }
        try {
            const data = await fetchAudios();
            //filter the complete audio list to get only the audios corresponding to the audiosId list
            const dataFiltered = data.filter((audio) => audiosId.includes(audio.id));

            console.log('getAudiosFiltered', currentAmbianceAudios.value);
            return dataFiltered;
        }
        catch (err) {
            error.value = err;
        }
        finally {
            loading.value = false;
        }
    };
    // Return all variables and functions as needed
    return {

        ambiances,
        currentAmbianceAudios,
        error,
        loading,
        currentAmbiance,
        getAmbiances,
        getAllAudios,
        getError,
        getLoading,
        getCurrentAmbianceId,
        getCurrentAmbianceIsPlaying,
        setCurrentAmbianceIsPlaying,
        setCurrentAmbiance,
        getAudiosFiltered
    };
});
