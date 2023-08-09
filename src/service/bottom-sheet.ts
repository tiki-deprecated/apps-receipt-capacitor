import { useSwipe } from "@vueuse/core";
import type { UseSwipeDirection } from "@vueuse/core";

export class BottomSheetService {
  CloseUI(
    container: HTMLElement | null,
    target: HTMLElement | null
  ): { direction: string; lengthY: number } {
    /* const containerWidth = computed(() => container.value?.offsetWidth);
    const left = ref("0");
    const opacity = ref(1); */
    const { direction, lengthY } = useSwipe(target, {
      passive: false,
      /* onSwipe(e: TouchEvent) {
        if (containerWidth.value) {
          if (lengthX.value < 0) {
            const length = Math.abs(lengthX.value);
            left.value = `${length}px`;
            opacity.value = 1.1 - length / containerWidth.value;
          } 
        }
      },
      onSwipeEnd(e: TouchEvent, direction: UseSwipeDirection) {
        if (
          lengthX.value < 0 &&
          containerWidth.value &&
          Math.abs(lengthX.value) / containerWidth.value >= 0.5
        ) {
          left.value = "100%";
          opacity.value = 0;
        } else {
            left.value = "0";
            opacity.value = 1;
          }
      }, */
    });
    return { direction: direction.value, lengthY: lengthY.value };
  }
}
