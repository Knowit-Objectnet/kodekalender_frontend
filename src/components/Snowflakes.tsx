import React, { useEffect, useRef } from 'react';

const Snowflakes: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    let snowflakes: any = [];
    let tilt = 0;
    let mouseX = 0;
    let mouseY = 0;
    const numsnowflakes = 200;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        function handleDeviceTilt(event: any) {
            var leftToRightDegrees = event.gamma.toFixed(2);
            tilt = ((leftToRightDegrees - -90) / (90 + 90) * 2 - 1) * 1.5
        }

        function resizeCanvas() {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        }

        function draw() {
            if (ctx && canvas) {
                ctx.fillStyle = '#000044';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
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
                        snowflake.x = canvas.width;
                    } else if (snowflake.x > canvas.width) {
                        snowflake.x = 0;
                    } else if (snowflake.y > canvas.height) {
                        snowflake.y = 0 - snowflake.size;
                        snowflake.x = Math.random() * canvas.width;
                    }
                }

                requestAnimationFrame(draw);
            }
        }

        if (canvas && ctx) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            window.addEventListener("deviceorientation", handleDeviceTilt, true);
            window.addEventListener('resize', resizeCanvas);
            window.addEventListener("mousemove", function (event) {
                mouseX = event.clientX;
                mouseY = event.clientY;
            });

            for (let i = 0; i < numsnowflakes; i++) {
                let size = Math.random() * 3;
                snowflakes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: size,
                    speed: ((size / 3) + Math.random() * 0.15) - 0.
                });
            }

            draw();
        }
    }, []);

    return <canvas ref={canvasRef} />
}

export default Snowflakes;
