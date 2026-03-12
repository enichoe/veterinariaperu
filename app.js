
        // ========================================
        // INITIALIZE ICONS
        // ========================================
        lucide.createIcons();
        
        // ========================================
        // LOADER
        // ========================================
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loader = document.getElementById('loader');
                if (loader) {
                    loader.classList.add('hidden');
                }
            }, 2000);
        });
        
        // ========================================
        // NAVBAR SCROLL
        // ========================================
        const navbar = document.getElementById('navbar');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
        
        // ========================================
        // MOBILE NAVIGATION
        // ========================================
        function toggleMobileNav() {
            const mobileNav = document.getElementById('mobileNav');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        }
        
        // ========================================
        // SCROLL REVEAL
        // ========================================
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.reveal').forEach(el => {
            revealObserver.observe(el);
        });
        
        // ========================================
        // COUNTER ANIMATION
        // ========================================
        const counters = document.querySelectorAll('.counter');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.target);
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current).toLocaleString();
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toLocaleString();
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
        
        // ========================================
        // FLOATING PAWS
        // ========================================
        const floatingPawsContainer = document.getElementById('floatingPaws');
        const pawSVG = `<svg viewBox="0 0 24 24" fill="white"><ellipse cx="12" cy="17" rx="5" ry="4"/><circle cx="6" cy="10" r="3"/><circle cx="18" cy="10" r="3"/><circle cx="9" cy="5" r="2.5"/><circle cx="15" cy="5" r="2.5"/></svg>`;
        
        function createFloatingPaw() {
            const paw = document.createElement('div');
            paw.className = 'floating-paw';
            paw.innerHTML = pawSVG;
            paw.style.left = Math.random() * 100 + '%';
            paw.style.animationDuration = (15 + Math.random() * 10) + 's';
            paw.style.animationDelay = Math.random() * 5 + 's';
            paw.style.width = (20 + Math.random() * 20) + 'px';
            paw.style.height = paw.style.width;
            floatingPawsContainer.appendChild(paw);
            
            setTimeout(() => {
                paw.remove();
            }, 20000);
        }
        
        // Create initial paws
        for (let i = 0; i < 8; i++) {
            setTimeout(createFloatingPaw, i * 1000);
        }
        
        // Continue creating paws
        setInterval(createFloatingPaw, 3000);
        
        // ========================================
        // CHATBOT
        // ========================================
        const chatToggle = document.getElementById('chatToggle');
        const chatbot = document.getElementById('chatbot');
        const chatMessages = document.getElementById('chatMessages');
        const chatInput = document.getElementById('chatInput');
        
        const botResponses = {
            'horarios': 'Nuestros horarios de atencion son:\n- Lunes a Viernes: 8:00 AM - 8:00 PM\n- Sabados: 9:00 AM - 6:00 PM\n- Domingos: Solo emergencias 24 hrs\n\nTe esperamos!',
            'servicios': 'Ofrecemos:\n- Consulta general\n- Vacunacion\n- Desparasitacion\n- Cirugia veterinaria\n- Emergencias 24/7\n- Peluqueria canina\n- Odontologia animal\n- Hospitalizacion\n\nCual te interesa?',
            'citas': 'Para agendar una cita puedes:\n1. Llamar al +52 (55) 1234-5678\n2. Enviar WhatsApp al mismo numero\n3. Usar nuestro formulario de contacto\n\nTe atendemos con gusto!',
            'emergencias': 'Para emergencias veterinarias estamos disponibles 24/7.\n\nLlama inmediatamente al:\n+52 (55) 1234-5679\n\nO acude a nuestra clinica en Av. Principal #123, Col. Centro.',
            'ubicacion': 'Estamos ubicados en:\nAv. Principal #123, Col. Centro\nCiudad de Mexico, C.P. 06000\n\nPuedes vernos en el mapa de nuestra pagina web.',
            'precios': 'Nuestros precios varian segun el servicio. Te recomendamos agendar una consulta para obtener un presupuesto personalizado. Llama al +52 (55) 1234-5678.',
            'default': 'Gracias por tu mensaje! Para atender tu consulta de manera mas personalizada, te invito a contactarnos por telefono al +52 (55) 1234-5678 o por WhatsApp. Estoy aqui para ayudarte!'
        };
        
        function toggleChat() {
            chatbot.classList.toggle('active');
        }
        
        chatToggle.addEventListener('click', toggleChat);
        
        function sendChatMessage() {
            const message = chatInput.value.trim();
            if (!message) return;
            
            // Add user message
            addChatMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                const response = getBotResponse(message);
                addChatMessage(response, 'bot');
            }, 800);
        }
        
        function sendQuickMessage(message) {
            addChatMessage(message, 'user');
            
            setTimeout(() => {
                const response = getBotResponse(message);
                addChatMessage(response, 'bot');
            }, 800);
        }
        
        function addChatMessage(text, type) {
            const msg = document.createElement('div');
            msg.className = `chat-message ${type}`;
            msg.textContent = text;
            chatMessages.appendChild(msg);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        function getBotResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('horario')) return botResponses['horarios'];
            if (lowerMessage.includes('servicio')) return botResponses['servicios'];
            if (lowerMessage.includes('cita') || lowerMessage.includes('agendar')) return botResponses['citas'];
            if (lowerMessage.includes('emergencia') || lowerMessage.includes('urgencia')) return botResponses['emergencias'];
            if (lowerMessage.includes('ubicacion') || lowerMessage.includes('direccion') || lowerMessage.includes('donde')) return botResponses['ubicacion'];
            if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('cuanto')) return botResponses['precios'];
            
            return botResponses['default'];
        }
        
        function handleChatKeypress(event) {
            if (event.key === 'Enter') {
                sendChatMessage();
            }
        }
        
        // ========================================
        // FORM SUBMISSION
        // ========================================
        const appointmentForm = document.getElementById('appointmentForm');
        
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                petName: document.getElementById('petName').value,
                petType: document.getElementById('petType').value,
                service: document.getElementById('service').value,
                date: document.getElementById('date').value,
                message: document.getElementById('message').value
            };
            
            // Simulate form submission
            alert(`Gracias ${formData.name}! Hemos recibido tu solicitud de cita para ${formData.petName}. Te contactaremos pronto para confirmar.`);
            
            appointmentForm.reset();
        });
        
        // ========================================
        // SMOOTH SCROLL
        // ========================================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // ========================================
        // PREFERS REDUCED MOTION
        // ========================================
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.querySelectorAll('.reveal').forEach(el => {
                el.classList.add('visible');
            });
        }
    