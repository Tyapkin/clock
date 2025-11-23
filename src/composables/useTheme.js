import { ref, watch, onMounted, onUnmounted } from 'vue';

export function useTheme() {
    const theme = ref(localStorage.getItem('theme') || 'system');
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (newTheme) => {
        const root = document.documentElement;
        const isDark = newTheme === 'dark' || (newTheme === 'system' && mediaQuery.matches);

        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    };

    const handleSystemChange = () => {
        if (theme.value === 'system') {
            applyTheme('system');
        }
    };

    watch(theme, (newTheme) => {
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    onMounted(() => {
        applyTheme(theme.value);
        mediaQuery.addEventListener('change', handleSystemChange);
    });

    onUnmounted(() => {
        mediaQuery.removeEventListener('change', handleSystemChange);
    });

    return {
        theme,
        setTheme: (newTheme) => theme.value = newTheme
    };
}
