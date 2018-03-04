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
    },

    And: function () {
        var argumentArray = Object.values(arguments);
        allTrue = argumentArray.reduce(function (a,b) {
            return a && b;
        });
        return allTrue;
    },

    Or: function () {
        var argumentArray = Object.values(arguments);
        atLeastOneTrue = argumentArray.reduce(function (a,b) {
            return a || b;
        });
        return atLeastOneTrue;
    }


};


customFunctions.Plus.toTex = function (node, options) {
    output = '';
    plusTeken = '';
    node.args.forEach(function (value, index, parent) {
        
        // geen + schrijven als er toch al een unary minus staat (tenzij er een select rond de unary minus staat)
        // geen plus schrijven voor de eerste term
        value.name == 'unaryMinus' ? plusTeken = '' : plusTeken = '+';
        index == 0  ? output = output : output += plusTeken;
        output += value.toTex(options);
        console.log('plustex:' + output);
    });
    // return '(' + output + ')';
    return output;
};


/*
        Plus(Select(3),Times(4,Times(5,6),7),8,9,10)
 */

customFunctions.Times.toTex = function (node, options) {
    output = '';
    options.implicit == 'hide' ? maalTeken = '~' : maalTeken = '\\cdot';
    // console.log('teken: ' + maalTeken);
    node.args.forEach(function (value, index, parent) {
        
        // console.log('maalteken: ' + maalTeken);
        
        (value.isConstantNode || (value.name == 'Select' && value.args[0].isConstantNode)) ? ditTeken = '\\cdot' : ditTeken = maalTeken;
        if (index == 0) {
            ditTeken = ''
         } else if  (value.isConstantNode || (value.name == 'Select' && value.args[0].isConstantNode)) { ditTeken = '\\cdot';}
        else {ditTeken = maalTeken;}

        output += ditTeken;

        // console.log('ditTeken: ' + ditTeken);

        selectedPlus = value.name == 'Select' && value.args[0].name == 'Plus';
        plus = value.name == 'Plus';

        plusOrSelectedPlus = selectedPlus || plus;

// console.log('plusOrSelectedPlus' + plusOrSelectedPlus);

        plusOrSelectedPlus ? output += '(' + value.toTex(options) + ')' : output += value.toTex(options);

    //     console.log('timestex: '+ output);
    //     console.log(value);
    //    // console.log(value.toTex(options));
    });
    options.parenthesis == 'all' ? output = '(' + output + ')' : output = output ;
    //return output;
    // console.log(output);
    return  output;
};

// katex.render("\\begin{cases} a b + c &=a \\\\ a b + c &=d \\\\ a b + c + d &=b \\\\ a b + c &=b \\\\ e&=b+c \\end{cases}", pretty)
// Stelsels

customFunctions.And.toTex = function (node, options) {
    var output = '';
    node.args.forEach(function (value, index, parent) {
        output += value.toTex(options);
        index == parent.length - 1 ? output = output : output += '\\\\';

    });

    output = '\\begin{cases}' + output + '\\end{cases}';
    return output;
};

// katex.render("\\begin{array}{c|c} a & b \\\\ c & d \\end{array}", pretty)
// Disjuncties

customFunctions.Or.toTex = function (node, options) {
    var output = '';
    var c = '';
    node.args.forEach(function (value, index, parent) {
        output += value.toTex(options);
        c += 'c';
        index == parent.length - 1 ? output = output : output += '&';
        index == parent.length - 1 ? c = c : c += '|';        

    });

    output = '\\begin{array}{' + c + '}' + output + '\\end{array}';
    return output;
    
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

// brengt geneste multifunctions Plus en Times samen in 1 niveau.
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
                    console.log('flattened');
                    console.log(parent.args.length);


                }
            };
        };
    });

    return neweq;
};

// brengt geneste multifunctions add en times samen in 1 niveau.
// Niet destructief!
function flattenOp(eq) {

    neweq = eq.cloneDeep();
    neweq.traverse(function (node, index, parent) {
        if (parent != null) {
 //           console.log(node);
            if (node.type == 'OperatorNode') {
                if (multiFunction[parent.fn] == 1 & node.fn == parent.fn) {
                    

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
                    console.log('flattenedOp');
                    console.log(parent.args.length);


                }
            };
        };
    });

    return neweq;
};

