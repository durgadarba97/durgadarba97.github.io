// create react boiler plate component

import React from 'react'

// Octokit.js
// https://github.com/octokit/core.js#readme


// put image from the md as a class definition  
const Project = () => {
    const image = " ";  

    // get project markdowns
    async function getProjects() {
        projects = ["https  //github.com/durgadarba97/durgadarba97.github.io/ ",]

        const response = await fetch(projects[0]+ 'blob/main/README.md');
        const data = await response.json();
        console.log(data);
    }


    return (
        <div>
            <h1>Projects</h1>
            <img src={image} alt="Project" />
            <p>Project Description</p>
            <button onClick={getProjects}>Get Projects</button>
        </div>
    )
}

export default Project;
