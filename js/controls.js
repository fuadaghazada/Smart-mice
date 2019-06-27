// Game controls will be handled
document.addEventListener('keydown', (event) => {
    // Space
    if (event.keyCode === 32)
    {
        simulation.state = Simulation.states().CONTINUE;
    }

    // R
    if (event.keyCode === 82)
    {
        console.log("Population restarted!");
        simulation.population = new Population(POPULATION_SIZE, MUTATION_RATE, simulation.cheese);
    }

    // C
    if (event.keyCode === 67)
    {
        console.log("Traps are cleared!");
        simulation.traps = [];
    }
});
