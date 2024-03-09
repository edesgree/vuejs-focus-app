import { fetchAmbiances, fetchAudios } from '@/utils/api';
import { defineStore } from 'pinia';
import { ref } from 'vue'; // Import ref for reactive variables
export const useSoundscapeStore = defineStore('ambiances', () => {
    // State
    const ambiances = ref([]);

    const selectedAmbianceAudios = ref(["hello"]);
    const error = ref(null);
    const loading = ref(false);
    const selectedAmbiance = ref(null);
    const currentPlayingAmbiance = ref(null);

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
    const getAudios = async () => {
        loading.value = true;
        try {
            const data = await fetchAudios();
            selectedAmbianceAudios.value = data;
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
    const getSelectedAmbiance = () => selectedAmbiance.value;
    const getCurrentPlayingAmbiance = () => currentPlayingAmbiance.value;

    // Actions

    const setSelectedAmbiance = (ambianceId) => {
        selectedAmbiance.value = ambianceId;
        console.log('selected ambiance : ', ambianceId);
        setSelectedAmbianceAudios(getAudiosFiltered(ambianceId));
        console.log('selectedAmbianceAudios', selectedAmbianceAudios.value);
    };

    const setSelectedAmbianceAudios = (audios) => {
        selectedAmbianceAudios.value = audios;
    };

    const setCurrentPlayingAmbiance = (ambianceId) => {
        currentPlayingAmbiance.value = ambianceId;
    };
    const getAudiosFiltered = async (ambianceId) => {
        // get arrays of audios corresponding to the ambiance id
        const audiosId = ambiances.value.find((ambiance) => ambiance.id === ambianceId).audiosId;
        loading.value = true;
        if (!audiosId) {
            return []; // Handle undefined audiosId
        }
        try {
            const data = await fetchAudios();
            //filter the complete audio list to get only the audios corresponding to the audiosId list
            const dataFiltered = data.filter((audio) => audiosId.includes(audio.id));
            selectedAmbianceAudios.value = dataFiltered;
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
        selectedAmbianceAudios,
        error,
        loading,
        selectedAmbiance,
        currentPlayingAmbiance,
        getAmbiances,
        getAudios,
        getError,
        getLoading,
        getSelectedAmbiance,
        getCurrentPlayingAmbiance,
        getAudiosFiltered,
        setSelectedAmbiance,
        setCurrentPlayingAmbiance
    };
});
