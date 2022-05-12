import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'classic drone',
        price: "2000.00",
        description: "Redefine what's possible",
        camera_quality: '4k',
        flight_time: 'Approx 20mins',
        max_speed: '140 kph',
        dimensions: '255 x 312 x 127mm',
        weight: 'Approx 795g',
        cost_of_production: 450.00,
        series: 'DJI FPV Series'
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        choosePrice: (state, action) => { state.price = action.payload},
        chooseDescription: (state, action) => { state.description = action.payload},
        chooseCam: (state, action) => { state.camera_quality = action.payload},
        chooseFlight: (state, action) => { state.flight_time = action.payload},
        chooseSpeed: (state, action) => { state.max_speed = action.payload},
        chooseCost: (state, action) => { state.cost_of_production = action.payload},
        chooseWeight: (state, action) => { state.weight = action.payload},
        chooseSeries: (state, action) => { state.series = action.payload}
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName, choosePrice, chooseDescription, chooseSeries, chooseWeight, chooseCam, chooseFlight, chooseCost, chooseSpeed } = rootSlice.actions;