class Fog {
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
        this.y -= this.speed; // Moves the fog horizontally

        // If the fog moves off screen, reset its position to the top and a random x position
        if (this.y + this.radiusY < 0) {
            this.y = canvas.height + this.radiusY;
            this.x = Math.random() * canvas.width;  // Set x to a random position within the canvas width
        }
    }
}


document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById('backgroundCanvas');
    var ctx = canvas.getContext('2d');

    // Load the background image
    var backgroundImage = new Image();
    backgroundImage.src = 'assets/background3.png'; // Put the URL or relative path of your image here

    // Ensure the image is loaded before starting the animation
    backgroundImage.onload = function() {
        // Create instances of Fog
        let fogs = [];
        for (let i = 0; i < 100; i++) {
            let rand = Math.random() * 20;
            
            fogs.push(new Fog(Math.random() * 1400, Math.random() * 800, rand, rand, Math.random() * 0.2 + 0.3, 'rgba(255, 255, 255, 0.5)')) // Simulating fog with semi-transparent ellipses
        }

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function drawStuff() {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the background image
            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
            // Update and redraw each fog
            fogs.forEach(function(fog) {
                fog.update(canvas);
                fog.draw(ctx);
            });
        
            // Request the next frame
            requestAnimationFrame(drawStuff);
        }
        
        // Initial setup
        window.addEventListener('resize', resizeCanvas, false);
        resizeCanvas();

        // Start the animation
        drawStuff();
    };
});