// least factor functie van internet. Werkt voor integers tot 2^53
// find the least factor in n by trial division
function leastFactor(n) {
    if (isNaN(n) || !isFinite(n)) return NaN;  
    if (n==0) return 0;  
    if (n%1 || n*n<2) return 1;
    if (n%2==0) return 2;  
    if (n%3==0) return 3;  
    if (n%5==0) return 5;  
    var m = Math.sqrt(n);
    for (var i=7;i<=m;i+=30) {
     if (n%i==0)      return i;
     if (n%(i+4)==0)  return i+4;
     if (n%(i+6)==0)  return i+6;
     if (n%(i+10)==0) return i+10;
     if (n%(i+12)==0) return i+12;
     if (n%(i+16)==0) return i+16;
     if (n%(i+22)==0) return i+22;
     if (n%(i+24)==0) return i+24;
    }
    return n;
   }

// gebruikt leastFactor om een string terug te geven met alle priemfactoren
function factor(n) {
    if (isNaN(n) || !isFinite(n) || n%1!=0 || n==0) return ''+n;
    if (n<0) return '-'+factor(-n);
    var minFactor = leastFactor(n);
    if (n==minFactor) return ''+n;
    return minFactor+'*'+factor(n/minFactor);
   }

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

        // update de globale variabele equation
 //       equation = flatten(eq);

        equation = eq;
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
};

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

// laat meerdere selecties toe!!!
function applyPlus() {

    prevEquation = equation.cloneDeep();

    secondTerm = math.parse('Select(b)');

    selectAdresses = adresses('Select', equation);
    selectAdresses.forEach(function setnodes(item, index) {
        selectNode = readAtAdress(item, equation);
        substitution = new math.expression.node.FunctionNode('Plus', [selectNode.args[0], secondTerm]);
        equation = injectAtAdress(substitution, item, equation);
    });

    equation = flatten(equation);
    updateLatex(equation);
}

/* function applyAdd() {

    prevEquation = equation.cloneDeep();
    selectAdress = adresses('Select', equation)[0];
    selectNode = readAtAdress(selectAdress, equation);
    secondTerm = math.parse('Select(b)');
    substitution = new math.expression.node.OperatorNode('+', 'add', [selectNode.args[0], secondTerm]);
    equation = substituteSelected(substitution, equation);
    equation = flattenOp(equation);
    updateLatex(equation);
} */

function replaceWithPlus() {
    //    expr.value = 'Plus(3, Times(3, Select(4), 5), 7)';

    prevEquation = equation.cloneDeep();
    substitution = 'Plus(Select(a),b)';

    equation = substituteSelected(substitution, equation);
    
    updateLatex(equation);
}

function applyTimes() {

    prevEquation = equation.cloneDeep();

    secondFactor = math.parse('Select(b)');

    selectAdresses = adresses('Select', equation);
    selectAdresses.forEach(function setnodes(item, index) {
        selectNode = readAtAdress(item, equation);
        substitution = new math.expression.node.FunctionNode('Times', [selectNode.args[0], secondFactor]);
        equation = injectAtAdress(substitution, item, equation);
    });

    equation = flatten(equation);
    updateLatex(equation);
    
}

/* function applyMultiply() {

    prevEquation = equation.cloneDeep();
    selectAdress = adresses('Select', equation)[0];
    selectNode = readAtAdress(selectAdress, equation);
    secondTerm = math.parse('Select(b)');
    substitution = new math.expression.node.OperatorNode('*', 'multiply', [selectNode.args[0], secondTerm]);
    equation = substituteSelected(substitution, equation);
    equation = flattenOp(equation);
    updateLatex(equation);
} */

function replaceWithTimes() {

    prevEquation = equation.cloneDeep();
    substitution = 'Times(Select(a),b)';
    equation = substituteSelected(substitution, equation);
    updateLatex(equation);
}

function applyPower() {

    prevEquation = equation.cloneDeep();
    exponent = math.parse('Select(b)');

    selectAdresses = adresses('Select', equation);
    selectAdresses.forEach(function setnodes(item, index) {
        selectNode = readAtAdress(item, equation);
        substitution = new math.expression.node.FunctionNode('pow', [selectNode.args[0], exponent]);
        equation = injectAtAdress(substitution, item, equation);
    });

    updateLatex(equation);
}

