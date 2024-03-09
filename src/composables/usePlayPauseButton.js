
import { ref } from 'vue';

const usePlayPauseButton = (initialIsActive = false, onClickAction) => {
    const isActive = ref(initialIsActive);

    const handleClick = () => {
        isActive.value = !isActive.value;
        if (onClickAction) {
            onClickAction(); // call the provided onclick action
        }
    };

    return { isActive, handleClick };
};

export default usePlayPauseButton;
