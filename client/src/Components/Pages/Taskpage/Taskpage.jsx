import React from 'react'
import './Taskpage.css'
import NavBar from '../Dashboard/NavBar/NavBar'

export const Taskpage = () => {
    return (
        <><NavBar />
            <div className="main">
                <div className="task-box">
                    <form action="">
                        <div className="input-taking">
                            <input
                                type="Title"
                                placeholder='Title'
                                required />
                        </div>
                        <div className="input-taking">
                            <input
                                type="Description"
                                placeholder='Description'
                                required />
                        </div>
                        <div className="input-taking">
                            <input
                                type="Deadline"
                                placeholder='Deadline'
                                required />
                        </div>
                        <div className="input-taking">
                            <input
                                type="Want to upload an image?"
                                placeholder='Want to upload an image?'
                                required />
                        </div>
                        <div className="button-container">
                            <button className="TaskButton">Create Task</button>
                        </div>
                    </form>
                </div>

            </div></>
    )
}
export default Taskpage
