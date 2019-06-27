/**
    Cheese class:

    @author: Fuad Aghazada
    @data: ---
    @version: 1.0.0
*/

class Cheese
{
    /**
        Constructs object
    */
    constructor(x, y)
    {
        // Dimensions
        this.width = 60;
        this.height = 60;

        // Coordinates
        this.x = x - this.width / 2;
        this.y = y;

        // Image
        this.img = document.getElementById('cheese');
    }

    /**
        Update
    */
    update(progress) {}

    /**
        Render
    */
    render(ctx)
    {
        ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
