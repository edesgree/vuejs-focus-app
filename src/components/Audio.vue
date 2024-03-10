<script setup>
import { getInputRangeBackgroundSize } from '@/utils/utils';
import { onMounted, ref, watch } from 'vue';
import { useSoundscapeStore } from '../stores';
import PlayPauseButton from './ui/PlayPauseButton.vue';
// Define props
const props = defineProps({
    ambianceVolume:Number,
isPlaying:Boolean,
  icon:String,
  name:String,
  file:String
});
const store = useSoundscapeStore()
const volume = ref(0.5);
const sliderVolumeMaxRange = 1;
const isPlaying = ref(props.isPlaying);
const audioRef = ref(null);

const updateVolume = (event) => {
    const newVolume = parseFloat(event.target.value);
    volume.value = newVolume;
    // Access the audio element 
    const audioElement = audioRef.value;
    if (audioElement) {
    audioElement.volume = newVolume;
  }
};

const togglePlay = () => {
    const audioElement =  audioRef.value;
    if(audioElement){
        if (audioElement.paused) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    }
    
    isPlaying.value = !isPlaying.value
    
};
console.log('11',store.currentAmbiance.isPlaying)
// Watch for changes in currentAmbiance.value.isPlaying and update isPlaying ref
watch(() => store.currentAmbiance?.isPlaying, (newValue) => {
    isPlaying.value = newValue;
    const audioElement = audioRef.value; // Define audioElement inside the watch callback

    if(audioElement){
        if (isPlaying.value) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    }
});
watch(() => props.ambianceVolume, (newValue) => {
    volume.value = newValue;
    const audioElement = audioRef.value; // Define audioElement inside the watch callback

    if(audioElement){
        audioElement.volume = newValue;
    }
});
onMounted(()=>{
    console.log('audiomounted')
    if(isPlaying.value){
        const audioElement = audioRef.value;
        if(audioElement){
            audioElement.play();
        }
    }
    })
</script>
<template>
    
    <div class="audio">

        <PlayPauseButton 
        :handleClickAction="togglePlay"
        :initialDisabled="!store.currentAmbiance.isPlaying"
        :isContextActive="isPlaying"
        :emoji="icon"
        :title="name" />

        <div  class="slider">
            <input
                type="range"
                min="0"
                :max="sliderVolumeMaxRange"
                step="0.01"
                :value="volume"
                @input="updateVolume"
                :style="getInputRangeBackgroundSize(volume, sliderVolumeMaxRange)"
                :disabled="!isPlaying"
            />
        </div>

        <audio ref="audioRef" controls="false" loop>
      <source :src="file" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>

</div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";
@import "@/assets/scss/_colors.scss";

audio{
    display: none;
}
.audio{
    display: flex;
    align-items: center;
    flex-direction: column;
}
.slider {
  margin: .25rem auto;
}


</style>