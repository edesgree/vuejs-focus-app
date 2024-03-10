<script setup>
import { useSoundscapeStore } from "../stores";
import Ambiance from './Ambiance.vue';
const store = useSoundscapeStore();
// load ambiances
store.getAmbiances();

// set current ambiance
const handleSelection = (ambiance) => {
    store.setCurrentAmbiance(ambiance.id)
}
</script>
<template>
    <div className="ambiances">
   
        <nav :class="['ambiancesList',{opened : store.currentAmbiance}]">
            <div v-for="ambiance in store.ambiances" :key="ambiance.id" @click="handleSelection(ambiance)">
                <button :class="store.getCurrentAmbianceId() === ambiance.id ? 'selected' : null">
                    {{ambiance.emoji}}
                </button>
            </div>
            <span v-if="store.loading" class="loading loading-spinner text-primary">...loading</span>
            <span v-if="store.error" aria-live="assertive">There was an error: {{store.error.message}}</span>
        </nav>
        
         <Ambiance v-if="store.currentAmbiance" :ambiance="store.currentAmbiance"/>
    </div>
</template>
<style scoped lang="scss">
nav.ambiancesList {
  background: rgba(black, .4);
  border-radius: 1rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  padding: 1rem;

  &.opened {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.selected {
  background-color: var(--light-blue);
}

.ambiances {
  margin: 0 auto 3rem auto;
  max-width: 350px;
}
</style>