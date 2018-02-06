//************************************* */
// CUSTOM FUNCTIES
//************************************* */

var customFunctions = {

    Plus: function () {
        //     arguments is een object met alle argumenten die zijn meegegeven met deze functie erin
        // de argumenten van de plus functie zijn een object, maar moeten eerst naar een array worden omgezet
        var argumentArray = Object.values(arguments);
        // Tel steeds de eerste op met de som van de rest van de array (reduce) en bekom zo de totale som
        sum = argumentArray.reduce(function (a, b) {
            return a + b;
        });
        return sum;
    },
    Times: function () {
        //     arguments is een object met alle argumenten die zijn meegegeven met deze functie erin

        // de argumenten van de Times functie zijn een object, maar moeten eerst naar een array worden omgezet
        var argumentArray = Object.values(arguments);
        // Tel steeds de eerste op met de som van de rest van de array (reduce) en bekom zo de totale som
        product = argumentArray.reduce(function (a, b) {
            return a * b;
        });
        return product;
    },
    minus: function (a, b) {
        return a - b;
    },
    binom: function (n, k) {
        return 1;
    },
    Select: function (a) {
        return a;
    }


};


customFunctions.Plus.toTex = function (node, options) {
    output = '';
    node.args.forEach(function (value, index, parent) {
        
        // geen + schrijven als er toch al een unary minus staat (tenzij er een select rond de unary minus staat)
        // geen plus schrijven voor de eerste term
        value.op == '-' ? teken = '' : teken = '+';
        index == parent.length | index == 0  ? output = output : output += teken;
        nextArgument = value.toTex(options);
        output += nextArgument;
    });
    return '(' + output + ')';
    // return output;
};


/*
        Plus(Select(3),Times(4,Times(5,6),7),8,9,10)
 */

customFunctions.Times.toTex = function (node, options) {
    output = '';
    node.args.forEach(function (value, index, parent) {
        output += value.toTex(options);
        index == parent.length - 1 ? output = output : output += '\\cdot';
    });
    return '(' + output + ')';
};
customFunctions.binom.toTex = '\\mathrm{${name}}\\left(${args}\\right)'; //template string
customFunctions.minus.toTex = function (node, options) {
    return node.args[0].toTex(options) +
        node.name + node.args[1].toTex(options);
};
customFunctions.Select.toTex = function (node, options) {
    console.log('slct');
    return '\\textcolor{red}{' + node.args[0].toTex(options) + '}';
};


//************************************* */
// UTILITY
//************************************* */

// invert functie van internet (support voor dubbele values). Accepteert alleen arrays als keys in het originele object

var invert = function (input) {
    var output = {}

    Object.keys(input).forEach(function (key) {
        var value = input[key]
        output[value] = output[value] || []
        output[value].push(key.split(','))
    })

    return output
}

var invertSimple = function (input) {
    var output = {}

    Object.keys(input).forEach(function (key) {
        var value = input[key]
        output[value] = key
    })

    return output
}

// niet destructief alternatief voor pop()
function returnWithoutLast(arr) {
    newarr = [];
    for (i = 0; i < arr.length - 1; i++) {
        newarr[i] = arr[i];
    };
    return newarr;
};

// brengt geneste multifunctions samen in 1 niveau.
// Niet destructief!
function flatten(eq) {

    neweq = eq.cloneDeep();
    neweq.traverse(function (node, index, parent) {
        if (parent != null) {
 //           console.log(node);
            if (node.type == 'FunctionNode') {
                if (multiFunction[parent.name] == 1 & node.name == parent.name) {

                    indexnum = Number(/\d+/.exec(index));

                    // args van de parent vervangen door eerste deel parent.args, dan child.args, dan tweede deel parents.args
//                    console.log('indexnum:' + indexnum);
//                    console.log('eerste deel:');
//                    console.log(parent.args.slice(0, indexnum));
//                    console.log('tweede deel:');
//                    console.log(node.args);
//                    console.log('derde deel:');
//                    console.log(parent.args.slice(indexnum + 1, parent.args.length));

                    parent.args = parent.args.slice(0, indexnum).concat(node.args, parent.args.slice(indexnum + 1, parent.args.length));



                }
            };
        };
    });

    return neweq;
};