function replaceWithPower() {

    prevEquation = equation.cloneDeep();
    base = math.parse('Select(a)');
    exponent = math.parse('b');
    substitution = new math.expression.node.FunctionNode('pow', [base, exponent]);
    equation = substituteSelected(substitution, equation);
    updateLatex(equation);

}

// function applyMinusOp() {

//     prevEquation = equation.cloneDeep();
//     selectAdress = adresses('Select', equation)[0];
//     selectNode = readAtAdress(selectAdress, equation);
//     substractor = math.parse('Select(-b)');
//     substitution = new math.expression.node.OperatorNode('+','add', [selectNode.args[0], substractor]);
//     equation = substituteSelected(substitution, equation);
//     equation = flattenOp(equation);
//     updateLatex(equation);
// }

function applyMinus() {

    prevEquation = equation.cloneDeep();
    // selectAdress = adresses('Select', equation)[0];
    // selectNode = readAtAdress(selectAdress, equation);
    substractor = new math.expression.node.FunctionNode('unaryMinus', [math.parse('Select(c)')]);

    selectAdresses = adresses('Select', equation);
    selectAdresses.forEach(function setnodes(item, index) {
        selectNode = readAtAdress(item, equation);
        substitution = new math.expression.node.FunctionNode('Plus', [selectNode.args[0], substractor]);
        equation = injectAtAdress(substitution, item, equation);
    });
    
    equation = flatten(equation);
    updateLatex(equation);
}

function replaceWithMinus() {

    prevEquation = equation.cloneDeep();
    substitution = '(Select(a)-b)';
    equation = substituteSelected(substitution, equation);
    updateLatex(equation);
}


function applyDivide() {

    prevEquation = equation.cloneDeep();

    divisor = math.parse('Select(b)');

    selectAdresses = adresses('Select', equation);
    selectAdresses.forEach(function setnodes(item, index) {
        selectNode = readAtAdress(item, equation);
        substitution = new math.expression.node.OperatorNode('/', 'divide', [selectNode.args[0], divisor]);
        equation = injectAtAdress(substitution, item, equation);
    });

    updateLatex(equation);
}

function replaceWithDivide() {

    prevEquation = equation.cloneDeep();
    substitution = 'Select(a) / b';
    equation = substituteSelected(substitution, equation);
    updateLatex(equation);
}

function applyNthroot() {

    prevEquation = equation.cloneDeep();

    rootnumber = math.parse('Select(b)');

    selectAdresses = adresses('Select', equation);

    // als alle selecties een gelijkheid zijn -> NthRoot aan beide kanten

    function vergelijkingIsGeselecteerd (selectAdres) {
        return readAtAdress(selectAdres,equation).args[0].op == '==';
    };

    if (selectAdresses.every(vergelijkingIsGeselecteerd)) {
        console.log('vergelijkingen geselecteerd!!');
        
        selectAdresses.forEach(function setnodes(item, index) {
            selectNode = readAtAdress(item, equation);
            links = new math.expression.node.FunctionNode('nthRoot', [selectNode.args[0].args[0], rootnumber])
            rechts = new math.expression.node.FunctionNode('nthRoot', [selectNode.args[0].args[1], rootnumber]);
            substitution = new math.expression.node.OperatorNode('==','equal', [links, rechts])
            equation = injectAtAdress(substitution, item, equation);
        });
        
    } else {


     // anders Nthroot van de expressie
     console.log('gewoon subexps wortelen');
            
    selectAdresses.forEach(function setnodes(item, index) {
        selectNode = readAtAdress(item, equation);
        substitution = new math.expression.node.FunctionNode('nthRoot', [selectNode.args[0], rootnumber]);
        equation = injectAtAdress(substitution, item, equation);
    });

    };



    updateLatex(equation);
}

function replaceWithNthroot() {

    prevEquation = equation.cloneDeep();
    substitution = 'nthRoot(Select(a),b)';
    equation = substituteSelected(substitution, equation);
    updateLatex(equation);
}

