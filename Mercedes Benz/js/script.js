 // Navbar Scroll Effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Hamburger Menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.addEventListener('click', function() {
            this.classList.toggle('open');
            navMenu.classList.toggle('active');
            playSound('click');
        });
        
        // Gallery Navigation
        const galleryContainer = document.querySelector('.gallery-container');
        const galleries = document.querySelectorAll('.model-gallery');
        const galleryNavButtons = document.querySelectorAll('.gallery-nav-button');
        const closeGalleryButtons = document.querySelectorAll('.close-gallery');
        
        // Show gallery when clicking on a category
        document.querySelectorAll('[data-gallery]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const galleryId = this.getAttribute('data-gallery') + '-gallery';
                
                // Activate gallery container
                galleryContainer.classList.add('active');
                
                // Hide all galleries
                galleries.forEach(gallery => {
                    gallery.classList.remove('active');
                });
                
                // Show selected gallery
                document.getElementById(galleryId).classList.add('active');
                
                // Update active nav button
                galleryNavButtons.forEach(button => {
                    button.classList.remove('active');
                    if (button.getAttribute('data-gallery') === this.getAttribute('data-gallery')) {
                        button.classList.add('active');
                    }
                });
                
                playSound('hover');
            });
        });
        
        // Switch between galleries using nav buttons
        galleryNavButtons.forEach(button => {
            button.addEventListener('click', function() {
                const galleryId = this.getAttribute('data-gallery') + '-gallery';
                
                // Hide all galleries
                galleries.forEach(gallery => {
                    gallery.classList.remove('active');
                });
                
                // Show selected gallery
                document.getElementById(galleryId).classList.add('active');
                
                // Update active nav button
                galleryNavButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                playSound('hover');
            });
        });
        
        // Close gallery
        closeGalleryButtons.forEach(button => {
            button.addEventListener('click', function() {
                galleryContainer.classList.remove('active');
                playSound('click');
            });
        });
        
        // Model Detail Navigation
        const modelCards = document.querySelectorAll('.model-card');
        const modelDetails = document.querySelectorAll('.model-detail');
        const closeDetailButtons = document.querySelectorAll('.close-detail');
        
        modelCards.forEach(card => {
            card.addEventListener('click', function() {
                const modelId = this.getAttribute('data-model') + '-detail';
                document.getElementById(modelId).classList.add('active');
                playSound('hover');
            });
        });
        
        closeDetailButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.closest('.model-detail').classList.remove('active');
                playSound('click');
            });
        });
        
        // Mobile Dropdowns
        if (window.innerWidth <= 992) {
            const navItems = document.querySelectorAll('.nav-item');
            
            navItems.forEach(item => {
                const link = item.querySelector('.nav-link');
                
                link.addEventListener('click', function(e) {
                    if (item.querySelector('.dropdown-menu')) {
                        e.preventDefault();
                        const dropdown = item.querySelector('.dropdown-menu');
                        
                        // Close other dropdowns
                        document.querySelectorAll('.dropdown-menu').forEach(d => {
                            if (d !== dropdown) d.style.display = 'none';
                        });
                        
                        // Toggle current dropdown
                        if (dropdown.style.display === 'block') {
                            dropdown.style.display = 'none';
                        } else {
                            dropdown.style.display = 'block';
                        }
                    }
                });
            });
        }
        
        // Sound Effects
        function playSound(type) {
            if (type === 'hover') {
                // Hover sound effect
                const hoverSound = new Audio('https://www.soundjay.com/buttons/sounds/button-09.mp3');
                hoverSound.currentTime = 0;
                hoverSound.play();
            } else if (type === 'click') {
                // Click sound effect
                const clickSound = new Audio('./Audio/X Exit.mp3');
                clickSound.currentTime = 0;
                clickSound.play();
            }
        }
        
        // Add hover sound to all interactive elements
        const hoverElements = document.querySelectorAll('.sound-hover');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => playSound('hover'));
        });

            // Efecto blur al hacer focus en el buscador
        const searchInput = document.querySelector('.search-input');
        const body = document.body;
        
        searchInput.addEventListener('focus', () => {
            body.classList.add('blur-active');
        });
        
        searchInput.addEventListener('blur', () => {
            body.classList.remove('blur-active');
        });
        
        // También activar con el icono de búsqueda
        const searchIcon = document.querySelector('.search-icon');
        searchIcon.addEventListener('click', () => {
            searchInput.focus();
        });

         document.addEventListener('DOMContentLoaded', function() {
            const slider = document.querySelector('.slider');
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.nav-dot');
            const pauseBtn = document.querySelector('.pause-btn');
            const flashEffect = document.querySelector('.flash-effect');
            let currentSlide = 0;
            let isPlaying = true;
            let slideInterval = setInterval(nextSlide, 5000);
            
            // Cambiar al siguiente slide
            function nextSlide() {
                goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
            }
            
            // Cambiar a un slide específico
            function goToSlide(n) {
                // Efecto flash
                flashEffect.classList.add('flash');
                setTimeout(() => flashEffect.classList.remove('flash'), 600);
                
                // Desactivar slide actual
                slides[currentSlide].classList.remove('active');
                dots[currentSlide].classList.remove('active');
                
                // Actualizar slide actual
                currentSlide = n;
                
                // Mover slider
                slider.style.transform = `translateX(-${currentSlide * 100}vw)`;
                
                // Activar nuevo slide
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }
            
            // Eventos para los dots de navegación
            dots.forEach(dot => {
                dot.addEventListener('click', function() {
                    goToSlide(parseInt(this.getAttribute('data-slide')));
                    resetInterval();
                });
                
                dot.addEventListener('mouseenter', function() {
                    if (!this.classList.contains('active')) {
                        this.style.boxShadow = '0 0 15px var(--red)';
                    }
                });
                
                dot.addEventListener('mouseleave', function() {
                    if (!this.classList.contains('active')) {
                        this.style.boxShadow = 'none';
                    }
                });
            });
            
            // Pausar/reanudar slider
            pauseBtn.addEventListener('click', function() {
                isPlaying = !isPlaying;
                
                if (isPlaying) {
                    resetInterval();
                    this.textContent = 'Pausa';
                    this.classList.remove('active');
                } else {
                    clearInterval(slideInterval);
                    this.textContent = 'Play';
                    this.classList.add('active');
                }
            });
            
            // Resetear intervalo
            function resetInterval() {
                clearInterval(slideInterval);
                if (isPlaying) {
                    slideInterval = setInterval(nextSlide, 5000);
                }
            }
            
            // Animación de entrada para el primer slide
            setTimeout(() => {
                document.querySelector('.slide.active .slide-content').style.opacity = '1';
                document.querySelector('.slide.active .slide-content').style.transform = 'translateY(0)';
            }, 300);
        });

               document.addEventListener('DOMContentLoaded', function() {
            const slider = document.querySelector('.slider2');
            const slides = document.querySelectorAll('.slide2');
            const prevBtn = document.getElementById('prev-slide');
            const nextBtn = document.getElementById('next-slide');
            let currentSlide = 0;
            
            // Cambiar al slide anterior
            function prevSlide() {
                goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
            }
            
            // Cambiar al siguiente slide
            function nextSlide() {
                goToSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
            }
            
            // Cambiar a un slide específico
            function goToSlide(n) {
                // Desactivar slide actual
                slides[currentSlide].classList.remove('active');
                
                // Actualizar slide actual
                currentSlide = n;
                
                // Mover slider
                slider.style.transform = `translateX(-${currentSlide * 100}vw)`;
                
                // Activar nuevo slide
                slides[currentSlide].classList.add('active');
            }
            
            // Eventos para las flechas
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
            
            // Animación de entrada para el primer slide
            setTimeout(() => {
                document.querySelector('.slide2.active .slide2-content').style.opacity = '1';
                document.querySelector('.slide2.active .slide2-content').style.transform = 'translateY(0)';
            }, 300);
            
            // Auto-play opcional (descomentar si se desea)
            /*
            let slideInterval = setInterval(nextSlide, 5000);
            
            slider.parentElement.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            slider.parentElement.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
            */
        });

          document.addEventListener('DOMContentLoaded', function() {
            // Elementos del DOM
            const videoGallery = document.getElementById('video-gallery');
            const videoOverlay = document.getElementById('video-overlay');
            const mainVideo = document.getElementById('main-video');
            const closeBtn = document.getElementById('close-btn');
            const resetBtn = document.getElementById('reset-btn');
            const videoThumbnails = document.querySelectorAll('.video-thumbnail');
            
            // Controles de dial
            const volumeDial = document.getElementById('volume-dial');
            const volumeHandle = document.getElementById('volume-handle');
            const zoomDial = document.getElementById('zoom-dial');
            const zoomHandle = document.getElementById('zoom-handle');
            const saturationDial = document.getElementById('saturation-dial');
            const saturationHandle = document.getElementById('saturation-handle');
            
            // Valores iniciales
            let volume = 0.5;
            let zoom = 1;
            let saturation = 1;
            
            // Inicializar diales
            initDial(volumeDial, volumeHandle, 0.5, updateVolume);
            initDial(zoomDial, zoomHandle, 0.5, updateZoom);
            initDial(saturationDial, saturationHandle, 0.5, updateSaturation);
            
            // Función para inicializar un dial
            function initDial(dial, handle, initialValue, callback) {
                let isDragging = false;
                let startAngle = 0;
                let rotation = (initialValue * 270) - 135;
                
                handle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
                
                dial.addEventListener('mousedown', startDrag);
                dial.addEventListener('touchstart', startDrag);
                
                function startDrag(e) {
                    e.preventDefault();
                    isDragging = true;
                    const rect = dial.getBoundingClientRect();
                    const center = {
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2
                    };
                    startAngle = Math.atan2(
                        (e.clientY || e.touches[0].clientY) - center.y,
                        (e.clientX || e.touches[0].clientX) - center.x
                    ) * (180 / Math.PI) - rotation;
                    
                    document.addEventListener('mousemove', drag);
                    document.addEventListener('touchmove', drag);
                    document.addEventListener('mouseup', stopDrag);
                    document.addEventListener('touchend', stopDrag);
                }
                
                function drag(e) {
                    if (!isDragging) return;
                    const rect = dial.getBoundingClientRect();
                    const center = {
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2
                    };
                    let angle = Math.atan2(
                        (e.clientY || e.touches[0].clientY) - center.y,
                        (e.clientX || e.touches[0].clientX) - center.x
                    ) * (180 / Math.PI) - startAngle;
                    
                    // Limitar rotación entre -135 y 135 grados
                    angle = Math.max(-135, Math.min(135, angle));
                    rotation = angle;
                    
                    handle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
                    
                    // Convertir rotación a valor (0-1)
                    const value = (rotation + 135) / 270;
                    callback(value);
                }
                
                function stopDrag() {
                    isDragging = false;
                    document.removeEventListener('mousemove', drag);
                    document.removeEventListener('touchmove', drag);
                    document.removeEventListener('mouseup', stopDrag);
                    document.removeEventListener('touchend', stopDrag);
                }
            }
            
            // Funciones de actualización
            function updateVolume(value) {
                volume = value;
                if (mainVideo.volume !== undefined) {
                    mainVideo.volume = value;
                }
                console.log('Volumen:', value);
            }
            
            function updateZoom(value) {
                zoom = 0.5 + value * 1.5; // Rango de 0.5 a 2
                videoGallery.style.transform = `scale(${zoom})`;
                console.log('Zoom:', zoom);
            }
            
            function updateSaturation(value) {
                saturation = 0.5 + value * 1.5; // Rango de 0.5 a 2
                const thumbnails = document.querySelectorAll('.video-thumbnail img');
                thumbnails.forEach(img => {
                    img.style.filter = `saturate(${saturation})`;
                });
                console.log('Saturación:', saturation);
            }
            
            // Botón de reset
            resetBtn.addEventListener('click', function() {
                // Restablecer volumen
                volumeHandle.style.transform = 'translateX(-50%) rotate(0deg)';
                updateVolume(0.5);
                
                // Restablecer zoom
                zoomHandle.style.transform = 'translateX(-50%) rotate(0deg)';
                updateZoom(0.5);
                videoGallery.style.transform = 'scale(1)';
                
                // Restablecer saturación
                saturationHandle.style.transform = 'translateX(-50%) rotate(0deg)';
                updateSaturation(0.5);
                document.querySelectorAll('.video-thumbnail img').forEach(img => {
                    img.style.filter = 'saturate(1)';
                });
            });
            
            // Eventos para los videos
            videoThumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', function() {
                    const videoSrc = this.getAttribute('data-video');
                    mainVideo.src = videoSrc;
                    videoOverlay.classList.add('active');
                    mainVideo.play();
                });
            });
            
            // Cerrar video
            closeBtn.addEventListener('click', function() {
                videoOverlay.classList.remove('active');
                mainVideo.pause();
                mainVideo.src = '';
            });
            
            // Ocultar galería inicialmente (simulando el modo foco)
            videoGallery.style.display = 'none';
            
            // Mostrar galería después de 1 segundo (simulando activación del foco)
            setTimeout(() => {
                document.querySelector('.main-content').style.display = 'none';
                videoGallery.style.display = 'grid';
            }, 1000);
        });

           // Base de datos de imágenes (ejemplo ampliado)
        const carDatabase = {
            "a-class": {
                name: "Clase A Hatchback",
                colors: {
                    "white": [
                        "https://www.mercedes-benz.com.co/mercedes/site/artic/20240509/imag/foto_0000014020240509173751/13.png",
                        "https://www.mercedes-benz.com.co/mercedes/site/artic/20240509/imag/foto_0000014020240509173751/13.png"
                    ],
                    "black": [
                        "https://www.mercedes-benz.com.co/mercedes/site/artic/20240509/imag/foto_0000013920240509173751/Design_sem_nome_13.png"
                    ],
                    "silver": [
                        "https://www.mercedes-benz.com.co/mercedes/site/artic/20240509/imag/foto_0000014520240509173751/11.png"
                    ],
                    "blue": [
                        "https://www.mercedes-benz.com.co/mercedes/site/artic/20240509/imag/foto_0000014120240509173751/9.png"
                    ]
                }
            },
            "c-class": {
                name: "Clase C Sedán",
                colors: {
                    "white": [
                        "https://www.mercedes-benz.com.mx/content/dam/mb-nafta/mx/myco/my23/c-class/sedan/overview/hero-image/MY23-C-Class-Sedan-Overview-Hero-Image-3840x2160.jpg",
                        "https://www.mercedes-benz.com.mx/content/dam/mb-nafta/mx/myco/my23/c-class/sedan/overview/gallery/MY23-C-Class-Sedan-Overview-Gallery-01-3840x2160.jpg"
                    ],
                    "black": [
                        "https://www.mercedes-benz.com.mx/content/dam/mb-nafta/mx/myco/my23/c-class/sedan/overview/gallery/MY23-C-Class-Sedan-Overview-Gallery-03-3840x2160.jpg"
                    ],
                    "silver": [
                        "https://www.mercedes-benz.com.mx/content/dam/mb-nafta/mx/myco/my23/c-class/sedan/overview/gallery/MY23-C-Class-Sedan-Overview-Gallery-02-3840x2160.jpg"
                    ]
                }
            },
            "e-class": {
                name: "Clase E Sedán",
                colors: {
                    "black": [
                        "https://www.mercedes-benz.com.mx/content/dam/mb-nafta/mx/myco/my23/e-class/sedan/overview/hero-image/MY23-E-Class-Sedan-Overview-Hero-Image-3840x2160.jpg",
                        "https://www.mercedes-benz.com.mx/content/dam/mb-nafta/mx/myco/my23/e-class/sedan/overview/gallery/MY23-E-Class-Sedan-Overview-Gallery-03-3840x2160.jpg"
                    ],
                    "silver": [
                        "https://www.mercedes-benz.com.mx/content/dam/mb-nafta/mx/myco/my23/e-class/sedan/overview/gallery/MY23-E-Class-Sedan-Overview-Gallery-02-3840x2160.jpg"
                    ],
                    "blue": [
                        "https://www.mercedes-benz.com.mx/content/dam/mb-nafta/mx/myco/my23/e-class/sedan/overview/gallery/MY23-E-Class-Sedan-Overview-Gallery-01-3840x2160.jpg"
                    ]
                }
            },
            "g-class": {
                name: "Clase G SUV",
                colors: {
                    "black": [
                        "https://www.mercedes-benz.com.mx/content/dam/mb-nafta/mx/myco/my23/g-class/suv/overview/hero-image/MY23-G-Class-SUV-Overview-Hero-Image-3840x2160.jpg",
                        "https://www.mercedes-benz.com.mx/content/dam/mb-nafta/mx/myco/my23/g-class/suv/overview/gallery/MY23-G-Class-SUV-Overview-Gallery-03-3840x2160.jpg"
                    ],
                    "white": [
                        "https://www.mercedes-benz.com.mx/content/dam/mb-nafta/mx/myco/my23/g-class/suv/overview/gallery/MY23-G-Class-SUV-Overview-Gallery-01-3840x2160.jpg"
                    ],
                    "red": [
                        "https://www.mercedes-benz.com.mx/content/dam/mb-nafta/mx/myco/my23/g-class/suv/overview/gallery/MY23-G-Class-SUV-Overview-Gallery-02-3840x2160.jpg"
                    ]
                }
            },
            "amg-gt": {
                name: "AMG GT Coupé",
                colors: {
                    "green": [
                        "https://www.mercedes-benz.com/content/dam/global/fleet/amg-gt/amg-gt-coupe-c190/amg-gt-coupe-c190-stage.jpg",
                        "https://www.mercedes-benz.com/content/dam/global/fleet/amg-gt/amg-gt-coupe-c190/amg-gt-coupe-c190-gallery-01.jpg"
                    ],
                    "silver": [
                        "https://www.mercedes-benz.com/content/dam/global/fleet/amg-gt/amg-gt-coupe-c190/amg-gt-coupe-c190-gallery-02.jpg"
                    ],
                    "black": [
                        "https://www.mercedes-benz.com/content/dam/global/fleet/amg-gt/amg-gt-coupe-c190/amg-gt-coupe-c190-gallery-03.jpg"
                    ]
                }
            }
        };

        // Variables de estado
        let currentModel = null;
        let currentColor = null;
        let currentImageIndex = 0;
        let currentImages = [];
        
        // Elementos del DOM
        const modelSelector = document.getElementById('model-selector');
        const carImage = document.getElementById('car-image');
        const modelNameElement = document.querySelector('.model-name');
        const modelColorElement = document.querySelector('.model-color');
        const colorSelector = document.getElementById('color-selector');
        const prevArrow = document.getElementById('prev-arrow');
        const nextArrow = document.getElementById('next-arrow');
        const colorSound = document.getElementById('color-sound');
        const navSound = document.getElementById('nav-sound');
        
        // Inicializar la galería
        function initGallery() {
            // Crear botones de modelo
            Object.keys(carDatabase).forEach(modelKey => {
                const model = carDatabase[modelKey];
                const modelBtn = document.createElement('button');
                modelBtn.className = 'model-btn';
                modelBtn.textContent = model.name;
                modelBtn.setAttribute('data-model', modelKey);
                
                modelBtn.addEventListener('click', function() {
                    selectModel(modelKey);
                });
                
                modelSelector.appendChild(modelBtn);
            });
            
            // Seleccionar el primer modelo por defecto
            const firstModel = Object.keys(carDatabase)[0];
            selectModel(firstModel);
        }
        
        // Función para seleccionar un modelo
        function selectModel(modelKey) {
            if (carDatabase[modelKey] && modelKey !== currentModel) {
                currentModel = modelKey;
                const model = carDatabase[modelKey];
                
                // Actualizar botones activos
                document.querySelectorAll('.model-btn').forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('data-model') === modelKey) {
                        btn.classList.add('active');
                    }
                });
                
                // Actualizar nombre del modelo
                modelNameElement.textContent = model.name;
                
                // Limpiar selector de colores
                colorSelector.innerHTML = '';
                
                // Agregar opciones de color
                const colors = Object.keys(model.colors);
                currentColor = colors[0];
                
                colors.forEach(color => {
                    const colorOption = document.createElement('div');
                    colorOption.className = 'color-option';
                    colorOption.style.backgroundColor = color;
                    colorOption.setAttribute('data-color', color);
                    
                    // Marcar el primer color como activo
                    if (color === currentColor) {
                        colorOption.classList.add('active');
                    }
                    
                    colorOption.addEventListener('click', function() {
                        selectColor(color);
                    });
                    
                    colorSelector.appendChild(colorOption);
                });
                
                // Mostrar imágenes del primer color
                selectColor(currentColor);
            }
        }
        
        // Función para seleccionar un color
        function selectColor(color) {
            if (currentModel && color !== currentColor) {
                currentColor = color;
                currentImageIndex = 0;
                currentImages = carDatabase[currentModel].colors[color];
                
                // Actualizar estado activo en los botones de color
                document.querySelectorAll('.color-option').forEach(option => {
                    option.classList.remove('active');
                    if (option.getAttribute('data-color') === color) {
                        option.classList.add('active');
                    }
                });
                
                // Mostrar la primera imagen del color seleccionado
                updateImage();
                
                // Reproducir sonido de cambio de color
                colorSound.currentTime = 0;
                colorSound.play();
                
                // Actualizar información del color
                modelColorElement.textContent = `Color: ${capitalizeFirstLetter(color)}`;
            }
        }
        
        // Función para actualizar la imagen mostrada
        function updateImage() {
            if (currentImages && currentImages.length > 0) {
                carImage.src = currentImages[currentImageIndex];
                carImage.classList.add('active');
                
                // Actualizar estado de las flechas
                prevArrow.classList.toggle('disabled', currentImageIndex === 0);
                nextArrow.classList.toggle('disabled', currentImageIndex === currentImages.length - 1);
            } else {
                carImage.classList.remove('active');
            }
        }
        
        // Navegación entre imágenes
        prevArrow.addEventListener('click', function() {
            if (currentImageIndex > 0) {
                currentImageIndex--;
                updateImage();
                
                // Reproducir sonido de navegación
                navSound.currentTime = 0;
                navSound.play();
            }
        });
        
        nextArrow.addEventListener('click', function() {
            if (currentImages && currentImageIndex < currentImages.length - 1) {
                currentImageIndex++;
                updateImage();
                
                // Reproducir sonido de navegación
                navSound.currentTime = 0;
                navSound.play();
            }
        });
        
        // Función auxiliar para capitalizar la primera letra
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        
        // Inicializar la galería cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', initGallery);

             // Variables de estado
        let currentSlide4 = 0;
        const totalSlides4 = 3;
        
        // Elementos del DOM
        const trunkBtn = document.getElementById('trunk-btn');
        const fullscreenMenu = document.getElementById('fullscreen-menu');
        const menuActivator = document.getElementById('menu-activator');
        const closeMenu = document.getElementById('close-menu');
        const slide4Container = document.getElementById('slide4-container');
        const prev4 = document.getElementById('prev4');
        const next4 = document.getElementById('next4');
        
        // Abrir maletero
        trunkBtn.addEventListener('click', function() {
            fullscreenMenu.classList.add('active');
        });
        
        // Activar menú
        menuActivator.addEventListener('click', function() {
            fullscreenMenu.classList.add('menu-activated');
        });
        
        // Cerrar menú
        closeMenu.addEventListener('click', function() {
            fullscreenMenu.classList.remove('active', 'menu-activated');
        });
        
        // Navegación del carrusel
        function goToSlide4(n) {
            currentSlide4 = n;
            slide4Container.style.transform = `translateX(-${currentSlide4 * 100}%)`;
        }
        
        function nextSlide4() {
            if (currentSlide4 < totalSlides4 - 1) {
                goToSlide4(currentSlide4 + 1);
            } else {
                goToSlide4(0);
            }
        }
        
        function prevSlide4() {
            if (currentSlide4 > 0) {
                goToSlide4(currentSlide4 - 1);
            } else {
                goToSlide4(totalSlides4 - 1);
            }
        }
        
        // Event listeners
        next4.addEventListener('click', nextSlide4);
        prev4.addEventListener('click', prevSlide4);
        
        // Opcional: Auto-play
        let slideInterval = setInterval(nextSlide4, 5000);
        
        fullscreenMenu.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        fullscreenMenu.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide4, 5000);
        });

          // Efecto de aparición del footer al hacer scroll
        document.addEventListener('DOMContentLoaded', function() {
            const footer = document.getElementById('footer');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        footer.style.opacity = '1';
                        footer.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            footer.style.opacity = '0';
            footer.style.transform = 'translateY(20px)';
            footer.style.transition = 'all 0.5s ease';
            
            observer.observe(footer);
        });