import React, { useState } from 'react'

const Task = () => {

    const date = new Date()

    const hour = date.getHours();
    const minute = date.getMinutes()

    const taskDate = `${hour}:${minute}`
    
    const day = date.getDate()

    const month = date.getMonth()+1

    const year = date.getFullYear()

    const fullData = `${day}.${month}.${year}`

    const [taskInput, setTaskInput] = useState('')
    const [taskInputError, setTaskInputError] = useState(false)

    const [data, setData] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (taskInput.length == 0) {
            setTaskInputError(true)
        } else {
            const newTask = {
                time: taskDate,
                name: taskInput,
                id: new Date().getTime(),
                checked: false,
                date: fullData
            }
            setData([...data, newTask ])
            setTaskInputError(false)
        }
    }

    const taskChecked = (e, task) => {
        for (let i = 0; i < data.length; i++) {
            if(data[i].id === task.id){
                data[i].checked = !data[i].checked
                setData([...data])
            }
        }
    }

    return (
        <div className='container max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16'>
            <h1 className='text-center'>Vazifalar Menedjeri</h1>
            <form className='w-full max-w-sm mx-auto px-4 py-2 flex flex-row' onSubmit={handleSubmit}>
                <input
                    type="text"
                    className={`bg-transparent border-[2px] rounded w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none ${taskInputError ? "border-[red]" : ""}`}
                    placeholder="Yangi vazifa qo'shish"
                    onChange={(e) => setTaskInput(e.target.value)}
                />
                <button
                    className="flex-shrink-1 bg-teal-500 hover:bg-teal-700 border-teal-400 hover:border-teal-400 text-sm border-2 text-white py-1 px-2 rounded"
                    type="submit"
                >
                    +
                </button>
            </form>
            <div>
                <div className='max-w-sm mx-auto px-4'>
                    <h1>Bugun: {fullData}</h1>
                </div>
                <div className='max-w-sm mx-auto px-4'>
                    <h1 className='text-[2rem] font-bold'>Bugun</h1>
                    <div className='px-4'>
                        {data.filter((e) => e !== true).map((d) => {
                            return(
                                <>
                                    <div className='flex flex-row justify-between align-center' key={d.id}>
                                        <div className='flex gap-2 align-center'>
                                            <input type="checkbox" onChange={(e) => taskChecked(e.target.checked, d)}/>
                                            <span className={d.checked ? 'line-through' : ''}>{d.name}</span>
                                        </div>
                                        <span>{d.time}</span>
                                    </div>
                                </>
                            )
                        })}
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