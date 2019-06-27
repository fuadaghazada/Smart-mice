/**
    DNA class:

    @author: Fuad Aghazada
    @data: ---
    @version: 1.0.0
*/

class DNA
{
    /**
        Constructs object
    */
    constructor(genes = null)
    {
        this.lifeCnt = 0;       // Life span counter
        this.lifeSpan = 200;
        this.genes = [];

        // Random genes TODO: Vector normalization needed
        for (let i = 0; i < this.lifeSpan; i++)
        {
            this.genes.push(this.generateRandomVector());
        }

        this.genes = (genes) ? genes : this.genes;
    }

    /**
        Returns DNA with mutated genes
    */
    mutate(mutationRate)
    {
        let genes = this.genes;
        for (let i = 0; i < genes.length; i++)
        {
            const randomProbability = Math.random();    // Probabilty for mutation

            if (randomProbability <= mutationRate)
            {
                genes[i] = this.generateRandomVector();
            }
        }
        return new DNA(genes);
    }

    /**
        Crossover function

        Single-point cross over
    */
    static crossOver(dnaA, dnaB)
    {
        const newGenes = [];

        const mid = Math.floor(Math.random() * (this.lifeSpan - 10) + 5);
        for (let i = 0; i < dnaA.lifeSpan; i++)
        {
            newGenes.push((i < mid) ? dnaA.genes[i] : dnaB.genes[i]);
        }

        return new DNA(newGenes);
    }

    /**
        Getting a gene
    */
    getGene()
    {
        return (this.lifeCnt < this.lifeSpan) ? this.genes[this.lifeCnt++] : null;
    }

    /**
        Generating the random vector
    */
    generateRandomVector()
    {
        return {
            x: Math.random() * 20 - 10,
            y: Math.random() * 20 - 10,
        }
    }
}
