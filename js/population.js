/**
    Population class:

    @author: Fuad Aghazada
    @data: ---
    @version: 1.0.0
*/

class Population
{
    /**
        Constructor for Population Object
    */
    constructor(populationSize, mutationRate, target)
    {
        this.populationSize = populationSize;
        this.mutationRate = mutationRate;
        this.target = target;   // Cheese
        this.generationNo = 1;
        this.fitness = 0;

        this.mouses = [];
        for (let i = 0; i < this.populationSize; i++)
        {
            this.mouses.push(new Mouse());
        }
    }

    /**
        Selection: selecting the best mice according to his/her fitness

            - Creating a pool of mouses
            - Adding amount of mouses according to their fitness score
            - Selecting random mouse from the mouse
    */
    select(mouses)
    {
        const mousePool = [];
        for (let mouse of this.mouses)
        {
            const n = mouse.fitness;
            for (let i = 0; i < n; i++)
            {
                mousePool.push(mouse);
            }
        }

        const randomIdx = Math.floor(Math.random() * mousePool.length);
        return mousePool[randomIdx];
    }

    /**
        Updating the next generation based on the current generation
    */
    updateNextGeneration()
    {
        // Current population
        const currentMouses = [...this.mouses];

        // STEP1: Calculating the fitness score
        for (let mouse of currentMouses)
        {
            mouse.fitness = mouse.calculateFitness(this.target);
        }

        for (let i = 0; i < currentMouses.length; i++)
        {
            // STEP2: Select parents (2 in this case) for the next generation
            const parentA = this.select(currentMouses);
            const parentB = this.select(currentMouses);

            // STEP3: Crossover (reproduction)
            let offSpringDNA = DNA.crossOver(parentA.dna, parentB.dna);

            // STEP4: Mutation
            offSpringDNA = offSpringDNA.mutate(this.mutationRate);

            // Rproduced child with the offspring DNA!
            const offSpring = new Mouse(offSpringDNA);
            this.fitness = offSpring.calculateFitness(this.target);
            
            currentMouses[i] = offSpring;
        }

        this.mouses = currentMouses;

        // Updating the generation number
        this.generationNo++;
    }

    /**
        Updating the properties of the population
    */
    update(progress, traps)
    {
        console.log("Generation:", this.generationNo);

        let isAllDead, hasSuccess = false;

        // Updating the mouses
        for (let i = 0; i < this.mouses.length; i++)
        {
            if (this.mouses[i].checkCollided(traps) === false &&
                this.mouses[i].isAlive === true &&
                this.mouses[i].checkReachedTarget(this.target) === false)
            {
                this.mouses[i].update(progress);
            }
            else if (this.mouses[i].checkReachedTarget(this.target) === true)
            {
                // Reached target !
                this.mouses[i].success = true;
                hasSuccess = true;
            }
            else
            {
                // Collided !
                this.mouses[i].success = false;
            }
        }

        // If all dead
        isAllDead = this.mouses.every((mouse) => (mouse.isAlive === false));

        if (isAllDead || hasSuccess) {
            this.updateNextGeneration();
        }
    }

    /**
        Rendering simulation element to the screen
    */
    render(ctx)
    {
        for (let i = 0; i < this.mouses.length; i++)
        {
            this.mouses[i].render(ctx);
        }
    }
}
