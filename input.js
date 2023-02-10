var keyboardlookups = {
    wouterCodeNumpad: {
        ArrowLeft: 'left',
        ArrowUp: 'up',
        ArrowRight: 'right',
        ArrowDown: 'down',

        Slash: 'minus',
        Period: 'plus',
        Quote: 'divide',
        Semicolon: 'times',
        BracketRight: 'nthroot',
        BracketLeft: 'power',
        Equal: 'equals',

        // Minus: 'minus',
        // Equal: 'plus',
        // BracketLeft: 'divide',
        // BracketRight: 'times',
        // Quote: 'nthroot',
        // Backslash: 'power',
        // Slash: 'equals',

        Space: 'space',
        Tab: 'tab',
        Escape: 'escape',
        Enter: 'enter',
        Backquote: 'apestaart',
        Backspace: 'backspace',

        NumpadSubtract: 'minus',
        NumpadAdd: 'plus',
        NumpadDivide: 'divide',
        NumpadMultiply: 'times',
        NumpadEnter: 'enter',
        Backslash: 'power',

        F1: 'f1',
        F2: 'f2',
        F3: 'f3',
        F4: 'f4',
        F5: 'f5',
        F6: 'f6',
        F7: 'f7',
        F8: 'f8',
        F9: 'f9',
        F10: 'f10',
        F11: 'f11',
        F12: 'f12',

        Digit0: '0',
        Digit1: '1',
        Digit2: '2',
        Digit3: '3',
        Digit4: '4',
        Digit5: '5',
        Digit6: '6',
        Digit7: '7',
        Digit8: '8',
        Digit9: '9',

        Numpad0: '0',
        Numpad1: '1',
        Numpad2: '2',
        Numpad3: '3',
        Numpad4: '4',
        Numpad5: '5',
        Numpad6: '6',
        Numpad7: '7',
        Numpad8: '8',
        Numpad9: '9',

        KeyA: 'a',
        KeyB: 'b',
        KeyC: 'c',
        KeyD: 'd',
        KeyE: 'e',
        KeyF: 'f',
        KeyG: 'g',
        KeyH: 'h',
        KeyI: 'i',
        KeyJ: 'j',
        KeyK: 'k',
        KeyL: 'l',
        KeyM: 'm',
        KeyN: 'n',
        KeyO: 'o',
        KeyP: 'p',
        KeyQ: 'q',
        KeyR: 'r',
        KeyS: 's',
        KeyT: 't',
        KeyU: 'u',
        KeyV: 'v',
        KeyW: 'w',
        KeyX: 'x',
        KeyY: 'y',
        KeyZ: 'z'

    }
}

