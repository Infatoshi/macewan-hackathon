
class Ellipse {
    constructor(x, y, radiusX, radiusY, speed, color) {
        this.x = x;
        this.y = y;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.speed = speed;
        this.color = color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(canvas) {
        this.x += this.speed; // Moves the ellipse horizontally
        // If the ellipse moves off screen, reset its position to the left
        if (this.x - this.radiusX > canvas.width) {
            this.x = -this.radiusX;
        }
    }
}


document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById('backgroundCanvas');
    var ctx = canvas.getContext('2d');

    // Create instances of ellipses
    let ellipses = [
        new Ellipse(50, 150, 50, 25, 1, 'red'), // x, y, radiusX, radiusY, speed, color
        new Ellipse(150, 75, 60, 30, 2, 'blue'),
        // Add as many as you like
    ];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function drawStuff() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Update and redraw each ellipse
        ellipses.forEach(function(ellipse) {
            ellipse.update(canvas); // pass the canvas here
            ellipse.draw(ctx);
        });
    
        // Request the next frame
        requestAnimationFrame(drawStuff);
    }
    

    // Initial setup
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    // Start the animation
    drawStuff();

    
});
