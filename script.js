document.addEventListener('DOMContentLoaded', function() {
    // Funkcja do pobierania zawartości strony
    async function loadPage(pageName) {
        try {
            // Na GitHub Pages wszystkie pliki HTML są już załadowane w index.html
            // Symulujemy pobieranie treści z różnych plików HTML
            const pageContent = document.querySelector(`[data-page="${pageName}"]`);
            
            // Aktualizujemy aktywną zakładkę
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`[data-page="${pageName}"]`).classList.add('active');
            
            // Pobieramy treść odpowiedniej podstrony
            let content;
            
            switch(pageName) {
                case 'home':
                    content = document.querySelector('template[data-template="home"]').content.cloneNode(true);
                    break;
                case 'about':
                    content = document.querySelector('template[data-template="about"]').content.cloneNode(true);
                    break;
                case 'contact':
                    content = document.querySelector('template[data-template="contact"]').content.cloneNode(true);
                    break;
                default:
                    content = document.querySelector('template[data-template="home"]').content.cloneNode(true);
            }
            
            // Ukrywamy aktualną zawartość
            const mainContent = document.getElementById('content');
            mainContent.style.opacity = 0;
            
            // Po krótkim opóźnieniu wyświetlamy nową zawartość
            setTimeout(() => {
                mainContent.innerHTML = '';
                mainContent.appendChild(content);
                mainContent.style.opacity = 1;
                
                // Inicjalizacja formularza kontaktowego, jeśli jest na stronie
                if (pageName === 'contact') {
                    initContactForm();
                }
            }, 300);
            
        } catch (error) {
            console.error('Błąd ładowania strony:', error);
            document.getElementById('content').innerHTML = `<p>Wystąpił błąd podczas ładowania strony. Spróbuj ponownie.</p>`;
        }
    }
    
    // Obsługa nawigacji
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            // Zmieniamy URL bez przeładowania strony
            history.pushState({page: page}, '', `#${page}`);
            loadPage(page);
        });
    });
    
    // Obsługa przycisku wstecz w przeglądarce
    window.addEventListener('popstate', function(e) {
        const page = e.state ? e.state.page : 'home';
        loadPage(page);
    });
    
    // Funkcja inicjalizująca formularz kontaktowy
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Tutaj można dodać walidację formularza
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                
                if (!name || !email || !message) {
                    alert('Proszę wypełnić wszystkie pola formularza!');
                    return;
                }
                
                // Symulacja wysyłania formularza
                alert('Dziękujemy za wiadomość! Odpowiemy najszybciej jak to możliwe.');
                form.reset();
            });
        }
    }
    
    // Obsługa przycisku CTA na stronie głównej
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('cta-button')) {
            history.pushState({page: 'about'}, '', '#about');
            loadPage('about');
        }
    });
    
    // Funkcja do pobierania zawartości strony z plików HTML
    function createTemplates() {
        const templates = {
            home: `
                <div class="page-content fade-in">
                <section class="hero">
                    <h1>Witaj na mojej stronie!</h1>
                    <p>Jestem studentem Informatyki i aktywnym działaczem w organizacjach studenckich.</p>
                    <button class="cta-button">Sprawdź moje projekty</button>
                </section>
                
                <section class="features">
                    <div class="feature-box">
                        <h2>coś 1</h2>
                        <p>kiedyś coś tu dodam</p>
                    </div>
                    <div class="feature-box">
                        <h2>coś 2</h2>
                        <p>kiedyś coś tu dodam</p>
                    </div>
                    <div class="feature-box">
                        <h2>coś 3</h2>
                        <p>kiedyś coś tu dodam</p>
                    </div>
                </section>
            </div>
            `,
            about: `
                <div class="page-content fade-in">
                    <h1>O mnie</h1>
                    <div class="about-container">
                        <div class="about-image">
                            <div class="placeholder-image"></div>
                        </div>
                        <div class="about-text">
                            <h2>Kim jestem?</h2>
                            <p>Jestem Studentem Akademi Górniczo-Hutniczej na wydziale Informatyki, aktywnym działaczem w kołach naukowych 
                                <a href="https://www.eko-energia.agh.edu.pl/">Eko-Energia</a>, 
                                <a href="https://knbit.edu.pl/">Bit</a> sekcja AI.</p>

                            
                            <h2>Moje umiejętności</h2>
                            <ul>
                                <li>Python Java C Rust Julia</li>
                                <li>AI-Game Theory</li>
                                <li></li>
                                <li></li>
                                <li>Git, GitHub</li>
                            </ul>
                            
                            <h2>Moje doświadczenie</h2>
                            <p>Większość mojego doświadczenia z programowaniem to projekty związane z studiami i kołami naukowymi.</p>
                        </div>
                    </div>
                </div>
            `,
            contact: `
                <div class="page-content fade-in">
                    <h1>Kontakt</h1>
                    <div class="contact-container">
                        <div class="contact-info">
                            <h2>Skontaktuj się ze mną</h2>
                            <p>Chętnie odpowiem na Twoje pytania i rozważę propozycje współpracy.</p>
                            
                            <div class="contact-details">
                                <div class="contact-item">
                                    <strong>Email:</strong>
                                    <p>kacperfeliks@gmail.com</p>
                                </div>
                                <div class="contact-item">
                                    <strong>Lokalizacja:</strong>
                                    <p>Kraków, Polska</p>
                                </div>
                            </div>
                            
                            <div class="social-links">
                                <a href="https://github.com/Kacperon" class="social-link">GitHub</a>
                                <a href="https://www.linkedin.com/in/kacper-feliks-a7b94633b/" class="social-link">Twitter</a>
                            </div>
                        </div>
                        
                        <div class="contact-form">
                            <h2>Formularz kontaktowy(nie działa na github pages)</h2>
                            <form id="contactForm">
                                <div class="form-group">
                                    <label for="name">Imię i nazwisko</label>
                                    <input type="text" id="name" name="name" required>
                                </div>
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" id="email" name="email" required>
                                </div>
                                <div class="form-group">
                                    <label for="message">Wiadomość</label>
                                    <textarea id="message" name="message" rows="5" required></textarea>
                                </div>
                                <button type="submit" class="submit-button">Wyślij wiadomość</button>
                            </form>
                        </div>
                    </div>
                </div>
            `
        };
        
        // Tworzymy szablony i dodajemy je do dokumentu
        Object.keys(templates).forEach(key => {
            const template = document.createElement('template');
            template.setAttribute('data-template', key);
            template.innerHTML = templates[key];
            document.body.appendChild(template);
        });
    }
    
    // Inicjalizacja strony
    createTemplates();
    
    // Sprawdzamy, czy jest hash w URL
    const currentPage = window.location.hash ? window.location.hash.substring(1) : 'home';
    
    // Zapisujemy stan w historii
    history.replaceState({page: currentPage}, '', `#${currentPage}`);
    
    // Ładujemy odpowiednią stronę
    loadPage(currentPage);
});
