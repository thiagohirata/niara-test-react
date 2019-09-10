import React, {
    useEffect,
    useLayoutEffect,
    useMemo
} from "react";
import Popper from "popper.js";

const usePopper = (parentRef, popperRef, options) => {
    useLayoutEffect(() => {
        if (parentRef.current) {
            const popper = new Popper(
                parentRef.current,
                popperRef.current,
                {
                    removeOnDestroy: true,
                    ...options
                }
            );
            return () => popper.destroy();
        }
    }, [parentRef, popperRef]);
};

export default usePopper;
