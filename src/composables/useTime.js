import { ref, onMounted, onUnmounted } from 'vue';
import { format, toZonedTime } from 'date-fns-tz';

export function useTime() {
  const localTime = ref(new Date());
  const utcTime = ref(new Date());

  const updateTime = () => {
    const now = new Date();
    localTime.value = now;
    // UTC time is just the current time but we'll format it as UTC later, 
    // or we can store it as a date object and handle display.
    // Actually, let's just keep one source of truth 'now' and format it differently.
  };

  let intervalId;

  onMounted(() => {
    updateTime();
    intervalId = setInterval(updateTime, 1000);
  });

  onUnmounted(() => {
    clearInterval(intervalId);
  });

  return {
    localTime,
  };
}
