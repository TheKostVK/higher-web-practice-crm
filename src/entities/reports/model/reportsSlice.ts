import {createSlice} from "@reduxjs/toolkit";
import type {TClientActivityReportRow, TDealsStageReportRow, TNewClientReportRow, TOverdueTaskReportRow} from "../types";

type TReportsState = {
    isLoading: boolean,
    isError: boolean,
    errorText: string | undefined,
    reportDealsStage: TDealsStageReportRow[],
    reportNewClient: TNewClientReportRow[],
    reportClientActivity: TClientActivityReportRow[],
    reportTaskOverdue: TOverdueTaskReportRow[],
};

const initialState: TReportsState = {
    isLoading: false,
    isError: false,
    errorText: undefined,
    reportDealsStage: [],
    reportNewClient: [],
    reportClientActivity: [],
    reportTaskOverdue: []
};

export const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {},
    selectors: {
        selectorReportsIsLoading: (state) => state.isLoading,
        selectorReportsIsError: (state) => state.isError,
        selectorReportsErrorText: (state) => state.errorText,
        selectorReportDealsStageData: (state) => state.reportDealsStage,
        selectorReportNewClientData: (state) => state.reportNewClient,
        selectorReportClientActivityData: (state) => state.reportClientActivity,
        selectorReportTaskOverdueData: (state) => state.reportTaskOverdue,
    }
});

export const {
    selectorReportsIsLoading,
    selectorReportsIsError,
    selectorReportsErrorText,
    selectorReportDealsStageData,
    selectorReportNewClientData,
    selectorReportClientActivityData,
    selectorReportTaskOverdueData
} = reportsSlice.selectors;