//************************************* */
// SELECTIES
//************************************* */


// bouw een object met als keys de adressen in de uitdrukking bignode en als values het symbool op elk adres

function buildPath(bignode) {

    var adress = [];
    var lastChildAtLevel = [];
    var adressList = new Object;

    bignode.traverse(function (child, arg, parent) {

        switch (child.type) {
            case 'OperatorNode':
                name = child.op;
                break;
            case 'ConstantNode':
                name = child.value;
                break;
            case 'FunctionNode':
                name = child.fn;
                break;
            case 'SymbolNode':
                name = child.name;
                break;
            default:
                name = child.type;
        }

        if (arg == null) {
            arg = 'root?'
        }

        switch (arg.slice(0, 4)) {
            case 'args':
                argnum = /\d+/.exec(arg);
                break;
            case 'cont':
                argnum = 0;
                break;
            default:
                argnum = 8;
        }

        if (parent == null) {
            totalargs = 0
        } else {
            parent.args == undefined ? totalargs = 0 : totalargs = parent.args.length - 1
        }

        var leaf = child.args == undefined & child.content == undefined;
        var lastChild = argnum == totalargs;

        adress.push(arg);

        // console.log(name + ':' + adress);

        adressList[adress] = name;

        // console.log('arg:'+ arg + 'argnum: '+argnum + 'totalargs:' + totalargs);

        if (lastChild) {
            lastChildAtLevel[adress.length] = 1;
        };
        //   console.log(lastChildAtLevel);
        //   console.log('lastChild=' + lastChild);

        if (leaf == 1) {

            adress.pop()

            //   console.log('leafpop');

            if (lastChild == true) {

                //       console.log('leaf+lastChild');

                while (lastChildAtLevel[lastChildAtLevel.length - 1] == 1) {
                    adress.pop();
                    lastChildAtLevel.pop();
                    //           console.log('poptit: '+ lastChildAtLevel.length);
                };
                //   adress.pop();
            };


        };

    });

    return adressList;
};

// geeft een array terug met alle adressen van de gevraagde string in de uitdrukking bignode
function adresses(string, bignode) {
    return invert(buildPath(bignode))[string];
}

// geeft de uitdrukking die op het gegeven adres staat in de uitdrukking bignode
function readAtAdress(adress, bignode) {

    var node = math.parse('');

    for (i = 0; i < adress.length; i++) {
        arg = adress[i];
        switch (arg.slice(0, 4)) {
            case 'root':
                node = bignode;
                console.log('readroot');
                break;
            case 'args':
                node = node.args[/\d+/.exec(arg)];
                console.log('readargs[' + /\d+/.exec(arg) + ']');
                break;
            case 'cont':
                node = node.content;
                console.log('readcontent');
                break;
            default:
                alert('error: non-valid adress: ' + arg);
        };

    };

    return node;;
}

function injectAtAdress(subst, adress, bignode) {
    if (typeof subst === 'string') {
        subst = math.parse(subst)
    };

    var eq = bignode;
    var adressText = '';

    for (i = 0; i < adress.length; i++) {
        arg = adress[i];
        switch (arg.slice(0, 4)) {
            case 'root':
                adressText = ''; /* console.log(arg, adressText) */ ;
                break;
            case 'args':
                adressText = adressText + '.args[' + /\d+/.exec(arg) + ']'; /* console.log(arg, adressText) */ ;
                break;
            case 'cont':
                adressText = adressText + '.content'; /* console.log(arg, adressText) */ ;
                break;
            default:
                alert('error: non-valid adress' + arg);
        };

    };

    //   console.log('adrestext:' + adressText + ' subst: ' + subst);
    // PAS OP WANT DIT IS DESTRUCTIEF en vERANDERT DE OORSPRONKELIJKE VARIABELE !!!
    // IS DAT ECHT ZO? CHECK DIT!
    eval('eq' + adressText + '= subst');
    return eq;
};

