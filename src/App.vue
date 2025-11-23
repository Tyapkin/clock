<script setup>
import { computed } from 'vue';
import { useTime } from './composables/useTime';
import { useTheme } from './composables/useTheme';

const { localTime } = useTime();
const { theme, setTheme } = useTheme();

const formatTime = (date, timeZone) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: timeZone
  }).format(date);
};

const formattedLocalTime = computed(() => formatTime(localTime.value, undefined));
const formattedUtcTime = computed(() => formatTime(localTime.value, 'UTC'));

const themes = [
  { id: 'light', label: 'Светлая', icon: '☀️' },
  { id: 'dark', label: 'Темная', icon: '🌙' },
  { id: 'system', label: 'Системная', icon: '💻' },
];
</script>

<template>
  <div class="card">
    <div class="time-display">
      <div class="time-row">
        <span class="label">Местное время</span>
        <span class="time">{{ formattedLocalTime }}</span>
      </div>
      <div class="time-row">
        <span class="label">Время по UTC</span>
        <span class="time">{{ formattedUtcTime }}</span>
      </div>
    </div>

    <div class="theme-switcher">
      <button
        v-for="t in themes"
        :key="t.id"
        class="theme-btn"
        :class="{ active: theme === t.id }"
        @click="setTheme(t.id)"
        :title="t.label"
      >
        {{ t.icon }}
      </button>
    </div>

    <p class="educational-note">
      Учебный проект. В дальнейшем функционал будет расширяться.
    </p>
  </div>
</template>
