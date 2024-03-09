<script setup>
import { getInputRangeBackgroundSize } from '@/utils/utils';
import { ref } from 'vue';
import PlayPauseButton from './ui/PlayPauseButton.vue';
// Define props
const props = defineProps({
  
  isAmbiancePlaying: Boolean,
  ambianceVolume: Number, 
  icon:String,
  name:String,
  file:String
});

const volume = ref(0.5);
const sliderVolumeMaxRange = 1;
const isPlaying = ref(false);
const audioRef = ref(null);

const updateVolume = (event) => {
    const newVolume = parseFloat(event.target.value);
    volume.value = newVolume;
    // Access the audio element using $refs 
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
</script>
<template>
    
    <div>
{{ icon }}

        <PlayPauseButton 
        :handleClickAction="togglePlay"
        :initialDisabled="!isPlaying"
        :emoji="icon"
        :title="name" />
        
        !!
        <button @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</button>

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

.slider {
  margin: .25rem auto;
}

input[type='range'] {
  -webkit-appearance: none;
  background: grey;
  background-image: linear-gradient(white, white);
  background-repeat: no-repeat;
  border-radius: 5px;
  width: 3rem;
  height: $heightSlider;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 0 2px 0 #555;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  height: $heightSlider;
  width: $heightSlider;
}

input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  background: transparent;
  border: none;
  box-shadow: none;
}

input[type="range"]:hover::-webkit-slider-thumb {
  box-shadow: rgba(white, .5) 0px 0px 0px 4px;
}

input[type="range"]::-webkit-slider-thumb:active {
  box-shadow: rgba(white, .8) 0px 0px 0px 8px;
  transition: box-shadow 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, left 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, bottom 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

//when is disabled
input[type='range']:disabled {


  background-image: linear-gradient(rgba(white, .5), rgba(white, .5));
  cursor: not-allowed;
}
</style>