// zet een Select() rond de gegeven uitdrukking (mag in stringvorm of in objectvorm zijn)
function selectIt(node) {
    if (typeof node === 'string') {
        node = math.parse(node)
    };
    return new math.expression.node.FunctionNode('Select', [node]);
}

// vervangt wat nu geselecteerd is in bignode door de opgegeven substitutie (mag in stringvorm of in objectvorm zijn)
// de substitutie moet zelf al een Select bevatten want deze functie voegt die niet toe
function substituteSelected(subst, bignode) {
    if (typeof subst === 'string') {
        subst = math.parse(subst)
    };

    // replace in all select adresses
    adresses('Select', bignode).forEach(function (adress) {
        bignode = injectAtAdress(subst, adress, bignode);
    });
    return bignode;
};

/* OUDE VERSIE MET TRANSFORM FUNCTIE
function substituteSelected(subst, bignode) {
    
 subst = subst.replace('Select', 'Salect');
 subst = math.parse(subst);
  
    eq = bignode.transform(function (node, path, parent) {
  if (node.name === 'Select') {
      console.log('subbed')
    return subst;
  }
  
//  }
  else {
      console.log('nosub')
      return node;
  }
});
  
eq = eq.transform(function (node, path, parent) {
  if (node.name === 'Salect') {
      console.log('subbed')
    return math.parse('Select(' + node.args[0] + ')');
  }
  
  else {
      console.log('nosub')
      return node;
  }
});
  
return eq
  
};
 */



selected = function (node) {

    var filtered = node.filter(function (node) {
        return node.isFunctionNode && node.name === 'Select';
    });

    return filtered;

}


//************************************* */
// UPDATES
//************************************* */

updateEval = function (node) {

    antwoord = equation.compile().eval();
    antwoord ? result.innerHTML = antwoord.toString() : result.value = '';

};

updateLatex = function (eq) {
    try {

        // update expression

        expr.value = eq;



        // export the expression to LaTeX
        var latex = eq ? eq.toTex({
            parenthesis: parenthesis,
            implicit: implicit
        }) : '';
        //      console.log('LaTeX expression:', latex);
        var largeLatex = '\\large ' + latex;
        var hugeLatex = '\\Huge ' + latex;

        // display and re-render the expression
        katex.render(largeLatex, pretty);
    } catch (err) {
        pretty.innerHTML = "error!!!"
    }
    updateEval(eq);
}

// verplaatst de selectie naar het gevraagde adress
// past global variabele equation aan!
function MoveSelectToAdress(selectAdress, newAdress, eq) {
    // select eruit halen (dit werkt is getest)
    var cleanedEquation = eq.transform(function (child, path, parent) {
        if (child.fn == 'Select') {
            return child.args[0]
        } else {
            return child
        };
    });
    console.log('cleaned');

    eq = injectAtAdress(selectIt(readAtAdress(newAdress, cleanedEquation)), newAdress, cleanedEquation);
    console.log('injected');
    equation = eq;

};


//************************************* */
// ACTIES
//************************************* */

function applyPlus() {

    selectAdress = adresses('Select', equation)[0];
    selectNode = readAtAdress(selectAdress, equation);
    secondTerm = math.parse('Select(b)');
    substitution = new math.expression.node.FunctionNode('Plus', [selectNode.args[0], secondTerm]);
    equation = substituteSelected(substitution, equation);
    equation = flatten(equation);
    updateLatex(equation);
}

function replaceWithPlus() {
    //    expr.value = 'Plus(3, Times(3, Select(4), 5), 7)';

    substitution = 'Plus(Select(x),y)';
    equation = substituteSelected(substitution, equation);
    updateLatex(equation);
}

