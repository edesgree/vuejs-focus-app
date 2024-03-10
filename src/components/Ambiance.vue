<script setup>
import { getInputRangeBackgroundSize } from '@/utils/utils';
import { computed, ref } from 'vue';
import { useSoundscapeStore } from '../stores';
import PlayPauseButton from './ui/PlayPauseButton.vue';
import Audio from './Audio.vue';
    defineProps({
    name: String,
    ambiance: Object
    })
    const store = useSoundscapeStore()
    console.log('ambiance', store.currentAmbiance.id);
    const AmbianceVolume = ref(0.5);
    const sliderVolumeMaxRange = 1;

    const togglePlayPause = () => {
        store.setCurrentAmbianceIsPlaying();
    };
    const handleAmbianceVolumeChange = (e) => {
        setAmbianceVolume(e.target.value);
        console.log('ambiance volume', AmbianceVolume);
    };

    
 
    console.log('store.currentAmbianceAudios',store.currentAmbianceAudios.value)
</script>
<template>
    <div class="ambiance">
            <header>
                ambiance:
                <h2 class="title">{{name}} <span>{{icon}}</span></h2>
                <div class="controls">
                    
                    <PlayPauseButton 
                    :handleClickAction="togglePlayPause"
                    :initialDisabled="!store.currentAmbiance.isPlaying"
                    :title="name" />
                    <input
                        type="range"
                        min="0"
                        :max="sliderVolumeMaxRange"
                        step="0.01"
                        :value="AmbianceVolume"
                        :onChange="handleAmbianceVolumeChange"
                        :style="getInputRangeBackgroundSize(AmbianceVolume, sliderVolumeMaxRange)"
                        :disabled="!store.currentAmbiance.isPlaying"
                    />
                </div>

            </header>

            <div class="audioList">
                <Audio v-for="audio in store.currentAmbianceAudios" 
                    :key="audio.id"
                    :name="audio.name"
                    :file="audio.file"
                    :icon="audio.emoji"
                    :isAmbiancePlaying="isAmbiancePlaying"
                    :ambianceVolume="AmbianceVolume"
                    />
              
            </div>
        </div>
</template>
<style scoped lang="scss">
.audioList {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  padding: 1rem;
}

.ambiance {
  background-color: rgba(#333, .8);
  border-radius: 0 0 2rem 2rem;

  header {
    background: rgba(black, .3);
    display: flex;
    justify-content: space-between;
    padding: 1rem;

    .title {
      align-items: center;
      display: flex;
      font-size: 1rem;
      margin: 0;

      span {
        font-size: 2rem;
      }
    }

    .controls {
      align-items: center;
      display: flex;
      gap: 1rem;

      .button-toggle {
        font-size: 3rem;
      }

      input {
        width: 3rem;
      }
    }
  }
}
</style>