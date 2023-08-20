$(document).ready(function() {
    // Pobierz szerokość kontenera slidera
    var containerWidth = $('.slider-container').width();
    // Pobierz szerokość elementu slidera
    var itemWidth = $('.slider-item').outerWidth();
    // Pobierz liczbę elementów slidera
    var itemsCount = $('.slider-item').length;
    // Oblicz szerokość wrappera
    var wrapperWidth = itemWidth * itemsCount;
    // Oblicz liczbę widocznych elementów
    var visibleItems = Math.floor(containerWidth / itemWidth);
    // Oblicz szerokość widocznych elementów
    var visibleWidth = visibleItems * itemWidth;
    // Ustaw pozycję slidera na początku
    var position = 0;

    // Ustaw szerokość wrappera na podstawie liczby elementów
    $('.slider-wrapper').css('width', wrapperWidth + 'px');

    // Sprawdź, czy przyciski powinny być wyłączone
    function checkButtons() {
        if (position === 0) {
            $('.slider-prev').addClass('disabled');
        } else {
            $('.slider-prev').removeClass('disabled');
        }

        if (position === -(wrapperWidth - visibleWidth)) {
            $('.slider-next').addClass('disabled');
        } else {
            $('.slider-next').removeClass('disabled');
        }
    }

    // Sprawdź, czy przyciski powinny być wyłączone przy uruchomieniu slidera
    checkButtons();

    // Obsługa przycisku "Poprzedni"
    $('.slider-prev').click(function() {
        // Sprawdź, czy slider nie jest już na początku
        if (position !== 0) {
            // Przesuń slider o jeden element w prawo
            position += itemWidth;
            $('.slider-wrapper').css('transform', 'translateX(' + position + 'px)');
            // Sprawdź, czy przyciski powinny być wyłączone
            checkButtons();
        }
    });

    // Obsługa przycisku "Następny"
    $('.slider-next').click(function() {
        // Sprawdź, czy slider nie jest już na końcu
        if (position !== -(wrapperWidth - visibleWidth)) {
            // Przesuń slider o jeden element w lewo
            position -= itemWidth;
            $('.slider-wrapper').css('transform', 'translateX(' + position + 'px)');
            // Sprawdź, czy przyciski powinny być wyłączone
            checkButtons();
        }
    });
});

// Mobilne

// Zdefiniuj dwie zmienne do przechowywania pozycji dotknięcia
var touchStartX = 0;
var touchEndX = 0;

// Dodaj obsługę zdarzenia touchstart do slidera
$('.slider-wrapper').on('touchstart', function(event) {
    // Zapisz pozycję dotknięcia
    touchStartX = event.touches[0].clientX;
});

// Dodaj obsługę zdarzenia touchmove do slidera
$('.slider-wrapper').on('touchmove', function(event) {
    // Zapisz pozycję dotknięcia podczas przesuwania
    touchEndX = event.touches[0].clientX;
});

// Dodaj obsługę zdarzenia touchend do slidera
$('.slider-wrapper').on('touchend', function() {
    // Sprawdź kierunek przesunięcia palca i uruchom odpowiednią funkcję
    if (touchEndX < touchStartX) {
        $('.slider-next').click();
    } else if (touchEndX > touchStartX) {
        $('.slider-prev').click();
    }
});