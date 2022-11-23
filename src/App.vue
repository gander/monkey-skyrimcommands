<script setup lang="ts">
import {inject, reactive, ref, watch} from 'vue';
import {ExtractedPerk, Perk} from './types';

const perks: Perk[] = reactive(
    inject<ExtractedPerk[]>('perks', [])
        .map(perk => {
          const result = /^(?<group>.+)\s+(?<level>\d)$/.exec(perk.name)?.groups as { group: string, level: string } | null;
          return {...perk, selected: false, ...result};
        })
        .sort((a: Perk, b: Perk) => a.skill.localeCompare(b.skill)),
);
const output = ref('');

const reset = () => perks.forEach(perk => perk.selected = false);
const toggle = () => perks.forEach(perk => perk.selected = !perk.selected);
const selectAll = () => perks.forEach(perk => perk.selected = true);
const toggleGroup = (group: string) => perks.filter(perk => perk.group === group).forEach(perk => perk.selected = true);

watch(
    perks,
    () => output.value = perks
        .filter(perk => perk.selected)
        .map(perk => `; ${perk.skill} > ${perk.name}\nplayer.addperk ${perk.code}\n`)
        .join(`\n`),
);
</script>

<template>
  <textarea>{{ output }}</textarea>
  <div class="buttons">
    <button @click="reset" class="btn btn-info">Reset</button>
    <button @click="toggle" class="btn btn-info">Toggle</button>
    <button @click="selectAll" class="btn btn-info">Select All</button>
  </div>
  <table class="table table-hover">
    <thead>
    <tr>
      <th>Name</th>
      <th>Code</th>
      <th>Skill</th>
    </tr>
    </thead>
    <tbody>
    <template v-for="perk in perks" :key="perk.code">
      <tr @click="perk.selected = !perk.selected" :class="{'row-selected':perk.selected}">
        <td class="ts w-50">
          {{ perk.name }}
          <span
              v-if="perk.group && perk.level === '1'"
              class="toggle-group"
              @click.stop="toggleGroup(perk.group)"
              title="Select group"
          >&downarrow;</span>
        </td>
        <td class="ts w-25">{{ perk.code }}</td>
        <td class="ts w-25">{{ perk.skill }}</td>
      </tr>
    </template>
    </tbody>
  </table>
</template>

<style scoped>
textarea {
  width: 100%;
  height: 200px;
  font-family: monospace;
}

.buttons {
  padding: 15px 0;
}

.buttons button {
  margin-right: 5px;
}

.row-selected {
  background-color: darkgray;
  color: white;
}

.row-selected:hover {
  background-color: gray;
  color: white;
}

.toggle-group {
  float: right;
  cursor: pointer;
}
</style>