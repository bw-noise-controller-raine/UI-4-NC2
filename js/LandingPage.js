const nav = document.querySelectorAll('.nav a')
nav.forEach(function(nav) {
    nav.addEventListener('mouseenter', function() {
        nav.style.background = 'hotpink';
    })
    nav.addEventListener('mouseleave', function() {
        nav.style.background = '#17A2B8';
    })
})



function isUndefined(value) {
    return value === undefined || value === 'undefined';
}

document.addEventListener('DOMContentLoaded', function() {
    $(document.body).nanoScroller();

    // Footer position logic
    var footer = document.querySelector('.landing-page-footer');
    if (footer) {
        footer.style.top = document.body.querySelector('.nano-content').scrollHeight + 'px';
    }
})

// Content scale logic
var viewport = document.querySelector('meta[name="viewport"]');

function updateScale() {
    if (window.innerWidth > 576) {
        viewport.setAttribute('content', 'initial-scale=1');
        return;
    };

    var siteWidth = 400;
    var scale = window.innerWidth / siteWidth;
    viewport.setAttribute('content', 'width=' + siteWidth + ', initial-scale=' + scale + '');
}

updateScale();
window.addEventListener('resize', updateScale);

// Countdown logic
function renderCountdown({
    e,
    days,
    hours,
    minutes,
    seconds,
    showLabel
}) {
    var days = e ? e.strftime('%D') : days;
    var hours = e ? e.strftime('%H') : hours;
    var minutes = e ? e.strftime('%M') : minutes;
    var seconds = e ? e.strftime('%S') : seconds;

    var daysHtml = '<div class="countdown-item__value -days">' + days + (showLabel ? '<div class="countdown-item__label">day' + ((e && e.offset.days) === 1 ? '' : 's') + '</div>' : '') + '</div>';
    var hoursHtml = '<div class="countdown-item__value">' + hours + (showLabel ? '<div class="countdown-item__label">hour' + ((e && e.offset.hours) === 1 ? '' : 's') + '</div>' : '') + '</div>';
    var minutesHtml = '<div class="countdown-item__value">' + minutes + (showLabel ? '<div class="countdown-item__label">minute' + ((e && e.offset.minutes) === 1 ? '' : 's') + '</div>' : '') + '</div>';
    var secondsHtml = '<div class="countdown-item__value">' + seconds + (showLabel ? '<div class="countdown-item__label">second' + ((e && e.offset.seconds) === 1 ? '' : 's') + '</div>' : '') + '</div>';

    return daysHtml + hoursHtml + minutesHtml + secondsHtml;
}

$('.countdown-item').each(function() {
    var elem = $(this);
    var date = elem.data('end-date');
    var endText = elem.data('end-text');
    var showLabel = elem.data('show-label');

    function renderEndResult() {
        var countdownResult = renderCountdown({
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00',
            showLabel: showLabel
        });
        elem.html((!endText || isUndefined(endText)) ? countdownResult : endText);
    };

    if (!isUndefined(date) && date) {
        elem.countdown(new Date(date), function(e) {
            $(this).html(renderCountdown({
                e: e,
                showLabel: showLabel
            }));
        }).on('finish.countdown', function() {
            renderEndResult();
        });
    } else {
        renderEndResult();
    }
})