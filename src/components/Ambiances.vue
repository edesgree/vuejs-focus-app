<script setup>
import { computed } from 'vue';
import { useSoundscapeStore } from "../stores";
import Ambiance from './Ambiance.vue';
const store = useSoundscapeStore();
// load ambiances
store.getAmbiances();


const handleSelection = (ambiance) => {
    console.log('handleSelection : ',ambiance)
    store.setCurrentAmbiance(ambiance.id)
    console.log('ambiance.id selected is : ',ambiance.id)
    console.log('current store ambiance obj',store.currentAmbiance.value)
    console.log('store.ambiances',store.ambiances)
}
</script>
<template>
    <div className="ambiances">
        <h2>Ambiances</h2>
   
        <nav class="ambiancesList">
            <div v-for="ambiance in store.ambiances" :key="ambiance.id" @click="handleSelection(ambiance)">
                <button :class="store.getCurrentAmbianceId() === ambiance.id ? 'selected' : null">
                    {{ambiance.emoji}}
                </button>
            </div>
        </nav>
        <span v-if="store.loading" class="loading loading-spinner text-primary">...loading</span>
        
         <h1 v-if="store.error" aria-live="assertive">There was an error: {{store.error.message}}</h1>
        
         
            <Ambiance v-if="store.currentAmbiance" :name="store.currentAmbiance.name"/>
        
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
  margin: 0 auto;
  max-width: 350px;
}
</style>