function applyTimes() {

    selectAdress = adresses('Select', equation)[0];
    selectNode = readAtAdress(selectAdress, equation);
    secondFactor = math.parse('Select(b)');
    substitution = new math.expression.node.FunctionNode('Times', [selectNode.args[0], secondFactor]);
    equation = substituteSelected(substitution, equation);
    equation = flatten(equation);
    updateLatex(equation);
}

function replaceWithTimes() {

    substitution = 'Times(Select(a),b)';
    equation = substituteSelected(substitution, equation);
    updateLatex(equation);
}

function applyPower() {

    selectAdress = adresses('Select', equation)[0];
    selectNode = readAtAdress(selectAdress, equation);
    exponent = math.parse('Select(b)');
    substitution = new math.expression.node.OperatorNode('^', 'pow', [selectNode.args[0], exponent]);
    equation = substituteSelected(substitution, equation);
    updateLatex(equation);
}

function replaceWithPower() {

    substitution = 'Select(a) ^ b';
    equation = substituteSelected(substitution, equation);
    updateLatex(equation);

}

function applyMinus() {

    selectAdress = adresses('Select', equation)[0];
    selectNode = readAtAdress(selectAdress, equation);
    substractor = math.parse('Select(-b)');
    substitution = new math.expression.node.FunctionNode('Plus', [selectNode.args[0], substractor]);
    equation = substituteSelected(substitution, equation);
    equation = flatten(equation);
    updateLatex(equation);
}

function replaceWithMinus() {

    substitution = '(Select(a)-b)';
    equation = substituteSelected(substitution, equation);
    updateLatex(equation);
}


function applyDivide() {

    selectAdress = adresses('Select', equation)[0];
    selectNode = readAtAdress(selectAdress, equation);
    divisor = math.parse('Select(b)');
    substitution = new math.expression.node.OperatorNode('/', 'divide ', [selectNode.args[0], divisor]);
    equation = substituteSelected(substitution, equation);
    updateLatex(equation);
}

function replaceWithDivide() {

    substitution = 'Select(a) / b';
    equation = substituteSelected(substitution, equation);
    updateLatex(equation);
}

function applyNthroot() {

    selectAdress = adresses('Select', equation)[0];
    selectNode = readAtAdress(selectAdress, equation);
    rootnumber = math.parse('Select(b)');
    substitution = new math.expression.node.FunctionNode('nthRoot', [selectNode.args[0], rootnumber]);
    equation = substituteSelected(substitution, equation);
    updateLatex(equation);
}

function replaceWithNthroot() {

    substitution = 'nthRoot(Select(a),b)';
    equation = substituteSelected(substitution, equation);
    updateLatex(equation);
}

function applyEquality() {

    selectAdress = adresses('Select', equation)[0];
    selectNode = readAtAdress(selectAdress, equation);
    tweedeLid = math.parse('Select(b)');
    substitution = new math.expression.node.OperatorNode('==','equal', [selectNode.args[0], tweedeLid]);
    equation = substituteSelected(substitution, equation);
    updateLatex(equation);
}

function replaceWithEquality() {
    equation = math.parse('Select(a)==b');
    updateLatex(equation);
}

