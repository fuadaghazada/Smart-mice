/**
    Collision detection class:

    @author: Fuad Aghazada
    @data: ---
    @version: 1.0.0
*/

class Collision
{
    static checkCollision(x1, y1, r1, x2, y2, r2)
    {
        return ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) <= (r1 + r2) * (r1 + r2))
    }

    static checkCanvasBoundary(x, y, r)
    {
        let canvas = Simulation.canvas();
        return ((x <= 0) || (y <= 0) || (x + 2 * r) >= canvas.width || (y + 2 * r) >= canvas.height);
    }
}
