<script setup>
import { ref, defineProps } from 'vue';
import usePlayPauseButton from '../../composables/usePlayPauseButton';
// Define props
const props = defineProps({
  emoji: String,
  title: String,
  handleClickAction: Function

});
const isPlaying = ref(false);
const initialDisabled = ref(false);
const {isActive, handleClick} = usePlayPauseButton(false, props.handleClickAction);


</script>
<template>007
    {{ title }}
    <button
        :class="['button-toggle', 'button-play-pause', { 'fade':  !isActive }]"
        :title="isActive ? 'turn off ' + title: 'turn on '+ title"
        @click="handleClick"
    >
        <template v-if="emoji">
            {{emoji}}
        </template>
        <template v-else>
            <img v-if="isActive" src="@/assets/icons/pause.svg" alt="pause" aria-label="pause" />
            <img v-else src="@/assets/icons/play.svg" alt="play" aria-label="play" />
        </template>
       
    </button >
 

</template>
<style scoped>
</style>