import {createApp} from 'vue';
import App from './App.vue';
import {ExtractedPerk} from './types';

const element = document.querySelector('.mobile-table');
if (element) {
    const perks: ExtractedPerk[] = Array.from(element.querySelectorAll('tbody tr'))
        .map(row => Array.from(row.querySelectorAll('td')).map(cell => cell.innerText))
        .filter((row): row is [string, string, string] =>
            row[0]?.length > 0 &&
            row[1]?.length > 0 &&
            row[2]?.length > 0 &&
            !row[1]?.includes('+'),
        )
        .map(([name, code, skill]) => ({name, code, skill}));

    createApp(App).provide('perks', perks).mount(element);
}