function leftSelect(eq) {

    // bereken het nieuwe adres voor select
    // dit is maar 1 enkel selectadres dus momenteel werkt deze functie alleen voor enkele selecties 
    selectAdress = adresses('Select', eq)[0];
    console.log('selectAdress: ');
    console.log(selectAdress);

    // als Select al de root is: doe niks
    if (eq.fn == 'Select') {
        return
    };

    // vind het nummer van dit argument
    if (selectAdress[selectAdress.length - 1] == 'content') {
        huidigNummer = 0;
    } else {
        huidigNummer = Number(/\d+/.exec(selectAdress[selectAdress.length - 1])[0]);
    };

    upAdress = returnWithoutLast(selectAdress);
    console.log('upAdress: ');
    console.log(upAdress);

    upNode = readAtAdress(upAdress, eq);

    upNode.args == undefined ? laatsteNummer = 0 : laatsteNummer = upNode.args.length - 1;
    console.log('laatsteNummer: ' + laatsteNummer);

    nieuwNummer = Math.max(0, huidigNummer - 1);
    // omkeren voor een nthroot (want daar staat het tweede argument (de exponent) links
    if (readAtAdress(upAdress, equation).name == 'nthRoot') {nieuwNummer = Math.min(huidigNummer + 1, laatsteNummer);};

    if (selectAdress[selectAdress.length - 1] == 'content') {
        leftAdress = upAdress.concat(['content']);
    } else {
        leftAdress = upAdress.concat(['args[' + nieuwNummer + ']']);
    };

    console.log('leftAdress: ');
    console.log(leftAdress);

    MoveSelectToAdress(selectAdress, leftAdress, eq);

    updateLatex(equation);

}

function rightSelect(eq) {
    // bereken het nieuwe adres voor select
    // dit is maar 1 enkel selectadres dus momenteel werkt deze functie alleen voor enkele selecties 
    selectAdress = adresses('Select', eq)[0];
    console.log('selectAdress: ');
    console.log(selectAdress);

    // als Select al de root is: doe niks
    if (eq.fn == 'Select') {
        return
    };

    // vind het nummer van dit argument, en het aantal argumenten
    if (selectAdress[selectAdress.length - 1] == 'content') {
        huidigNummer = 0;
    } else {
        huidigNummer = Number(/\d+/.exec(selectAdress[selectAdress.length - 1])[0]);
    };
    console.log('huidigNummer: ');
    console.log(huidigNummer);

    upAdress = returnWithoutLast(selectAdress);
    console.log('upAdress: ');
    console.log(upAdress);

    upNode = readAtAdress(upAdress, eq);

    upNode.args == undefined ? laatsteNummer = 0 : laatsteNummer = upNode.args.length - 1;
    console.log('laatsteNummer: ' + laatsteNummer);

    nieuwNummer = Math.min(huidigNummer + 1, laatsteNummer);

    // omkeren voor een nthroot (want daar staat het tweede argument (de exponent) links
    if (upNode.name == 'nthRoot') {nieuwNummer = Math.max(0, huidigNummer - 1)};
    console.log('nieuwNummer: ' + nieuwNummer);

    if (selectAdress[selectAdress.length - 1] == 'content') {
        rightAdress = upAdress.concat(['content']);
    } else {
        rightAdress = upAdress.concat(['args[' + nieuwNummer + ']']);
    };
    console.log('rightAdress: ');
    console.log(rightAdress);

    MoveSelectToAdress(selectAdress, rightAdress, eq);

    updateLatex(equation);
}

function upSelect(eq) {
    // als Select al de root is: doe niks
    if (eq.fn == 'Select') {
        return
    };
    // bereken het nieuwe adres voor select

    // dit is maar 1 enkel selectadres dus momenteel werkt deze functie alleen voor enkele selecties    
    selectAdress = adresses('Select', eq)[0];
    console.log('selectAdress: ');
    console.log(selectAdress);

    upAdress = returnWithoutLast(selectAdress);
    console.log(' upAdress: ');
    console.log(upAdress);

    //     // select eruit halen (dit werkt is getest)
    //     var cleanedEquation = eq.transform(function (child, path, parent) {
    //         if (child.fn == 'Select') {return child.args[0] } else { return child};
    //     });
    // console.log('cleaned');

    //  eq = injectAtAdress(selectIt(readAtAdress(upAdress, cleanedEquation)),upAdress,cleanedEquation);
    //  console.log('injected');
    //  equation = eq;

    MoveSelectToAdress(selectAdress, upAdress, eq);

    equation = flatten(equation);

    updateLatex(equation);
}

