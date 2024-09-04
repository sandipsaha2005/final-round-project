import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const VideoFrame = () => {
    const canvasRef = useRef(null);
    const frames = {
        currentIndex: 0,
        maxIndex: 1539
    };
    const images = useRef([]);
    let imageLoaded = 0;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        function preloadImages() {
            for (let i = 1; i <= frames.maxIndex; i++) {
                let imgUrl = `../../../public/Frames/frame_${i.toString().padStart(4, '0')}.jpeg`;
                const img = new Image();
                img.src = imgUrl;
                img.onload = function () {
                    imageLoaded++;
                    if (imageLoaded === frames.maxIndex) {
                        loadImage(frames.currentIndex);
                        startAnimation();
                    }
                };
                images.current.push(img);
            }
        }

        function loadImage(index) {
            if (index >= 0 && index <= frames.maxIndex) {
                const img = images.current[index];
                if (img.complete) {
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;

                    const scaleX = canvas.width / img.width;
                    const scaleY = canvas.height / img.height;
                    const scale = Math.max(scaleX, scaleY);

                    const newWidth = img.width * scale;
                    const newHeight = img.height * scale;

                    const offsetX = (canvas.width - newWidth) / 2;
                    const offsetY = (canvas.height - newHeight) / 2;

                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.imageSmoothingEnabled = true;
                    context.imageSmoothingQuality = 'high';
                    context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
                    frames.currentIndex = index;
                }
            }
        }

        function startAnimation() {
            gsap.timeline({
                scrollTrigger: {
                    trigger: '.parent',
                    start: 'top top',
                    scrub: 2,
                    end: 'bottom bottom',
                }
            }).to(frames, {
                currentIndex: frames.maxIndex,
                onUpdate: function () {
                    loadImage(Math.floor(frames.currentIndex));
                }
            });
        }

        preloadImages();
    }, []);

    return (
        <div className="w-full bg-zinc-900">
            <div className="parent relative top-0 left-0 w-full h-[700vh]">
                <div className="w-full sticky h-screen top-0 left-0">
                    <canvas ref={canvasRef} className="w-full h-screen"></canvas>
                </div>
            </div>
        </div>
    );
};

export default VideoFrame;