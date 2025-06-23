let words = 'banana.tmwyl.trigonometry.evaporate.frog.book.timeline.death.guarantee.restaurant.minstrel.purify.cheese.soup.pineapple.yay.hopeful.type.reverse.word.game.june.burger.space.bed.sleep.calendar.oviviparous.caution.untitled.level.trademark.custom.pickle.document.please.seven.thirteen.cooperate.model.encourage.zzyzx'.split('.');

let q51 = document.getElementById('q8');
let a53input = document.getElementById('a8input');
let word = words[Math.floor(Math.random() * words.length)];
let questaion = [word,[...word].reverse().join('')];
q51.textContent = questaion[0];

a53input.addEventListener('input', function(e) {
    windows[5].win = (e.target.value.toLowerCase() == questaion[1]);
});

windows[5].reset = () => {
    word = words[Math.floor(Math.random() * words.length)];
questaion = [word,[...word].reverse().join('')];
}