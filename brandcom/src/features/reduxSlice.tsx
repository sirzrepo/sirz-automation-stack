import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface IReduxState {
    toggleState: boolean;
    toggleShow: boolean;
    isDarkMode: boolean;
    showServices: boolean;
    isOpen: boolean;
    currentService: string | null
}

const initialState: IReduxState = {
    toggleState: false,
    toggleShow: false,
    isDarkMode: false,
    showServices: false,
    isOpen: false,
    currentService: ""
}

const slice = createSlice({
    name: "sliceInfo",
    initialState,
    reducers: {
        setToggleState(state, action: PayloadAction<boolean>) {
            state.toggleState = action.payload
        },
        setToggleShow(state, action: PayloadAction<boolean>) {
            state.toggleShow = action.payload
        },
        setIsDarkMode(state, action: PayloadAction<boolean>) {
            state.isDarkMode = action.payload
        },
        setShowServices(state, action: PayloadAction<boolean>) {
            state.showServices = action.payload
        },
        setIsOpen(state, action: PayloadAction<boolean>) {
            state.isOpen = action.payload
        },
        setCurrentService(state, action: PayloadAction<string | null>) {
            state.currentService = action.payload
        },
    }
})

export const allReduxSliceInfo = (state: RootState) => state.sliceInfo

export const {
    setToggleState,
    setToggleShow,
    setIsDarkMode,
    setCurrentService,
    setShowServices,
    setIsOpen,
} = slice.actions;
export default slice.reducer