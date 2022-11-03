<script setup lang="ts">
import {inject, reactive, ref, watch} from 'vue';
import {ExtractedPerk, Perk} from './types';

const perks: Perk[] = reactive(
    inject<ExtractedPerk[]>('perks', [])
        .map(perk => ({...perk, selected: false}))
        .sort((a: Perk, b: Perk) => a.skill.localeCompare(b.skill)),
);
const output = ref('');

watch(
    perks,
    () => output.value = perks
        .filter(perk => perk.selected)
        .map(perk => `# ${perk.skill} > ${perk.name}\nplayer.addperk ${perk.code}\n`)
        .join(`\n`),
);
</script>

<template>
  <textarea>{{ output }}</textarea>
  <table class="table table-hover">
    <thead>
    <tr>
      <th>Name</th>
      <th>Code</th>
      <th>Skill</th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="perk in perks"
        :key="perk.code"
        @click="perk.selected = !perk.selected"
        :class="['bg-gradient', {'bg-success': perk.selected}]"
    >
      <td class="ts w-50">{{ perk.name }}</td>
      <td class="ts w-25">{{ perk.code }}</td>
      <td class="ts w-25">{{ perk.skill }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
textarea {
  width: 100%;
  height: 200px;
  font-family: monospace;
}
</style>