var keyboards = {
    wouterkeyCode: {
        left: 37,
        up: 38,
        right: 39,
        down: 40,

        minus: 169,
        plus: 173,
        divide: 160,
        times: 164,
        nthroot: 165,
        power: 192,
        equals: 61,


        0: 48,
        1: 49,
        2: 50,
        3: 51,
        4: 52,
        5: 53,
        6: 54,
        7: 55,
        8: 56,
        9: 57,

        a: 65,
        b: 66,
        c: 67

    },
    svenkeyCode: {
        left: 37,
        up: 38,
        right: 39,
        down: 40,

        minus: 219,
        plus: 189,
        divide: 221,
        times: 186,
        nthroot: 192,
        power: 220,
        equals: 187,


        0: 48,
        1: 49,
        2: 50,
        3: 51,
        4: 52,
        5: 53,
        6: 54,
        7: 55,
        8: 56,
        9: 57,

        a: 65,
        b: 66,
        c: 67
    },
    wouterCode: {
        left: 'ArrowLeft',
        up: 'ArrowUp',
        right: 'ArrowRight',
        down: 'ArrowDown',

        minus: 'Minus',
        plus: 'Equal',
        divide: 'BracketLeft',
        times: 'BracketRight',
        nthroot: 'Quote',
        power: 'Backslash',
        equals: 'Slash',

        space: 'Space',
        tab: 'Tab',
        escape: 'Escape',
        enter: 'Enter',
        apestaart: 'Backquote',
        backspace: 'Backspace',

        f1: 'F1',
        f2: 'F2',
        f3: 'F3',
        f4: 'F4',
        f5: 'F5',
        f6: 'F6',
        f7: 'F7',
        f8: 'F8',
        f9: 'F9',
        f10: 'F10',
        f11: 'F11',
        f12: 'F12',


        0: 'Digit0',
        1: 'Digit1',
        2: 'Digit2',
        3: 'Digit3',
        4: 'Digit4',
        5: 'Digit5',
        6: 'Digit6',
        7: 'Digit7',
        8: 'Digit8',
        9: 'Digit9',

        a: 'KeyA',
        b: 'KeyB',
        c: 'KeyC',
        d: 'KeyD',
        e: 'KeyE',
        f: 'KeyF',
        g: 'KeyG',
        h: 'KeyH',
        i: 'KeyI',
        j: 'KeyJ',
        k: 'KeyK',
        l: 'KeyL',
        m: 'KeyM',
        n: 'KeyN',
        o: 'KeyO',
        p: 'KeyP',
        q: 'KeyQ',
        r: 'KeyR',
        s: 'KeyS',
        t: 'KeyT',
        u: 'KeyU',
        v: 'KeyV',
        w: 'KeyW',
        x: 'KeyX',
        y: 'KeyY',
        z: 'KeyZ'
    },
    wouterCodeNumpad: {
        left: 'ArrowLeft',
        up: 'ArrowUp',
        right: 'ArrowRight',
        down: 'ArrowDown',

        minus: 'Slash',
        plus: 'Period',
        divide: 'Quote',
        times: 'Semicolon',
        nthroot: 'BracketRight',
        power: 'BracketLeft',
        equals: 'Equal',

        space: 'Space',
        tab: 'Tab',
        escape: 'Escape',
        enter: 'Enter',
        apestaart: 'Backquote',
        backspace: 'Backspace',


        f1: 'F1',
        f2: 'F2',
        f3: 'F3',
        f4: 'F4',
        f5: 'F5',
        f6: 'F6',
        f7: 'F7',
        f8: 'F8',
        f9: 'F9',
        f10: 'F10',
        f11: 'F11',
        f12: 'F12',

        0: 'Digit0',
        1: 'Digit1',
        2: 'Digit2',
        3: 'Digit3',
        4: 'Digit4',
        5: 'Digit5',
        6: 'Digit6',
        7: 'Digit7',
        8: 'Digit8',
        9: 'Digit9',

        0: 'Numpad0',
        1: 'Numpad1',
        2: 'Numpad2',
        3: 'Numpad3',
        4: 'Numpad4',
        5: 'Numpad5',
        6: 'Numpad6',
        7: 'Numpad7',
        8: 'Numpad8',
        9: 'Numpad9',

        a: 'KeyA',
        b: 'KeyB',
        c: 'KeyC',
        d: 'KeyD',
        e: 'KeyE',
        f: 'KeyF',
        g: 'KeyG',
        h: 'KeyH',
        i: 'KeyI',
        j: 'KeyJ',
        k: 'KeyK',
        l: 'KeyL',
        m: 'KeyM',
        n: 'KeyN',
        o: 'KeyO',
        p: 'KeyP',
        q: 'KeyQ',
        r: 'KeyR',
        s: 'KeyS',
        t: 'KeyT',
        u: 'KeyU',
        v: 'KeyV',
        w: 'KeyW',
        x: 'KeyX',
        y: 'KeyY',
        z: 'KeyZ'
    }
};

function changeKeyboardType() {
    keyboardSelectElement = document.getElementById('keyboardType');
    keyboardType = keyboardSelectElement.value;
    keyLookup = keyboardType in keyboardlookups? keyboardlookups[keyboardType] : invertSimple(keyboards[keyboardType]);
};


