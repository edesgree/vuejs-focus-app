<script setup>
import { getInputRangeBackgroundSize } from '@/utils/utils';
import { ref, watch } from 'vue';
import { useSoundscapeStore } from '../stores';
import Audio from './Audio.vue';
import PlayPauseButton from './ui/PlayPauseButton.vue';
    defineProps({
        ambiance: Object
    })
    const store = useSoundscapeStore()
    const ambianceVolume = ref(0.5);
    const sliderVolumeMaxRange = 1;

    const togglePlayPause = () => {
        store.setCurrentAmbianceIsPlaying(!store.currentAmbiance.isPlaying);
    };
    const handleAmbianceVolumeChange = (e) => {
        ambianceVolume.value = e.target.value;
    };

// trigger play at ambiance change
watch(() => store.currentAmbiance, (newVal) => {
    console.log('current ambiance changed:', newVal);
    if (newVal ) {
        togglePlayPause();
    }
}, { immediate: true });


</script>
<template>
    <div class="ambiance">
        <header>
            <h2 class="title">{{ambiance.name}} <span>{{ambiance.emoji}}</span></h2>
            <div class="controls">
                
                <PlayPauseButton 
                :handleClickAction="togglePlayPause"
                :isContextActive="store.currentAmbiance.isPlaying"
                :title="ambiance.name" />
                <input
                    type="range"
                    min="0"
                    :max="sliderVolumeMaxRange"
                    step="0.01"
                    :value="ambianceVolume"
                    @input="handleAmbianceVolumeChange"
                    :style="getInputRangeBackgroundSize(ambianceVolume, sliderVolumeMaxRange)"
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
                :ambianceVolume="ambianceVolume"
                :isPlaying="store.currentAmbiance.isPlaying"
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