function applyEquality() {

    prevEquation = equation.cloneDeep();
    selectAdress = adresses('Select', equation)[0];
    selectNode = readAtAdress(selectAdress, equation);
    if (selectNode.args[0].name == 'And' || selectNode.args[0].fn == 'equal') {

        tweedeVgl = math.parse('Select(a)==b');
        substitution = new math.expression.node.FunctionNode('And', [selectNode.args[0], tweedeVgl]);
        equation = substituteSelected(substitution, equation);
        updateLatex(flatten(equation));
    } 

    /* if (selectNode.args[0].fn == 'equal') {

        tweedeVgl = math.parse('Select(a)==b');
        substitution = new math.expression.node.OperatorNode('==','equal', [selectNode.args[0], tweedeVgl]);
        equation = substituteSelected(substitution, equation);
        updateLatex(flatten(equation));
    } */
    
}

function replaceWithEquality() {

    prevEquation = equation.cloneDeep();
    equation = math.parse('y==Select(x)');
    updateLatex(equation);
}

// factorObj is nu een array met gaten is niet de bedoeling. Wordt nu nog niet gebruikt voor priemontbinding te creeeren met machten
// MOET MET Times werken ipv met math parse!!! Momenteeel probleeem met factornodes werkt niet!!!
function spaceBar(eq) {
    prevEquation = equation.cloneDeep();
    // selectAdress = adresses('Select', eq)[0];
    // selectNode = readAtAdress(selectAdress, eq);

    selectAdresses = adresses('Select', equation);
    selectAdresses.forEach(function setnodes(item, index) {
        selectNode = readAtAdress(item, equation);

        if (Number.isInteger(parseFloat(selectNode.args[0].value))) {
            number = selectNode.args[0].value;
    
            factorTimesArray = factor(number).split('*');
            // factorObj = [];
            // for (i=0; i < factorTimesArray.length; i++) {
            //     fact = factorTimesArray[i];
            //     factorObj[fact] == undefined ? factorObj[fact] = 1: factorObj[fact] += 1;
            // };
            // console.log(factorObj);

            // function quickparseObj(exponent,index) {
            //     exponent == 1 ? fctr =  math.parse(index) : fctr = new math.expression.node.FunctionNode('pow', [math.parse(index), math.parse(exponent)])
            //     return fctr;
            // };
            // newfactorNodes = factorObj.map(quickparseObj);

            newFactorNodes = [];
            for (i=0 ; i< factorTimesArray.length ; i++) {
                factorTimesArray[i].pop() = currentFactor;
                if (currentFactor == oldFactor) {
                    // exponent maken
                    
                } else {
                    // gewoon getal maken
                    newFactorNodes[k]= new math.expression.node.ConstantNode(currentFactor);
                }
            };

            function quickparse(num) {return math.parse(num)};

            factorNodes = factorTimesArray.map(quickparse);
            // priemOntbinding = math.parse(factor(number));
            priemOntbinding = new math.expression.node.FunctionNode('Times', factorNodes);
            equation = injectAtAdress(selectIt(priemOntbinding), item, equation);
            // equation = substituteSelected(selectIt(priemOntbinding),eq);
            // updateLatex(equation);
    
        } else if (Number.isInteger(math.eval(selectNode.args[0].toString()))) {
            uitkomstString = math.eval(selectNode.args[0].toString());
            console.log(uitkomstString);
            uitkomstNode = selectIt(math.parse(uitkomstString));
                    equation = injectAtAdress(uitkomstNode, item, equation);
            // equation = substituteSelected('Select('+uitkomstString+')',eq);
            // updateLatex(equation);
         };

    });
    updateLatex(equation);

}

function enter(eq) {
    prevEquation = equation.cloneDeep();

    selectAdresses = adresses('Select', equation);
    selectAdresses.forEach(function setnodes(item, index) {
        selectNode = readAtAdress(item, equation);

        if (Number.isInteger(math.eval(selectNode.args[0].toString()))) {
            uitkomstString = math.eval(selectNode.args[0].toString());

            substitution = math.parse('Select('+uitkomstString+')');
            equation = injectAtAdress(substitution, item, equation);


         };


    });

    updateLatex(equation);
    

}

