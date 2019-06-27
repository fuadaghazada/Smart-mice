/**
    Mouse class:

    @author: Fuad Aghazada
    @data: ---
    @version: 1.0.0
*/

class Mouse
{
    /**
        Constructs object
    */
    constructor(dna = null)
    {
        let canvas = Simulation.canvas();

        // Position and size
        this.radius = 25;
        this.x = canvas.width / 2 - this.radius;
        this.y = canvas.height - 80;

        // DNA of the mouse
        this.dna = (!dna) ? new DNA() : dna;

        // Velocity vector
        this.velocity = this.dna.getGene();

        // Angle
        this.angle = 180;

        // Image
        this.img = document.getElementById('mouse');
        this.isAlive = true;
    }

    /**
        Update
    */
    update(progress)
    {
        const velocity = this.dna.getGene();
        if (velocity)
        {
            this.velocity = velocity;

            const latency = 5;

            // Updated coordinates
            let newX = this.x + this.velocity.x * progress / latency;
            let newY = this.y + this.velocity.y * progress / latency;

            // Updating Angle of direction
            let theta = Math.atan2((newX - this.x), (newY - this.y));
            theta = (theta < 0) ? theta + 2 * Math.PI : theta;
            theta *= (180 / Math.PI)
            this.angle = -theta;

            // Updating the coordinates
            this.x = newX;
            this.y = newY;
        }
        else
        {
            this.isAlive = false;
        }
    }

    /**
        Render
    */
    render(ctx)
    {
        ctx.save();
        ctx.translate(this.x + this.radius, this.y + this.radius);
        ctx.rotate(this.angle * (Math.PI/180));
        ctx.translate(-this.x - this.radius, -this.y - this.radius);
        ctx.globalAlpha = this.isAlive ? 1.0 : 0.4;
        ctx.drawImage(this.img, this.x, this.y, this.radius * 2, this.radius * 2);
        ctx.restore();
    }

    /**
        Calculating the fitness score of the mouse

        Inverse of Euclidean distance to the target
    */
    calculateFitness(target)
    {
        const distance = Math.sqrt((target.x - this.x) * (target.x - this.x) +
                                   (target.y - this.y) * (target.y - this.y));

        let fitnessScore = 10000000 / (distance * distance);

        if (this.success === true)
        {
            fitnessScore *= 10;
        }
        else if (this.success === false)
        {
            fitnessScore /= 10;
        }
        return fitnessScore;
    }

    /**
        Check reached to target
    */
    checkReachedTarget(target)
    {
        if (Collision.checkCollision(this.x, this.y, this.radius, target.x, target.y, target.width / 2) === true)
        {
            return true;
        }
        return false;
    }

    /**
        Check collision
    */
    checkCollided(traps)
    {
        // Checking the collision with boundaries
        if (Collision.checkCanvasBoundary(this.x, this.y, this.radius) === true)
        {
            this.isAlive = false;
            return true;
        }

        // Checking the collision with the traps
        for (let trap of traps)
        {
            if (Collision.checkCollision(this.x, this.y, this.radius, trap.x, trap.y, trap.width / 2) === true)
            {
                this.isAlive = false;
                return true;
            }
        }

        return false;
    }

    /**
        Resetting the mouse
    */
    reset()
    {
        let canvas = Simulation.canvas();
        this.x = canvas.width / 2 - this.radius;
        this.y = canvas.height - 80;
        this.angle = 180;
        this.isAlive = true;
    }
}
