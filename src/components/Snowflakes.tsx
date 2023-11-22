import React, { useEffect, useRef } from 'react';

const Snowflakes = () => {
    let snowflakes;
    let numsnowflakes = 200;
    let tilt = 0;
    let mouseX = 0;
    let mouseY = 0;

    const canvasRef = useRef(null);


    useEffect(() => {

        const handleDeviceTilt = (event: DeviceOrientationEvent) => {
            let leftToRightDegrees = event.gamma.toFixed(2);
            tilt = ((leftToRightDegrees - -90) / (90 + 90) * 2 - 1) * 1.5
        }

        const draw = () => {
            const ctx = canvasRef.current.getContext("2d");

            ctx.fillStyle = '#111230';
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.fillStyle = "#ffffff";

            for (let i = 0; i < numsnowflakes; i++) {
                let snowflake = snowflakes[i];

                let randomness = (Math.random() * 2 - 1) / 5

                let dx = snowflake.x - mouseX;
                let dy = snowflake.y - mouseY;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    snowflake.x += dx / (dist * 5);
                    snowflake.y += dy / (dist * 5);
                }

                ctx.beginPath();
                ctx.arc(snowflake.x, snowflake.y, snowflake.size, 0, 2 * Math.PI)
                ctx.fill();

                snowflake.y += snowflake.speed;
                snowflake.x += randomness;
                snowflake.x += tilt;

                if (snowflake.x < 0) {
                    snowflake.x = canvasRef.current.width;
                } else if (snowflake.x > canvasRef.current.width) {
                    snowflake.x = 0;
                } else if (snowflake.y > canvasRef.current.height) {
                    snowflake.y = 0 - snowflake.size;
                    snowflake.x = Math.random() * canvasRef.current.width;
                }
            }

            setTimeout(() => {
                requestAnimationFrame(draw);
            }, 1000 / 60);  // Delays next frame to achieve ~60fps

            //requestAnimationFrame(draw);
        }

        const handleMouseMove = (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        };

        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        if (window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", handleDeviceTilt, true);
        }

        document.addEventListener("mousemove", handleMouseMove);

        snowflakes = [];
        for (let i = 0; i < numsnowflakes; i++) {
            let size = Math.random() * 3;
            snowflakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: size,
                speed: ((size / 3) + Math.random() * 0.15) - 0.2
            });
        }

        draw();

        // Cleanup listeners on component unmount
        return () => {
            window.removeEventListener("deviceorientation", handleDeviceTilt);
            document.removeEventListener("mousemove", handleMouseMove);
        }

    }, []);

    return (
        <canvas ref={canvasRef} style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -100 }} />
    );
}

export default Snowflakes;