function backSpace() {
    console.log('equation: ')
    console.log(equation);
    console.log('prevequation: ');
    console.log(prevEquation);
    equation = prevEquation;
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

    updateLatex(flatten(equation));

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

    // updateLatex(equation);
    updateLatex(flatten(equation));
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

function replaceWithDigit(digit,eq) {
    prevEquation = equation.cloneDeep();
    substituteSelected(selectIt(digit), eq);
    updateLatex(eq);
}

function inputDigit (digit,eq) {
    prevEquation = equation.cloneDeep();
    selectAdress = adresses('Select',eq)[0];
    selectNode = readAtAdress(selectAdress,eq);
// arg is de node die geselecteerd is 
    arg = selectNode.args[0];
    if (arg.isConstantNode) {
        oudGetal = arg.value;
        
        
        if (isNaN(oudGetal)) { } else {
            nieuwGetal = oudGetal*10 + digit;
            nieuwGetalNode = new math.expression.node.ConstantNode(nieuwGetal);
            substituteSelected(selectIt(nieuwGetalNode), eq);
            updateLatex(eq);
            };
        } else {
            substituteSelected(selectIt(''+ digit), eq);
            updateLatex(eq);
    };    
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

                // MSS ZIJN DE VOLGENDE TWEE LIJNEN OVERBODIG?
                eq = flatten(eq);
                updateLatex(eq);

                return eq;
            };
        } else {
            return eq;
        };
    };
};

/* 
function rightSlurpOp(eq) {

    // zoek uit of de parent een multifunction is
    selectAdress = adresses('Select', eq)[0];
    parentAdress = returnWithoutLast(selectAdress);
    parentNode = readAtAdress(parentAdress, eq);
    if (parentNode.type == 'OperatorNode') {
        if (multiFunction[parentNode.fn] == 1) {


            selectNode = readAtAdress(selectAdress, eq);

            
            huidigNummer = Number(/\d+/.exec(selectAdress[selectAdress.length - 1])[0]);
            if (huidigNummer < parentNode.args.length - 1) {

                first = selectNode.args[0];
                secondAdress = selectAdress;

                secondAdress[secondAdress.length - 1] = 'args[' + (huidigNummer + 1) + ']';
                second = readAtAdress(secondAdress, eq);


                newSelection = new math.expression.node.OperatorNode(parentNode.op, parentNode.fn, [first, second]);
                newSelection = selectIt(flattenOp(newSelection));

                newParent = parentNode;
                newParent.args.splice(huidigNummer, 2, newSelection)
                eq = injectAtAdress(newParent, parentAdress, eq);

                //updateLatex(equation);

                return eq;
            };
        } else {
            return eq;
        };
    };
}; */

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

                // MSS ZIJN DE VOLGENDE TWEE LIJNEN OVERBODIG?
                eq = flatten(eq);
                updateLatex(eq);

                return eq;
            };
        } else {
            return eq;
        };
    };
};
/* 
function leftSlurpOp(eq) {

    // zoek uit of de parent een multifunction is
    selectAdress = adresses('Select', eq)[0];
    parentAdress = returnWithoutLast(selectAdress);
    parentNode = readAtAdress(parentAdress, eq);
    if (parentNode.type == 'OperatorNode') {
        if (multiFunction[parentNode.fn] == 1) {


            selectNode = readAtAdress(selectAdress, eq);

            first = selectNode.args[0];
            secondAdress = selectAdress;
            huidigNummer = Number(/\d+/.exec(selectAdress[selectAdress.length - 1])[0]);
            if (huidigNummer > 0) {

                secondAdress[secondAdress.length - 1] = 'args[' + (huidigNummer - 1) + ']';
                second = readAtAdress(secondAdress, eq);

// de tweede wordt hier eerst gezet
                newSelection = new math.expression.node.OperatorNode(parentNode.op, parentNode.fn, [second, first]);
                newSelection = selectIt(flattenOp(newSelection));

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
}; */

/****************************** */
// Alt - acties
/****************************** */

// deze code is bijna exact hetzelfde als rightSlurp
commuteSelectedWithNext = function (eq) {
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
 
 // in dd volgende twee lijnen is het enige verschil met de rightSlurp: 
                 newSelection = new math.expression.node.FunctionNode(parentNode.name, [second, selectNode]);

                 newSelection = flatten(newSelection);
                 
                 //console.log(newSelection);
 
                 newParent = parentNode;
                 newParent.args.splice(huidigNummer, 2, newSelection)
                 eq = injectAtAdress(newParent, parentAdress, eq);

                 eq = flatten(eq);
                 updateLatex(eq);
                
 
                 return eq;
             };
         } else {
             return eq;
         };
     };
 };

 // deze code is bijna exact hetzelfde als slurpLeft
 function commuteSelectedWithPrevious(eq) {

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
                newSelection = new math.expression.node.FunctionNode(parentNode.name, [selectNode, second]);
                newSelection = flatten(newSelection);

                console.log('newselect: ' + newSelection.toString());

                newParent = parentNode;
                newParent.args.splice(huidigNummer-1, 2, newSelection);
                eq = injectAtAdress(newParent, parentAdress, eq);

                eq = flatten(eq);
                updateLatex(eq);

                return eq;
            };
        } else {
            return eq;
        };
    };
};

