// creates new Simulation
let simulation = new Simulation();

/**
    Simulation loop
*/
let lastRender = 0;

function gameLoop(timeStamp)
{
    let progress = (timeStamp - lastRender);

    simulation.update(progress);
    simulation.render();

    lastRender = timeStamp;

    window.requestAnimationFrame(this.gameLoop.bind(this));
}

window.requestAnimationFrame(this.gameLoop.bind(this));
