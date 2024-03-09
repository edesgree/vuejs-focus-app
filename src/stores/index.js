import { fetchAmbiances, fetchAudios } from '@/utils/api';
import { defineStore } from 'pinia';
import { ref } from 'vue'; // Import ref for reactive variables
export const useSoundscapeStore = defineStore('ambiances', () => {
    // State
    const ambiances = ref([]);
    const test = ref("hello world");
    const audios = ref([]);
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
            audios.value = data;
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
    /*
    const loadAmbiances = async () => {
        loading.value = true;
        try {
            const data = await getAmbiances(); // Implement or import getAmbiances function
            ambiances.value = data;
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

    const loadAudios = async () => {
        loading.value = true;
        try {
            const data = await getAudios(); // Implement or import getAudios function
            audios.value = data;
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };
*/
    const setSelectedAmbiance = (ambianceId) => {
        selectedAmbiance.value = ambianceId;
    };

    const setCurrentPlayingAmbiance = (ambianceId) => {
        currentPlayingAmbiance.value = ambianceId;
    };

    // Return all variables and functions as needed
    return {
        test,
        ambiances,
        audios,
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

        setSelectedAmbiance,
        setCurrentPlayingAmbiance
    };
});
