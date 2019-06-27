/**
    Simulation class:

    @author: Fuad Aghazada
    @data: ---
    @version: 1.0.0
*/

// ** - PARAMETERS - **
POPULATION_SIZE = 200;
MUTATION_RATE = 0.1;

class Simulation
{
    /**
        Constructor for Simulation Object
    */
    constructor()
    {
        this.init();
    }

    /**
        Initializing the properties of the simulation class
    */
    init()
    {
        let canvas = Simulation.canvas();

        // -- State --
        this.state = Simulation.states().START;

        // -- Simulation elements --
        // Cheese
        this.cheese = new Cheese(canvas.width / 2, 30);

        // Traps
        this.traps = [];

        // Population
        this.population = new Population(POPULATION_SIZE, MUTATION_RATE, this.cheese);

        // -- Listeners --
        // Adding trap
        let that = this;
        canvas.addEventListener("mousedown", (event) => {
            let position = getMousePosition(event, canvas);
            that.traps.push(new Trap(position.x, position.y));
        });
    }

    /**
        Updating the properties of the simulation
    */
    update(progress)
    {
        if (this.state === Simulation.states().CONTINUE)
        {
            this.population.update(progress, this.traps);
        }
    }

    /**
        Rendering simulation element to the screen
    */
    render()
    {
        let ctx = Simulation.context();
        let canvas = Simulation.canvas();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // -- Render simulation elements --

        // Cheese
        this.cheese.render(ctx);

        // Population
        this.population.render(ctx);

        // Traps
        for (let trap of this.traps)
        {
            trap.render(ctx);
        }

        // Rendering the stats
        this.renderStats(ctx, 20, 40);
    }

    /**
        Rendering the stats of the simulation
    */
    renderStats(ctx, x, y)
    {
        ctx.font = "20px Arial";
        ctx.fillText("Generation: " + this.population.generationNo, x, y);
        ctx.fillText("Population size: " + this.population.populationSize, x, y + 25);
        ctx.fillText("Mutation rate: " + this.population.mutationRate, x, y + 50);
        ctx.fillText("Fitness: " + Math.floor(this.population.fitness), x, y + 75);
    }

    // --- Static methods for Canvas & Context ---
    static canvas()
    {
        let canvas = document.getElementById('gl-canvas');

        canvas.width = 1000;
        canvas.height = 800;

        return canvas;
    }

    static context()
    {
        return Simulation.canvas().getContext('2d');
    }

    static states()
    {
        return {
            START: 0,
            CONTINUE: 1,
            OVER: 2
        }
    }
}

/* ------------------------------------------------------------------------------ */

/** AUXILLARY GLOBAL FUNCTION **/

function getRelativeMousePosition(event, target)
{
    target = target || event.target;
    var rect = target.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
    }
}

// assumes target or event.target is canvas
function getMousePosition(event, target)
{
    target = target || event.target;
    var pos = getRelativeMousePosition(event, target);

    pos.x = pos.x * target.width  / target.clientWidth;
    pos.y = pos.y * target.height / target.clientHeight;

    return pos;
}