function downSelect(eq, actionName) {

    // dit is maar 1 enkel selectadres dus momenteel werkt deze functie alleen voor enkele selecties    
    selectAdress = adresses('Select', eq)[0];
    console.log('selectAdress: ');
    console.log(selectAdress);

    selectNode = readAtAdress(selectAdress, eq);

    // als Select een leaf is: doe niks
    if (selectNode.args[0].args == undefined & selectNode.args[0].content == undefined) {
        return
    };
    // ALLEEN ALS GEEN CONTENT ALS CONTENT DAN select.adress.content
    if (selectNode.args[0].content == undefined) {
        downAdress = selectAdress.concat(['args[0]']);
    } else if (selectNode.args[0].args == undefined) {
        downAdress = selectAdress.concat(['content']);
    } else {
        return
    };

    console.log(' downAdress: ');
    console.log(downAdress);

    //     // select eruit halen (dit werkt is getest)
    //     var cleanedEquation = eq.transform(function (child, path, parent) {
    //         if (child.fn == 'Select') {return child.args[0] } else { return child};
    //     });
    // console.log('cleaned');

    //  eq = injectAtAdress(selectIt(readAtAdress(downAdress, cleanedEquation)),downAdress,cleanedEquation);
    //  console.log('injected');
    //  equation = eq;

    MoveSelectToAdress(selectAdress, downAdress, eq);

    // noteer dat er een succesvolle downselect is gebeurd DIT Staat nu gewoon bij de keyhandler functie
    // keysList.push(actionName);

    // update de latexweergave
    updateLatex(equation);

};

// SHIFT toetsen

// TEstcase: Times(2,3,Select(Times(6,7)),Times(8,9),10)

function rightSlurp(eq) {

    // zoek uit of de parent een multifunction is
    selectAdress = adresses('Select', eq)[0];
    parentAdress = returnWithoutLast(selectAdress);
    parentNode = readAtAdress(parentAdress, eq);
    if (parentNode.type == 'FunctionNode') {
        if (multiFunction[parentNode.name] == 1) {


            selectNode = readAtAdress(selectAdress, eq);

            
            huidigNummer = Number(/\d+/.exec(selectAdress[selectAdress.length - 1])[0]);
            if (huidigNummer < parentNode.args.length - 1) {

                first = selectNode.args[0];
                secondAdress = selectAdress;

                secondAdress[secondAdress.length - 1] = 'args[' + (huidigNummer + 1) + ']';
                second = readAtAdress(secondAdress, eq);


                newSelection = new math.expression.node.FunctionNode(parentNode.name, [first, second]);
                newSelection = selectIt(flatten(newSelection));

                newParent = parentNode;
                newParent.args.splice(huidigNummer, 2, newSelection)
                eq = injectAtAdress(newParent, parentAdress, eq);

                updateLatex(equation);

                return eq;
            };
        } else {
            return eq;
        };
    };
};

function leftSlurp(eq) {

    // zoek uit of de parent een multifunction is
    selectAdress = adresses('Select', eq)[0];
    parentAdress = returnWithoutLast(selectAdress);
    parentNode = readAtAdress(parentAdress, eq);
    if (parentNode.type == 'FunctionNode') {
        if (multiFunction[parentNode.name] == 1) {


            selectNode = readAtAdress(selectAdress, eq);

            first = selectNode.args[0];
            secondAdress = selectAdress;
            huidigNummer = Number(/\d+/.exec(selectAdress[selectAdress.length - 1])[0]);
            if (huidigNummer > 0) {

                secondAdress[secondAdress.length - 1] = 'args[' + (huidigNummer - 1) + ']';
                second = readAtAdress(secondAdress, eq);

// de tweede wordt hier eerst gezet
                newSelection = new math.expression.node.FunctionNode(parentNode.name, [second, first]);
                newSelection = selectIt(flatten(newSelection));

                newParent = parentNode;
                newParent.args.splice(huidigNummer-1, 2, newSelection);
                eq = injectAtAdress(newParent, parentAdress, eq);

                updateLatex(equation);

                return eq;
            };
        } else {
            return eq;
        };
    };
};