function keysPressed(e) {

    out.innerHTML = e.code;

    if (e.shiftKey == 1)
        {

        switch (keyLookup[e.code]) {
            // pijltjes met shift
            case 'left': keysList.push('shift left'); e.preventDefault(); leftSlurp(equation); break;
            case 'up': out.innerHTML = 'shift up'; break;
            case 'right': keysList.push('shift right'); e.preventDefault(); rightSlurp(equation); break;
            case 'down': keysList.push('shift down'); e.preventDefault(); updateLatex(flatten(equation)); break;

            // Speciale tekens met shift
            // case 'equals': equation = math.parse(expr.value); updateLatex(equation); break;
            case 'minus': applyUnaryMinus(); keysList.push('applyUnaryMinus'); break;

            // Cijfers met shift
            case '1': e.preventDefault(); inputDigit(1, equation); break;
            case '2': e.preventDefault(); inputDigit(2, equation); break;
            case '3': e.preventDefault(); inputDigit(3, equation); break;
            case '4': e.preventDefault(); inputDigit(4, equation); break;
            case '5': e.preventDefault(); inputDigit(5, equation); break;
            case '6': e.preventDefault(); inputDigit(6, equation); break;
            case '7': e.preventDefault(); inputDigit(7, equation); break;
            case '8': e.preventDefault(); inputDigit(8, equation); break;
            case '9': e.preventDefault(); inputDigit(9, equation); break;
            case '0': e.preventDefault(); inputDigit(0, equation); break;

            // letters met shift
            case 'a': SelectAllLettersInSelection('a', equation); break; // shift a
            case 'b': SelectAllLettersInSelection('b', equation); break; // shift b
            // case 'c': SelectAllLettersInSelection('c', equation); break; // shift c
            case 'j': SelectAllLettersInSelection('j', equation); break; // shift j
            case 'k': SelectAlljettersInSelection('k', equation); break; // shift k
            case 'm': SelectAllLettersInSelection('m', equation); break; // shift m
            case 'n': SelectAllLettersInSelection('n', equation); break; // shift n
            case 'o': SelectAllLettersInSelection('o', equation); break; // shift o
            case 'p': SelectAllLettersInSelection('p', equation); break; // shift p
            case 'q': SelectAllLettersInSelection('q', equation); break; // shift q
            case 'r': SelectAllLettersInSelection('r', equation); break; // shift r
            case 's': SelectAllLettersInSelection('s', equation); break; // shift s
            case 't': SelectAllLettersInSelection('t', equation); break; // shift t
            case 'u': SelectAllLettersInSelection('u', equation); break; // shift u
            case 'v': SelectAllLettersInSelection('v', equation); break; // shift v
            case 'w': SelectAllLettersInSelection('w', equation); break; // shift w
        
            case 'x': SelectAllLettersInSelection('x', equation); break; // shift x
            case 'y': SelectAllLettersInSelection('y', equation); break; // shift y
            case 'z': SelectAllLettersInSelection('z', equation); break; // shift z

            case 's': applyFunction('sin', equation); break;
            case 'c': applyFunction('cos', equation); break;
            case 't': applyFunction('tan', equation); break; 
            case 'f': applyFunction('f', equation); break;
            case 'g': applyFunction('g', equation); break;
            case 'h': applyFunction('h', equation); break;
            case 'l': applyLog(equation); break;
            case 'e': e.preventDefault(); replaceWithE(equation); break;
            case 'p': replaceWithPi(equation); break; 
            case 'i': applyIntegral(equation); break; 
            case 'd': applyDerivative(equation); break;
        }
    }



    else if (e.ctrlKey == 1)
        switch (keyLookup[e.code]) {
            case 'left': out.innerHTML = 'CTRLleft'; break;
            case 'up': out.innerHTML = 'CTRLup'; updateLatex(herbalanceertermen(equation,'opwaarts')); keysList.push('herbalanceertermen'); updateLatex(equation);break;
            case 'right': out.innerHTML = 'CTRLright'; break;
            case 'down': out.innerHTML = 'CTRLdown'; updateLatex(herbalanceertermen(equation,'neerwaarts')); keysList.push('herbalanceertermen'); updateLatex(equation);break;
            case 'enter': document.getElementById('jqueryknop').click();

            // letters

            case 'd': e.preventDefault(); updateLatex(distributeOrFactorSelectedLeft(equation)); keysList.push('distributeOrFactorSelectedLeft'); updateLatex(equation); break;
            //        case 's': e.preventDefault(); factorSelected(equation); keysList.push('factorSelected'); updateLatex(equation); break;
            //        case 'a': e.preventDefault(); alert('CTRL - f');
            // case 'x': e.preventDefault(); alert('CTRL - f');
            //  case 'y': e.preventDefault(); alert('CTRL - f');
            // case 'c': e.preventDefault(); alert('CTRL - f');
            // case 'b': e.preventDefault(); alert('CTRL - f');

        }

    else if (e.metaKey == 1)

        switch (keyLookup[e.code]) {
            case 'left': out.innerHTML = 'left'; break;
            case 'up': out.innerHTML = 'up'; break;
            case 'right': out.innerHTML = 'right'; break;
            case 'down': out.innerHTML = 'down'; break;

            case 'x': e.preventDefault(); alert('meta - x');
            case 'y': e.preventDefault(); alert('meta - y');
            case 'c': e.preventDefault(); alert('meta - c');
            case 'b': e.preventDefault(); alert('meta - b');

        }

    else if (e.altKey == 1)

        switch (keyLookup[e.code]) {
            case 'left': e.preventDefault(); commuteSelectedWithPrevious(equation); keysList.push('commuteWithPrevious'); break;
            case 'up': e.preventDefault(); substitueerNaar(equation, "boven"); break;
            case 'right': e.preventDefault(); commuteSelectedWithNext(equation); keysList.push('commuteWithNext'); break;
            case 'down': e.preventDefault(); substitueerNaar(equation, "onder"); break;

            // Specialkeys  
            case 'plus': replaceWithPlus(); keysList.push('replacePlus'); break;
            case 'times': replaceWithTimes(); keysList.push('replaceTimes'); break;
            case 'power': replaceWithPower(); keysList.push('replacePower'); break;
            case 'divide': replaceWithDivide(); keysList.push('replaceDivide'); break;
            case 'minus': replaceWithMinus(); keysList.push('replaceMinus'); break;
            case 'nthroot': replaceWithNthroot(); keysList.push('replaceNthroot'); break;
            case 'equals': replaceWithEquality(); keysList.push('replaceEquals'); break;

            // letters
            case 'd': e.preventDefault(); drawGraph(equation); break;


        }

    else

        // ********************************
        //   zonder modifier keys
        // ********************************

        switch (keyLookup[e.code]) {
            case 'left': keysList.push('left'); e.preventDefault(); leftSelect(equation); break;
            case 'up': keysList.push('up'); e.preventDefault(); upSelect(equation); break;
            case 'right': keysList.push('right'); e.preventDefault(); rightSelect(equation); break;
            case 'down': keysList.push('down'); e.preventDefault(); downSelect(equation); break;

            // Specialkeys        
            case 'plus': applyPlus(); keysList.push('applyPlus'); break;
            case 'times': applyTimes(); keysList.push('applyTimes'); break;
            case 'power': applyPower(); keysList.push('applyPower'); break;
            case 'minus': applyMinus(); keysList.push('applyMinus'); break;
            case 'divide': applyDivide(); keysList.push('applyDivide'); break;
            case 'nthroot': applyNthroot(); keysList.push('applyNthroot'); break;
            case 'equals': updateLatex(applyEquality(equation)); keysList.push('applyEquals'); break;

            // Extra keys
            case 'space': e.preventDefault(); keysList.push('space'); spaceBar(equation); break;
            case 'enter': enter(equation
            ); keysList.push('enter'); break;
            case 'backspace': backSpace(); keysList.push('backspace'); break;
            case 'tab': e.preventDefault(); substitueerNaar(equation,'boven'); keysList.push('tab'); break;

            // tekens
            case 'KeyM': komma(); keysList.push('komma'); break;
            case 'Comma': puntKomma(); keysList.push('puntKomma'); break;
            case 'Period': dubbelPunt(); keysList.push('puntKomma'); break;
            case 'IntlBackslash': kleinerDan(); keysList.push('kleinerDan'); break;

            // Cijfers
            case '1': e.preventDefault(); replaceWithDigit('1', equation); break;
            case '2': e.preventDefault(); replaceWithDigit('2', equation); break;
            case '3': e.preventDefault(); replaceWithDigit('3', equation); break;
            case '4': e.preventDefault(); replaceWithDigit('4', equation); break;
            case '5': e.preventDefault(); replaceWithDigit('5', equation); break;
            case '6': e.preventDefault(); replaceWithDigit('6', equation); break;
            case '7': e.preventDefault(); replaceWithDigit('7', equation); break;
            case '8': e.preventDefault(); replaceWithDigit('8', equation); break;
            case '9': e.preventDefault(); replaceWithDigit('9', equation); break;
            case '0': e.preventDefault(); replaceWithDigit('0', equation); break;
            // letters
            case 'a': e.preventDefault(); replaceWithLetter('a',equation); break; //  a
            case 'b': e.preventDefault(); replaceWithLetter('b',equation); break; //  b
            case 'c': e.preventDefault(); replaceWithLetter('c',equation); break; //  c7
            case 'd': e.preventDefault(); replaceWithLetter('d',equation); break; //  d
            case 'e': e.preventDefault(); replaceWithLetter('e',equation); break; //  e
            case 'f': e.preventDefault(); replaceWithLetter('f',equation); break; //  f
            case 'g': e.preventDefault(); replaceWithLetter('g',equation); break; //  g
            case 'h': e.preventDefault(); replaceWithLetter('h',equation); break; //  h
            case 'i': e.preventDefault(); replaceWithLetter('i',equation); break; //  i
            case 'j': e.preventDefault(); replaceWithLetter('j',equation); break; //  j
            case 'k': e.preventDefault(); replaceWithLetter('k',equation); break; //  k
            case 'l': e.preventDefault(); replaceWithLetter('l',equation); break; //  l
            case 'm': e.preventDefault(); replaceWithLetter('m',equation); break; //  m
            case 'n': e.preventDefault(); replaceWithLetter('n',equation); break; //  n
            case 'o': e.preventDefault(); replaceWithLetter('o',equation); break; //  o
            case 'p': e.preventDefault(); replaceWithLetter('p',equation); break; //  p
            case 'q': e.preventDefault(); replaceWithLetter('q',equation); break; //  q
            case 'r': e.preventDefault(); replaceWithLetter('r',equation); break; //  r
            case 's': e.preventDefault(); replaceWithLetter('s',equation); break; //  s
            case 't': e.preventDefault(); replaceWithLetter('t',equation); break; //  t
            case 'u': e.preventDefault(); replaceWithLetter('u',equation); break; //  u
            case 'v': e.preventDefault(); replaceWithLetter('v',equation); break; //  v
            case 'w': e.preventDefault(); replaceWithLetter('w',equation); break; //  w

            case 'x': e.preventDefault(); replaceWithLetter('x',equation); break; //  8
            case 'y': e.preventDefault(); replaceWithLetter('y',equation); break; //  9
            case 'z': e.preventDefault(); replaceWithLetter('z',equation); //  0

            // Functieknoppen
            case 'f1': e.preventDefault(); f1(equation); break;
            case 'f2': e.preventDefault(); f2(equation); break;
            case 'f3': e.preventDefault(); f3(equation); break;
            case 'f4': e.preventDefault(); f4(equation); break;
            case 'f5': e.preventDefault(); f5(equation); break;
            case 'f6': e.preventDefault(); f6(equation); break;
            case 'f7': e.preventDefault(); f7(equation); break;
            case 'f8': e.preventDefault(); f8(equation); break;
            case 'f9': e.preventDefault(); f9(equation); break;
            case 'f10': e.preventDefault(); f10(equation); break;
            // case 'f11': e.preventDefault(); f11(equation); break;
            // case 'f12': e.preventDefault(); f12(equation); break;
        }
};
