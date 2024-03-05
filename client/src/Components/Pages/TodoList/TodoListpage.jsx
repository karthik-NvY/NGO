import React from 'react'
import './TodoListpage.css'
import causecraft from '../../Assets/causecraft_logo.png'

function TodoListpage() {
    return (
        <div className="wrap">
            <div className="leftside">
                <div className="NavBar">
                    <img src={causecraft} alt="Logo" className="logo" />
                </div>
                <div className="todo">
                    <h2>ToDo</h2>
                </div>
            </div>
            <div className="separator"></div>
            <div className="rightside">
                <form action="">

                    <div className="input-box">
                        <input
                            type="Name"
                            placeholder='Name'

                            required />

                    </div>
                    <div className="input-box">
                        <input
                            type="NGO"
                            placeholder='NGO'
                            required />
                    </div>
                    <div className="input-box">
                        <input
                            type="Date"
                            placeholder='Date'
                            required />
                    </div>
                    <div className="input-box">
                        <input
                            type="time"
                            placeholder='time'
                            required />
                    </div>
                    <div className="input-box">
                        <input
                            type="Deadline"
                            placeholder='Deadline'
                            required />
                    </div>
                    <button>Create Task</button>
                </form>
            </div >
        </div >

    )
}

export default TodoListpage