//***************************** */
// CTRL - functies (rekenregels)
//***************************** */

function distributeSelected(eq) {
    selectAdress = adresses('Select', eq)[0];
    selectNode = readAtAdress(selectAdress, eq);
    selectedNode = selectNode.args[0];

    if (selectedNode.name == 'Times' & selectedNode.args[1].name == 'Plus') {
        nieuw = selectedNode.args[1].map(function (node, index, parent) {return new math.expression.node.FunctionNode('Times', [selectedNode.args[0], node ])});
    };
    eq = injectAtAdress(selectIt(nieuw), selectAdress, eq);
    return eq;
};

function factorSelected(eq) {
    selectAdress = adresses('Select', eq)[0];
    selectNode = readAtAdress(selectAdress, eq);
    selectedNode = selectNode.args[0];

    var sameFactor = true

    if (selectedNode.name == 'Plus') {
        commonFactor = selectedNode.args[0].args[0];
        selectedNode.args.forEach(function (node, index, parent) {
            node.args[0].equals(commonFactor) ? sameFactor = sameFactor : sameFactor = false;
        });
        nieuweSom = selectedNode.map(function (node, index, parent) {return node.args[1]});
        nieuw = new math.expression.node.FunctionNode('Times', [commonFactor, nieuweSom]);
    };
    eq = injectAtAdress(selectIt(nieuw), selectAdress, eq);
    return eq;
};

//***************************** */
// Grafiek functies
//***************************** */

function drawGraph(eq) {
    if (eq != undefined) {
        //              console.log(eq.toString())
        leftSideCode = eq.args[0].compile();
        rightSideCode = eq.args[1].compile();

        var imageArray = [];

        startX = -100;
        endX = 100;
        startY = -100;
        endY = 100;
        rangeX = endX - startX;
        rangeY = endY - startY;



    for (i = 0; i < canvasWidth; i = i + 1) {
        for (j = 0; j < canvasHeight; j = j + 1) {
          
              scope = {
                  x: startX + (rangeX/canvasWidth)*i,
                  y: startY + (rangeY/canvasHeight)*j
              };
              squaredDifference = math.pow(leftSideCode.eval(scope) - rightSideCode.eval(scope),2);
              imageArray.push({pixelX: i, pixelY: canvasHeight-j, result: squaredDifference});
              
            }
         };
    
    
    minResult = arrayResultRange(imageArray).min;
    resultRange = arrayResultRange(imageArray).max - minResult;
    console.log(minResult);
    console.log(resultRange);

    imageArray.forEach( function (point) {
       // fullSmooth = 255-Math.floor(255*(point.result-minResult)/resultRange);
       // logDiff = math.log(point.result);
       // squareDiff = 255 - point.result;
        drawPixel(point.pixelX, point.pixelY, 0, 0, 0, squareDiff(point.result));
    });

             
    updateCanvas()
              
            }
        };

        // komt van internet zou sneller moeten zijn dan alternatieven
        function arrayResultRange(arr) {
            var len = arr.length, max = -Infinity, min = Infinity;
            while (len--) {
              if (arr[len].result > max) {
                max = arr[len].result;
              }
              if (arr[len].result < min) {
                min = arr[len].result;
              }
            }
            return {max: max, min: min};
          };

        // diff Functies voor de grafieken, verwachten dat minResult, resultRange gegeven zijn. Input is een squaredDifference
          function fullSmooth(sqdiff) {
              return 255-Math.floor(255*(sqdiff-minResult)/resultRange)
          }
          function squareDiff(sqdiff) {
              return 255 - sqdiff;
          }
          function logDiff(sqdiff) {
              return math.log(sqdiff)
          }