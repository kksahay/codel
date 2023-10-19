import { createContext, useContext } from "react";

const selectionContext = createContext({
    configSelection: () => {}
});

export const useSelection = () => {
    return useContext(selectionContext);
}

export const SelectionProvider = selectionContext.Provider;