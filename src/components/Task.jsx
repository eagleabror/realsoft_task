import moment from 'moment/moment';
import React, { useState } from 'react'

const Task = () => {

    const date = new Date()

    const hour = date.getHours();
    
    const minute = date.getMinutes()

    const taskDate = `${hour}:${minute}`

    const day = date.getDate()

    const month = date.getMonth() + 1

    const year = date.getFullYear()

    const fullData = `${day}.${month}.${year}`

    const dateNumber = +fullData.slice(0, 2) + 1

    const id = date.getTime()

    const [taskInput, setTaskInput] = useState('')
    const [taskInputError, setTaskInputError] = useState(false)

    const [data, setData] = useState([])
    console.log(data);

    const [showModal, setShowModal] = useState(false);

    const [selectDate, setSelectDate] = useState('')
    const [selectTime, setSelectTime] = useState('')

    const handleAddTime = () => {
        if (taskInput.length == 0) {
            setTaskInputError(true)
        } else {
            setShowModal(true)
            setTaskInputError(false)
        }
    }

    const handleDone = () => {
        if (selectDate.length == 0 || selectTime.length == 0) {
            alert("Tanla")
        } else {
            setShowModal(false)
            setSelectDate('')
            setSelectTime('')
            const newTask = {
                time: selectTime,
                name: taskInput,
                id: id,
                checked: false,
                date: moment(selectDate).format("DD.MM.YYYY"),
            }
            setData([...data, newTask])
            console.log(dateNumber)
        }
    }

    const taskChecked = (e, task) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === task.id) {
                data[i].checked = !data[i].checked
                setData([...data])
            }
        }
    }

    console.log("keyin", data.filter((d) => d.date.slice(0, 2) > dateNumber));
    console.log("data", data);
    console.log("ertaga", data.filter((d) => d.date.slice(0, 2) == dateNumber));

    return (
        <div className='container max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16'>
            <h1 className='text-center'>Vazifalar Menedjeri</h1>
            <div className='w-full max-w-sm mx-auto px-4 py-2 flex flex-row'>
                <input
                    type="text"
                    className={`bg-transparent border-[2px] rounded w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none ${taskInputError ? "border-[red]" : ""}`}
                    placeholder="Yangi vazifa qo'shish"
                    onChange={(e) => setTaskInput(e.target.value)}
                />
                <button
                    className="flex-shrink-1 bg-teal-500 hover:bg-teal-700 border-teal-400 hover:border-teal-400 text-sm border-2 py-1 px-2 rounded"
                    type="submit"
                    onClick={handleAddTime}
                >
                    +
                </button>
            </div>
            <div className='max-w-sm mx-auto px-4'>
                {showModal && (
                    <>
                        <div className='border p-2 flex flex-col gap-2'>
                            <h1 className='text-[1.5rem]'>Vazifa bajarilish vaqtini tanlang</h1>
                            <input type="date" onChange={(e) => setSelectDate(e.target.value)} />
                            <input className='focus:outline-none' type="time" onChange={(e) => setSelectTime(e.target.value)} />
                            <button className="flex-shrink-1 bg-teal-500 hover:bg-teal-700 border-teal-400 hover:border-teal-400 text-[1rem] border-2 text-white py-1 px-2 rounded" onClick={handleDone}>Qo'shish</button>
                        </div>
                    </>
                )}
            </div>
            <div>
                <div className='max-w-sm mx-auto px-4'>
                    <h1>Bugun: {fullData}, {taskDate}</h1>
                </div>
                <div className='max-w-sm mx-auto px-4'>
                    <h1 className='text-[2rem] font-bold'>Bugun</h1>
                    <div className='px-4'>
                        {data.filter((d) => d.date == fullData).length == 0 ? <h1 className='text-[red] text-[1.2rem] font-semibold'>Sizda vazifalar yo'q</h1> :
                            <>
                                {data.filter((d) => d.date == fullData).sort((e, f) => new Date(`2023-11-18T${e.time}:00`) - new Date(`2023-11-18T${f.time}:00`)).map((d) => {
                                    return (
                                        <>
                                            <div className='flex flex-row justify-between align-center' key={d.id}>
                                                <div className='flex gap-2 align-center'>
                                                    <input type="checkbox" onChange={(e) => taskChecked(e.target.checked, d)} />
                                                    <span className={d.checked ? 'line-through' : ''}>{d.name}</span>
                                                </div>
                                                <span>{d.time}</span>
                                            </div>
                                        </>
                                    )
                                })}
                            </>
                        }
                    </div>
                </div>
                <div className='max-w-sm mx-auto px-4'>
                    <h1 className='text-[2rem] font-bold'>Ertaga</h1>
                    <div className='px-4'>
                        {data.filter((d) => d.date.slice(0, 2) == dateNumber).length == 0 ? <h1 className='text-[red] text-[1.2rem] font-semibold'>Sizda vazifalar yo'q</h1> :
                            <>
                                {data.filter((d) => d.date.slice(0, 2) == dateNumber).sort((e, f) => new Date(`2023-11-18T${e.time}:00`) - new Date(`2023-11-18T${f.time}:00`)).map((d) => {
                                    return (
                                        <>
                                            <div className='flex flex-row justify-between align-center' key={d.id}>
                                                <div className='flex gap-2 align-center'>
                                                    <input type="checkbox" onChange={(e) => taskChecked(e.target.checked, d)} />
                                                    <span className={d.checked ? 'line-through' : ''}>{d.name}</span>
                                                </div>
                                                <span>{d.time}</span>
                                            </div>
                                        </>
                                    )
                                })}
                            </>
                        }
                    </div>
                </div>
                <div className='max-w-sm mx-auto px-4'>
                    <h1 className='text-[2rem] font-bold'>Keyin</h1>
                    <div className='px-4'>
                        {data.filter((d) => d.date.slice(0, 2) > dateNumber).length == 0 ? <h1 className='text-[red] text-[1.2rem] font-semibold'>Sizda vazifalar yo'q</h1> :
                            <>
                                {data.filter((d) => d.date.slice(0, 2) > dateNumber).sort((e, f) => new Date(`2023-11-18T${e.time}:00`) - new Date(`2023-11-18T${f.time}:00`)).map((d) => {
                                    return (
                                        <>
                                            <div className='flex flex-row justify-between align-center' key={d.id}>
                                                <div className='flex gap-2 align-center'>
                                                    <input type="checkbox" onChange={(e) => taskChecked(e.target.checked, d)} />
                                                    <span className={d.checked ? 'line-through' : ''}>{d.name}</span>
                                                </div>
                                                <span>{d.date},{d.time}</span>
                                            </div>
                                        </>
                                    )
                                })}
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className='max-w-sm mx-auto px-6 py-4 text-right'>
                <p>Bajarilganlar: {data.filter((e) => e?.checked == true).length}</p>
                <p>Bajarilmaganlar: {data.filter((e) => e?.checked == false).length}</p>
            </div>
        </div>
    )
}

export default Task