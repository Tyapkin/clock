import { ref, watch, onMounted } from 'vue';

export function useTheme() {
    const theme = ref(localStorage.getItem('theme') || 'system');

    const applyTheme = (newTheme) => {
        const root = document.documentElement;
        const isDark = newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    };

    watch(theme, (newTheme) => {
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    onMounted(() => {
        applyTheme(theme.value);

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (theme.value === 'system') {
                applyTheme('system');
            }
        });
    });

    return {
        theme,
        setTheme: (newTheme) => theme.value = newTheme
    };
}
