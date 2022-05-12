import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseName,
    choosePrice,
    chooseCam,
    chooseDescription,
    chooseFlight,
    chooseSpeed,
    chooseCost,
    chooseSeries,
    chooseWeight } from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface DroneFormProps {
    id?:string;
    data?:{}
}

interface DroneState {
    name: string;
    price: string;
    description:string;
    camera_quality:string;
    flight_time:string;
    max_speed:string;
    cost_of_production:string;
    weight:string;
    series:string;

}

export const DroneForm = (props:DroneFormProps) => {

    const dispatch = useDispatch();
    let { droneData, getData } = useGetData();
    const store = useStore()
    const name = useSelector<DroneState>(state => state.name)
    const price = useSelector<DroneState>(state => state.price)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await serverCalls.update(props.id!, data)
            console.log(`Updated:${data.name} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseName(data.name))
            dispatch(choosePrice(data.price))
            dispatch(chooseCam(data.camera_quality))
            dispatch(chooseDescription(data.description))
            dispatch(chooseCost(data.cost_of_production))
            dispatch(chooseWeight(data.weight))
            dispatch(chooseSeries(data.series))
            dispatch(chooseSpeed(data.max_speed))
            dispatch(chooseFlight(data.flight_time))

            await serverCalls.create(store.getState())
            window.location.reload()
            event.target.reset();
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Drone Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <Input {...register('price')} name="price" placeholder="100.00"/>
                </div>
                <div>
                    <label htmlFor="camera_quality">Camera Quality</label>
                    <Input {...register('camera_quality')} name="camera_quality" placeholder="4K"/>
                </div>
                <div>
                    <label htmlFor="flight_time">Flight Time</label>
                    <Input {...register('flight_time')} name="flight_time" placeholder="30 Min"/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder="This Drone Flies"/>
                </div>
                <div>
                    <label htmlFor="dimensions">Dimensions</label>
                    <Input {...register('dimensions')} name="dimensions" placeholder="10 in x 7 in"/>
                </div>
                <div>
                    <label htmlFor="max_speed">Max Speed</label>
                    <Input {...register('max_speed')} name="max_speed" placeholder="20 kmph"/>
                </div>
                <div>
                    <label htmlFor="weight">Weight</label>
                    <Input {...register('weight')} name="weight" placeholder="50 g"/>
                </div>
                <div>
                    <label htmlFor="cost_of_production">Cost Of Production</label>
                    <Input {...register('cost_of_production')} name="cost_of_production" placeholder="20.00"/>
                </div>
                <div>
                    <label htmlFor="series">Series</label>
                    <Input {...register('series')} name="series" placeholder="Series 87"/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}