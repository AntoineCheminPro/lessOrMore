// Écrire une fonction en JS  qui implémente le jeu du plus ou moins. 
// Le but du jeu est de deviner un nombre entier choisi au hasard entre 1 et 100 inclus par l'ordinateur.
// À chaque tour, l'utilisateur doit proposer un nombre et l'ordinateur lui indique si le nombre choisi est trop grand ou trop petit par rapport au nombre à deviner. Le jeu se termine lorsque l'utilisateur trouve le nombre ou atteint le nombre maximum de tentatives autorisées.
// Votre fonction doit prendre en entrée le nombre maximum de tentatives autorisées, et retourner le nombre de tentatives utilisées pour deviner le nombre.
// Contraintes :
// La fonction doit être écrite en utilisant des boucles while.
// Vous ne pouvez pas utiliser de fonctions de la librairie standard de JavaScript.

function resetButton() {
    $('.trys').each(function () {
        $(this).text($(this).attr("id"));
        $(this).css({
            "background-color": "",
            "display": "none"
        });
    });
    $('body').css({
        "background-color": "",
        "color": ""
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function promptTheNumber(trys, maxTry) {
    return window.prompt(`tentative ${trys} sur ${maxTry} : proposez un nombre`)
}

function timer(trys, maxTry, theGoodOneIs) {
    setTimeout(function () {
        playRound(trys, maxTry, theGoodOneIs);
    }, 100);
}

function Cplus(number, trys, button, maxTry, theGoodOneIs) {
    button.text(number + "\n c'est plus");
    button.css({
        "display": "block",
        "white-space": "pre-wrap",
        "background-color": "green",
    });
    setTimeout(function () {
    }, 500);
    lastButton = button; // Mise à jour de lastButton
    timer(trys, maxTry, theGoodOneIs);
}

function Cmoins(number, trys, button, maxTry, theGoodOneIs) {
    button.text(number + "\n c'est moins");
    button.css({
        "display": "block",
        "white-space": "pre-wrap",
        "background-color": "red"
    });
    setTimeout(function () {
    }, 0);
    lastButton = button; // Mise à jour de lastButton
    timer(trys, maxTry, theGoodOneIs);
}

function HotOrNot(number, theGoodOneIs) {
    let h2 = $('h2');
    let h1 = $('h1');
    let diff = Math.abs(number-theGoodOneIs);
    diff <= 10 ? Cchaud(h2, h1) : null;
    diff >= 20 ? Cfroid(h2, h1) : null;
    diff <20 && diff > 10 ? Ctiede(h2, h1) : null;
}

function Cchaud(h2, h1) {
    $('body').css({
        'background-image': "url('volcan.jpg')",
        'background-size': 'cover',
        'color' : 'white'
    });
    h2.text('Tu chauffes');
}

function Cfroid(h2, h1) {
    $('body').css({
        'background-image': "url('iceberg.jpg')",
        'background-size': 'cover',
        'color' : 'blue'
    });
    h2.text("Fait pas chaud ici");
    }

function Ctiede(h2, h1) {
    $('body').css({
        'background-image': "url('fonds-ecran-ile-paradisique-5-1024x640.jpg')",
        'background-size': 'cover',
        'color' : 'black'
    });
    h2.text("Tu es si proche !");
}


let lastButton;

function playRound(trys, maxTry, theGoodOneIs) {
    trys++;
    var newButton = $('<button/>', {
        id: trys,
        class: 'trys',
        text: trys.toString()
    });

    // si perdu
    if (trys == maxTry) {
        alert(`Perdu au bout de ${maxTry} tentatives, le nombre était : ${theGoodOneIs}`);
        return;
    }

    $('#btnRow').append(newButton);
    let number = promptTheNumber(trys, maxTry);
    var buttonId = "#" + trys;
    var button = $(buttonId);


    // si gagné
    if (number == theGoodOneIs) {
        button.text(number + "\n Gagné");
        button.css({
            "display": "block",
            "white-space": "pre-wrap",
            "background-color": "gold",
        });
        $('h2').text("Tu as eu de la chance là, non?!?");
        return;
    }

    number > theGoodOneIs ? Cmoins(number, trys, button, maxTry, theGoodOneIs) : Cplus(number, trys, button, maxTry, theGoodOneIs);
    HotOrNot(number, theGoodOneIs)

}

function justePrix() {
    let trys = 0;
    let maxTry = 10;
    resetButton();
    let theGoodOneIs = getRandomInt(100);
    playRound(trys, maxTry, theGoodOneIs);
}