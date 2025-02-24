regels = {

    //TODO schrijf functies die nu allemaal de unaryMinus doen!

    negatiefismaalmineen: {
        naam: 'negatief getal als -1 keer schrijven',
        input: {
            expr: math.parse('unaryMinus(a)'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('Times(unaryMinus(1),a)'),
            unknowns: ['a']
        },

    },

    maalmineenisnegatief: {
        naam: '-1 als een min schrijven',
        input: {
            expr: math.parse('Times(unaryMinus(1),a)'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('unaryMinus(a)'),
            unknowns: ['a']
        },

    },

    introlog: {
        naam: 'ontschrap aalog = schrijf x als log',
        input: {
            expr: math.parse('x'),
            unknowns: ['x']
        },
        output: {
            expr: math.parse('log(pow(a,x),a)'),
            unknowns: ['a', 'x']
        },
    }, 

    intrologrekenmachine: {
        naam: 'ontschrap logaa = schrijf product van 2 logs',
        input: {
            expr: math.parse('Plus(a,unaryMinus(a))'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('0'),
            unknowns: []
        },
    }, 
    introExp: {
        naam: 'ontschrapaalog = schrijf x als een macht',
        input: {
            expr: math.parse('x'),
            unknowns: ['x']
        },
        output: {
            expr: math.parse('pow(a,log(x,a))'),
            unknowns: ['x','a']
        },
    }, 
    introExp1: {
        naam: 'eerste macht doet niks',
        input: {
            expr: math.parse('a'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('pow(a,1)'),
            unknowns: ['a']
        }
    },
    introWortel: {
        naam: 'schrijf als een wortel',
        input: {
            expr: math.parse('a'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('nthRoot(pow(a,n),n)'),
            unknowns: ['a']
        }
    },
    introMaal: {
        naam: 'factor 1 doet niks',
        input: {
            expr: math.parse('a'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('Times(1,a)'),
            unknowns: ['a']
        }
    },
    introDeling: {
        naam: 'noemer 1 doet niks',
        input: {
            expr: math.parse('a'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('divide(a,1)'),
            unknowns: ['a']
        }
    },
    introPlus: {
        naam: 'term 0 doet niks',
        input: {
            expr: math.parse('a'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('Plus(a,0)'),
            unknowns: ['a']
        }
    },
    introMin: {
        naam: 'term 0 doet niks',
        input: {
            expr: math.parse('a'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('Plus(a,unaryMinus(0))'),
            unknowns: ['a']
        }
    },
    schraplogaa: {
        naam: 'schraplogaa',
        input: {
            expr: math.parse('Times(log(a,b),log(x,a))'),
            unknowns: ['a','b','x']
        },
        output: {
            expr: math.parse('log(x,b)'),
            unknowns: ['b','x']
        },
    },
    schrapaalog: {
        naam: 'schrapaalog',
        input: {
            expr: math.parse('pow(a,log(x,a))'),
            unknowns: ['a','x']
        },
        output: {
            expr: math.parse('x'),
            unknowns: ['x']
        },
    }, 
    schrapaloga: {
        naam: 'schrapaloga',
        input: {
            expr: math.parse('log(pow(a,x),a)'),
            unknowns: ['a','x']
        },
        output: {
            expr: math.parse('x'),
            unknowns: ['x']
        },
    }, 
    schrapExp1: {
        naam: 'eerste macht doet niks',
        input: {
            expr: math.parse('pow(a,1)'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('a'),
            unknowns: ['a']
        }
    },
    schrapExp0: {
        naam: 'nulde macht is 1',
        input: {
            expr: math.parse('pow(a,0)'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('1'),
            unknowns: []
        }
    },

    logBuitenMaalHalen: {
        naam: 'direct voor prod en voor deling?',
        input: {
            expr: math.parse('Plus(a,unaryMinus(a))'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('0'),
            unknowns: []
        },
    }, 
    logBuitenExpHalen: {
        naam: 'direct voor prod en voor deling?',
        input: {
            expr: math.parse('Plus(a,unaryMinus(a))'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('0'),
            unknowns: []
        },
    }, 
    
    elimPlus: {
        naam: 'som met nul versimpelen',
        input: {
            expr: math.parse('Plus(a,0)'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('a'),
            unknowns: ['a']
        },
    }, 

    schrapMin: {
        naam: 'a min a',
        input: {
            expr: math.parse('Plus(a,unaryMinus(a))'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('0'),
            unknowns: []
        },
    },

    nulNeutraalVoorPlus: {
        naam: 'nul neutraal voor plus',
        input: 'Plus(a,0)',
        output: 'a',
        functie: function(expr) {
            console.log('nnp aangeroepen met:', expr);
            console.log('nnp expr type:', expr.type);
            console.log('nnp expr fn:', expr.fn);
            if (expr.fn && expr.fn.name) console.log('nnp expr fn name:', expr.fn.name);
            if (expr.name) console.log('nnp expr name:', expr.name);
            if (expr.args) console.log('nnp expr args:', expr.args);
            
            // Als het een Select is, kijk naar het argument
            if (expr.name === 'Select') {
                console.log('nnp Select gevonden, checking args[0]');
                expr = expr.args[0];
                console.log('nnp Binnen Select:', expr);
                console.log('nnp Binnen Select type:', expr.type);
                console.log('nnp Binnen Select fn:', expr.fn);
                if (expr.fn && expr.fn.name) console.log('nnp Binnen Select fn name:', expr.fn.name);
            }
            
            if (expr.type === 'FunctionNode' && expr.fn.name === 'Plus') {
                console.log('nnp Plus gevonden met args:', expr.args);
                let nietNulArgs = expr.args.filter(arg => {
                    console.log('nnp checking arg:', arg);
                    return !(arg.type == 'ConstantNode' && arg.value == 0);
                });
                
                if (nietNulArgs.length == 0) {
                    return new math.expression.node.ConstantNode(0);
                }
                
                if (nietNulArgs.length == 1) {
                    return nietNulArgs[0];
                }
                
                return makeMulti('Plus', nietNulArgs);
            }
        }
    },
    eenNeutraalVoorMaal: {
        naam: '1 neutraal element voor *',
        input: {
            expr: math.parse('a/1'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('a'),
            unknowns: ['a']
        },
        functie: function(expr) {
            if (expr.name == 'Times') {
                if (expr.args.some(s => s.value == 1)) {
                    console.log('bevat product met 1');
                    newfactors = [];
                    expr.args.forEach(factor => {if (factor.value != 1) {console.log('notone =' + factor.toString()); newfactors.push(factor)}});
                    newexp = makeMulti('Times', newfactors);
                    console.log('newexp =' + newexp.toString());
                    return newexp;
                }
            }
        
        }

    },
    schrapUnitaireBreuk: {
        naam: 'schrap unitaire breuk',
        input: {
            expr: math.parse('a/a'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('1'),
            unknowns: []
        }
    },
    omgekeerdeIsInverseVoorMaal1: {
        naam: 'omgekeerde is inverse voor maal',
        input: {
            expr: math.parse('Times(a,1/a)'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('1'),
            unknowns: []
        }
    },
    omgekeerdeIsInverseVoorMaal2: {
        naam: 'omgekeerde is inverse voor maal',
        input: {
            expr: math.parse('Times(1/a,a)'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('1'),
            unknowns: []
        }
    },
    maalbreukOntsplitsen: {
        naam: 'breuken vermenigvuldigen',
        input: {
            expr: math.parse('Times(a/b,c/d)'),
            unknowns: ['a', 'b', 'c', 'd']
        },
        output: {
            expr: math.parse('Times(a,c)/Times(b,d)'),
            unknowns: ['a', 'b', 'c', 'd']
        },
        functie: function(expr) {
            if (expr.name == 'Times') {
                if (expr.args.every(s => s.fn == 'divide')) {
                    console.log('bevat enkel breuken');
                    tellerArgs = [];
                    noemerArgs = [];
                    expr.args.forEach(breuk => {
                        tellerArgs.push(breuk.args[0]);
                        noemerArgs.push(breuk.args[1]);
                    } );
                    teller = makeMulti('Times', tellerArgs);
                    noemer = makeMulti('Times', noemerArgs);
                    newexp = new math.expression.node.OperatorNode("/", "divide", [teller, noemer]);
                    console.log('newexp =' + newexp.toString());
                    return newexp;
                }
            }
        
        }

        
    },

    plusbreukOntsplitsen: {
        naam: 'breuken optellen',
        input: {
            expr: math.parse('Plus(a/b,c/b)'),
            unknowns: ['a', 'b', 'c']
        },
        output: {
            expr: math.parse('Plus(a,c)/b'),
            unknowns: ['a', 'b', 'c']
        },
        functie: function(expr) {
            if (expr.name == 'Plus') {
                console.log("dit is een som");
                if (expr.args.every(s => s.fn == 'divide' && s.args[1].equals(expr.args[0].args[1]))) {
                    console.log('de som bevat enkel breuken met dezelfde noemer');
                    tellerArgs = [];
                    expr.args.forEach(breuk => {
                        tellerArgs.push(breuk.args[0]);
                    });
                    teller = makeMulti('Plus', tellerArgs);
                    newexp = new math.expression.node.OperatorNode("/", "divide", [teller, expr.args[0].args[1] ]);
                    console.log('newexp =' + newexp.toString());
                    return newexp;
                }
            }
        }
    },

    plusbreukSplitsen: {
        naam: 'breuk in factoren uit elkaar trekken (uitdelen)',
        input: {
            expr: math.parse('Plus(a,b)/c'),
            unknowns: ['a', 'b', 'c']
        },
        output: {
            expr: math.parse('Plus(a/c,b/c)'),
            unknowns: ['a', 'b', 'c']
        },
        functie: function(expr) {
            if (expr.fn == 'divide') {
                if (expr.args[0].name == 'Plus') {
                    console.log('breuk bestaat uit som');
                    teller = expr.args[0];
                    noemer = expr.args[1];
    //                eersteBreuk = new math.expression.node.OperatorNode("/", "divide", [teller.args[0], noemer]);
    //                restTeller = makeMulti('Plus', teller.args.slice(1,));
    //                restBreuk = new math.expression.node.OperatorNode("/", "divide", [restTeller, noemer]);
                    nieuweBreuken = teller.args.map(term => new math.expression.node.OperatorNode("/", "divide", [term, noemer]));
                    newexp = makeMulti('Plus', nieuweBreuken);
      //              newexp = new math.expression.node.OperatorNode("Plus", "add", [eersteBreuk, restBreuk]);
                    console.log('newexp =' + newexp.toString());
                    return newexp;
                }
            }
        }
    },

    maalbreukSplitsen: {
        naam: 'breuk in factoren uit elkaar trekken (eerste breuk eraf trekken)',
        input: {
            expr: math.parse('Times(a,c)/Times(b,d)'),
            unknowns: ['a', 'b', 'c', 'd']
        },
        output: {
            expr: math.parse('Times(a/b,c/d)'),
            unknowns: ['a', 'b', 'c', 'd']
        },
        functie: function(expr) {
            if (expr.fn == 'divide') {
                if (expr.args.every(s => s.name == 'Times')) {
                    console.log('breuk bestaat uit producten');
                    teller = expr.args[0];
                    noemer = expr.args[1];
                    eersteBreuk = new math.expression.node.OperatorNode("/", "divide", [teller.args[0], noemer.args[0]]);
                    tweedeTeller = makeMulti('Times',teller.args.slice(1,));
                    tweedeNoemer = makeMulti('Times',noemer.args.slice(1));
                    tweedeBreuk = new math.expression.node.OperatorNode("/", "divide", [tweedeTeller, tweedeNoemer]);

                    newexp = makeMulti('Times', [eersteBreuk,tweedeBreuk]);
                    console.log('newexp =' + newexp.toString());
                    return newexp;
                }
            }
        
        }
    },
    eenheidsbreukAlsMinEenExponent: {
        naam: 'eenheidsbreuk als negatieve exponent',
        input: {
            expr: math.parse('1/a'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('pow(a,unaryMinus(1))'),
            unknowns: ['a']
        }
    },
    minEenExponentAlsEenheidsbreuk: {
        naam: 'negatieve exponent als eenheidsbreuk',
        input: {
            expr: math.parse('pow(a,unaryMinus(1))'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('1/a'),
            unknowns: ['a']
        }
    },

    eenheidsbreukAlsNegatieveExponent: {
        naam: 'eenheidsbreuk als negatieve exponent',
        input: {
            expr: math.parse('1/pow(a,n)'),
            unknowns: ['a','n']
        },
        output: {
            expr: math.parse('pow(a,unaryMinus(n))'),
            unknowns: ['a','n']
        }
    },

    negatieveExponentAlsEenheidsbreuk: {
        naam: 'negatieve exponent als eenheidsbreuk',
        input: {
            expr: math.parse('pow(a,unaryMinus(n))'),
            unknowns: ['a','n']
        },
        output: {
            expr: math.parse('1/pow(a,n)'),
            unknowns: ['a','n']
        }
    },

    vermenigvuldigingMetEenheidsbreuk: {
        naam: 'vermenigvuldiging met eenheidsbreuk geeft breuk (dyadisch)',
        input: {
            expr: math.parse('Times(a,1/b)'),
            unknowns: ['a', 'b']
        },
        output: {
            expr: math.parse('a/b'),
            unknowns: ['a', 'b']
        },
        functie: function(expr) {
            if (expr.name == 'Times') {
                if (expr.args.some(s => s.fn == 'divide' && s.args[0]==1)) {
                    console.log('product bevat eenheidsbreuk');
                    if (expr.args.length == 2) {
                        expr.args.forEach(factor => factor.fn == 'divide' ? eenheidsBreuk = factor : andereFactor = factor);

                    }

                    newexp = new math.expression.node.OperatorNode("/", "divide", [andereFactor, eenheidsBreuk.args[1]]);
                    console.log('newexp =' + newexp.toString());
                    return newexp;
                }
            }
        
        }
    },
    vermenigvuldigingGetalMetEenheidsbreuk: {
        naam: 'vermenigvuldiging getal met eenheidsbreuk geeft breuk',
        input: {
            expr: math.parse('Times(a/b,c)'),
            unknowns: ['a', 'b', 'c']
        },
        output: {
            expr: math.parse('Times(a,c)/b'),
            unknowns: ['a', 'b','c']
        },
        //  TODO oorspronkelijke volgorde van breuk en andere factor respecteren in output
        functie: function(expr) {
            if (expr.name == 'Times') {
                if (expr.args.some(s => s.fn == 'divide')) {
                    console.log('product bevat breuk');
                    if (expr.args.length == 2) {
                        expr.args.forEach(factor => factor.fn == 'divide' ? breuk = factor : andereFactor = factor);
                        console.log('breuk = ' + breuk.toString());
                        console.log('andere factor = ' + andereFactor.toString());
                        if (andereFactor.type != 'OperatorNode' && andereFactor.fn != 'divide') {
                            console.log('andere Factor is geen operatornode');
                            nieuweTeller = makeMulti('Times', [breuk.args[0] , andereFactor]);
                            newexp = new math.expression.node.OperatorNode("/", "divide", [nieuweTeller, breuk.args[1]]);
                            console.log('newexp =' + newexp.toString());
                            return newexp;
                        }
                    }

            
                }
            }
        
        }
    },
    simpeleBreukUitElkaarTrekken: {
        naam: 'breuk als getal maal eenheidsbreuk',
        input: {
            expr: math.parse('a/b'),
            unknowns: ['a', 'b']
        },
        output: {
            expr: math.parse('Times(a,1/b)'),
            unknowns: ['a', 'b']
        }
    },
    // vermenigvuldigingMetEenLinks: {
    //     naam: '1 is neutraal voor vermenigvuldiging',
    //     input: {
    //         expr: math.parse('Times(1,a)'),
    //         unknowns: ['a']
    //     },
    //     output: {
    //         expr: math.parse('a'),
    //         unknowns: ['a']
    //     }
    // },
    // vermenigvuldigingMetEenRechts: {
    //     naam: '1 is neutraal voor vermenigvuldiging',
    //     input: {
    //         expr: math.parse('Times(a,1)'),
    //         unknowns: ['a']
    //     },
    //     output: {
    //         expr: math.parse('a'),
    //         unknowns: ['a']
    //     }
    // },
    vermenigvuldigingMetNul: {
        naam: '0 is opslorpend voor vermenigvuldiging',
        input: {
            expr: math.parse('Times(0, a)'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('a'),
            unknowns: ['a']
        },
        functie: function(expr) {
            if (expr.name == 'Times') {
                if (expr.args.some(s => s.value == 0)) {
                    console.log('bevat factor met 0');
                    newexp = new math.expression.node.ConstantNode(0);
                    return newexp;
                }
            }
        }
    },
    // vermenigvuldigingMetNulRechts: {
    //     naam: '0 is neutraal voor vermenigvuldiging',
    //     input: {
    //         expr: math.parse('Times(a,0)'),
    //         unknowns: ['a']
    //     },
    //     output: {
    //         expr: math.parse('a'),
    //         unknowns: ['a']
    //     }
    // },
    wortelInversAanMacht: {
        naam: 'wortel heft een macht op',
        input: {
            expr: math.parse('nthRoot(pow(a,b),b)'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('a'),
            unknowns: ['a']
        }
    },
    machtInversAanWortel: {
        naam: 'macht heft een wortel op',
        input: {
            expr: math.parse('pow(nthRoot(a,b),b)'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('a'),
            unknowns: ['a']
        }
    },
    exponentenOptellen: {
        naam: 'product van machten (= zelfde basis) telt exponenten op',
        input: {
            expr: math.parse('Times(pow(x,a),pow(x,b))'),
            unknowns: ['x','a','b']
        },
        output: {
            expr: math.parse('pow(x,Plus(a,b))'),
            unknowns: ['x','a','b']
        },
        functie: function(expr) {
            if (expr.name == 'Times') {
                baseArray = [];
                exponentArray = [];
                one = math.parse('1');
                expr.args.forEach(factor => {
                    if (factor.name == 'pow') {
                        baseArray.push(factor.args[0]);
                            exponentArray.push(factor.args[1]);
                    } else { 
                        baseArray.push(factor);
                        exponentArray.push(one);
                    }
                });
                base = baseArray[0];
                if (baseArray.every(s => s.equals(base))) {
                    console.log('good one');
                    // console.log(exponentArray);
                    zonderOnes = [];
                    i = 0;
                    exponentArray.forEach(exp => {if (exp.equals(one)) {i++} else {zonderOnes.push(exp)} });
                    // als het allemaal eentjes zijn tellen we ze ineens op (als enige exponent)
                    if (0 == zonderOnes.length) {
                        exponentArray = [math.parse(String(i))];
                    };
                    exponent = makeMulti('Plus', exponentArray);
                    return new math.expression.node.FunctionNode("pow", [base,exponent]);
                }
            }
            
        }
    },
    somVanExponentenNaarVermenigvuldiging: {
        naam: 'opgetelde exponenten schrijven als een vermenigvuldiging',
        input: {
            expr: math.parse('pow(x,Plus(a,b))'),
            unknowns: ['x','a','b']
        },
        output: {
            expr: math.parse('Times(pow(x,a),pow(x,b))'),
            unknowns: ['x','a','b']
        },
        functie: function(expr) {
            if (expr.name == 'pow' && expr.args[1].name == "Plus") {
                console.log('good one');
                base = expr.args[0];
                exponentArray = expr.args[1].args;
                machtArray = exponentArray.map(exponent => new math.expression.node.FunctionNode("pow", [base,exponent]) )
                return makeMulti('Times', machtArray);
            }
        }
    },
    machtTorenAfbreken: {
        naam: 'machttoren afbreken',
        input: 'pow(pow(a,b),c)',
        output: 'pow(a,Times(b,c))',
        functie: function(expr) {
            if (expr.name == 'pow' && expr.args[0].name == 'pow') {
                let basis = expr.args[0].args[0];
                let exponent1 = expr.args[0].args[1];
                let exponent2 = expr.args[1];
                
                // Maak een Times node voor de vermenigvuldiging van de exponenten
                let nieuweExponent = makeMulti('Times', [exponent1, exponent2]);
                
                return new math.expression.node.FunctionNode('pow', [basis, nieuweExponent]);
            }
        }
    },
    machtTorenOpbouwen: {
        naam: 'machttoren opbouwen',
        input: 'pow(a,Times(b,c))',
        output: 'pow(pow(a,b),c)',
        functie: function(expr) {
            if (expr.name == 'pow' && expr.args[1].fn == 'Times') {
                let basis = expr.args[0];
                let exponentFactors = expr.args[1].args;
                
                // Neem de eerste factor als eerste exponent
                let exponent1 = exponentFactors[0];
                
                // Maak een Times node van de overige factoren voor de tweede exponent
                let exponent2 = exponentFactors.length > 2 
                    ? makeMulti('Times', exponentFactors.slice(1))
                    : exponentFactors[1];
                
                let binnenMacht = new math.expression.node.FunctionNode('pow', [basis, exponent1]);
                return new math.expression.node.FunctionNode('pow', [binnenMacht, exponent2]);
            }
        }
    },
    machtNaarWortelNotatie: {
        naam: 'macht als wortel schrijven',
        input: {
            expr: math.parse('pow(x,p/q)'),
            unknowns: ['x','p','q']
        },
        output: {
            expr: math.parse('nthRoot(pow(x,p),q)'),
            unknowns: ['x','p','q']
        }
    },
    wortelNaarMachtNotatie1: {
        naam: 'wortel als macht schrijven',
        input: {
            expr: math.parse('nthRoot(pow(x,p),q)'),
            unknowns: ['x','p','q']
        },
        output: {
            expr: math.parse('pow(x,p/q)'),
            unknowns: ['x','p','q']
        }
    },
    wortelNaarMachtNotatie2: {
        naam: 'wortel als macht schrijven',
        input: {
            expr: math.parse('pow(nthRoot(x,q),p)'),
            unknowns: ['x','p','q']
        },
        output: {
            expr: math.parse('pow(x,p/q)'),
            unknowns: ['x','p','q']
        }
    },
    wortelNaarMachtNotatie3: {
        naam: 'wortel als macht schrijven',
        input: {
            expr: math.parse('nthRoot(x,q)'),
            unknowns: ['x','q']
        },
        output: {
            expr: math.parse('pow(x,1/q)'),
            unknowns: ['x','q']
        }
    },

    machtVanProduct: {
        naam: 'macht van een product',
        input: {
            expr: math.parse('pow(Times(x,y),n)'),
            unknowns: ['x','y','n']
        },
        output: {
            expr: math.parse('Times(pow(x,n),pow(y,n))'),
            unknowns: ['x','y','n']
        },
        functie: function(expr) {
            if (expr.name == 'pow' && expr.args[0].name == "Times") {
                console.log('good one');
                exponent = expr.args[1];
                baseArray = expr.args[0].args;
                machtArray = baseArray.map(base => new math.expression.node.FunctionNode("pow", [base,exponent]) )
                return makeMulti('Times', machtArray);
            }

        }
    },

    machtVanDeling: {
        naam: 'macht van een deling',
        input: {
            expr: math.parse('pow(a/b,n)'),
            unknowns: ['a','b','n']
        },
        output: {
            expr: math.parse('pow(a,n)/pow(b,n)'),
            unknowns: ['a','b','n']
        },
        functie: function(expr) {
            console.log('machtVanDeling functie aangeroepen');
            console.log('expr type:', expr.type);
            console.log('expr name:', expr.name);
            if (expr.name == 'pow') {
                console.log('is een macht');
                console.log('basis type:', expr.args[0].type);
                console.log('basis fn:', expr.args[0].fn);
                if (expr.args[0].fn == 'divide') {
                    console.log('macht van een deling gevonden');
                    let teller = expr.args[0].args[0];
                    let noemer = expr.args[0].args[1];
                    let exponent = expr.args[1];
                    
                    let tellerMacht = new math.expression.node.FunctionNode("pow", [teller, exponent]);
                    let noemerMacht = new math.expression.node.FunctionNode("pow", [noemer, exponent]);
                    
                    return new math.expression.node.OperatorNode("/", "divide", [tellerMacht, noemerMacht]);
                }
            }
        }
    },
        
    productMetGelijkeExponenten: {
        naam: 'product met gelijke exponenten',
        input: {
            expr: math.parse('Times(pow(x,n),pow(y,n))'),
            unknowns: ['x','y','n']
        },
        output: {
            expr: math.parse('pow(Times(x,y),n)'),
            unknowns: ['x','y','n']
        },
        
        functie: function(expr) {
            if (expr.name == 'Times') {
                
                if (expr.args.every(factor => factor.fn == 'pow')) {
                    console.log('good one');
                    baseArray = [];
                    exponent = expr.args[0].args[1];
                    expr.args.forEach( factor => {if (factor.args[1].equals(exponent)) {baseArray.push(factor.args[0])} });
                    console.log('aantal gelijke exp = ' + baseArray.length);
                    // powArray = baseArray.map( base => new math.expression.node.FunctionNode('pow', [base, exponent]));
                    if (baseArray.length === expr.args.length) {
                        product = makeMulti('Times', baseArray);
                        macht = new math.expression.node.FunctionNode('pow', [product, exponent]);
                        console.log('macht = ' + macht.toString());
                        return macht;
                    }
                }
            }
            
        }


    },
    // optellenMetNulLinksDoetNiks: {
    //     naam: 'optellen met nul langs links',
    //     input: {
    //         expr: math.parse('Plus(0,a)'),
    //         unknowns: ['a']
    //     },
    //     output: {
    //         expr: math.parse('a'),
    //         unknowns: ['a']
    //     }
    // },
    // optellenMetNulRechtsDoetNiks: {
    //     naam: 'optellen met nul langs rechts',
    //     input: {
    //         expr: math.parse('Plus(a,0)'),
    //         unknowns: ['a']
    //     },
    //     output: {
    //         expr: math.parse('a'),
    //         unknowns: ['a']
    //     }
    // },

    productVanGelijkeWortels: {
        naam: 'product van gelijke wortels',
        input: {
            expr: math.parse('Times(nthRoot(x,n),nthRoot(y,n))'),
            unknowns: ['x','y','n']
        },
        output: {
            expr: math.parse('nthRoot(Times(x,y),n)'),
            unknowns: ['x','y','n']
        },
        functie: function(expr) {
            if (expr.name == 'Times') {
                
                if (expr.args.every(factor => factor.fn == 'nthRoot')) {
                    console.log('good one');
                    baseArray = [];
                    n = expr.args[0].args[1];
                    expr.args.forEach( factor => {if (factor.args[1].equals(n)) {baseArray.push(factor.args[0])} });
                    console.log('aantal gelijke exp = ' + baseArray.length);
                    
                    if (baseArray.length === expr.args.length) {
                        product = makeMulti('Times', baseArray);
                        wortel = new math.expression.node.FunctionNode("nthRoot", [product, n]);

                    //    parsewortel = math.parse("nthRoot(a,b)");
                    //    parsewortel.args[0] = product;
                    //    parsewortel.args[1] = n;
                        
                        console.log('wortel = ' + wortel.toString());
                        return wortel;

                    // console.log('parsewortel = ' + parsewortel.toString());
                    //    return parsewortel;
                    }
                }
            }
            
        },

                        
        
        
    },
        
    productOnderDeWortel: {
        naam: 'product onder de wortel',
        input: {
            expr: math.parse('nthRoot(Times(x,y),n)'),
            unknowns: ['x','y','n']
        },
        output: {
            expr: math.parse('Times(nthRoot(x,n),nthRoot(y,n))'),
            unknowns: ['x','y','n']
        },
        functie: function(expr) {
            if (expr.name == 'nthRoot') {
                
                if (expr.args[0].name == 'Times') {
                    console.log('good one');
                    factorArray = expr.args[0].args;
                    n = expr.args[1];
                        wortelArray = factorArray.map(factor => new math.expression.node.FunctionNode("nthRoot", [factor, n]))
                        product = makeMulti('Times', wortelArray);
                        console.log('product = ' + product.toString());
                        return product;
                    
                }
            }
        }
    },
    wortelVanBreuk: {
        naam: 'wortel van een breuk',
        input: {
            expr: math.parse('nthRoot(x/y,n)'),
            unknowns: ['x','y','n']
        },
        output: {
            expr: math.parse('nthRoot(x,n)/nthRoot(y,n)'),
            unknowns: ['x','y','n']
        }
    },
    breukVanWortels: {
        naam: 'breuk van wortels',
        input: {
            expr: math.parse('nthRoot(x,n)/nthRoot(y,n)'),
            unknowns: ['x','y','n']
        },
        output: {
            expr: math.parse('nthRoot(x/y,n)'),
            unknowns: ['x','y','n']
        }
    },
        // TODO functie voor schrijven
    binomium2Expand: {
        naam: 'merkwaardig kwadraat uitwerken',
        input: {
            expr: math.parse('pow(Plus(a,b),2)'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('Plus(pow(a,2),Times(2,a,b), pow(b,2))'),
            unknowns: ['a','b']
        }
    },
        // TODO functie voor schrijven zodat het niet langere plussen meeherkent!
    binomium2Factor: {
        naam: 'merkwaardig kwadraat herkennen',
        input: {
            expr: math.parse('Plus(pow(a,2),Times(2,a,b), pow(b,2))'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('pow(Plus(a,b),2)'),
            unknowns: ['a','b']
        }
    },
        // TODO functie voor schrijven
    binomium3Expand: {
        naam: 'merkwaardige derdemacht uitwerken',
        input: {
            expr: math.parse('pow(Plus(a,b),3)'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('Plus(pow(a,3),Times(3,pow(a,2),b),Times(3,a,pow(b,2)), pow(b,3))'),
            unknowns: ['a','b']
        }
    },
        // TODO functie voor schrijven
    binomium3Factor: {
        naam: 'merkwaardig derde macht herkennen',
        input: {
            expr: math.parse('Plus(pow(a,3),Times(3,pow(a,2),b),Times(3,a,pow(b,2)), pow(b,3))'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('pow(Plus(a,b),3)'),
            unknowns: ['a','b']
        }
    },
        // TODO functie voor schrijven
    verschilVanKwadratenExpand: {
        naam: 'verschil van kwadraten uitwerken',
        input: {
            expr: math.parse('Plus(pow(a,2),unaryMinus(pow(b,2)))'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('Times(Plus(a,b),Plus(a,unaryMinus(b)))'),
            unknowns: ['a','b']
        }
    },
        // TODO functie voor schrijven
    verschilVanKwadratenExpand1: {
        naam: 'verschil van kwadraten herkennen',
        input: {
            expr: math.parse('Times(Plus(a,b),Plus(a,unaryMinus(b)))'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('Plus(pow(a,2),unaryMinus(pow(b,2)))'),
            unknowns: ['a','b']
        }
    },
        // TODO functie voor schrijven
    verschilVanKwadratenExpand2: {
        naam: 'verschil van kwadraten herkennen',
        input: {
            expr: math.parse('Times(Plus(a,unaryMinus(b)),Plus(a,b))'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('Plus(pow(a,2),unaryMinus(pow(b,2)))'),
            unknowns: ['a','b']
        }
    },
    BreukAlsVerschilVanExponenten: {
        naam: 'breuk van machten is het verschil van exponenten',
        input: {
            expr: math.parse('pow(a,n)/pow(a,m)'),
            unknowns: ['a','n','m']
        },
        output: {
            expr: math.parse('pow(a,n-m)'),
            unknowns: ['a','n','m']
        }
    },

    nulDelenDoorIets: {
        naam: 'nul delen door iets is nul',
        input: {
            expr: math.parse('0/a'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('0'),
            unknowns: []
        }
    },

    factorBuitenhalenMetC: {
        naam: 'factor buitenhalen met C',
        input: {
            expr: math.parse('Plus(a,b)'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('Times(c,Plus(a/c,b/c))'),
            unknowns: ['a','b']
        },
        functie: function(expr) {
            
            if (expr.name == 'Plus') {
                
                    console.log('good one');
                    generatorArray = [];
                    divisor = math.parse('c');
                    newTermsArray = expr.args.map(term => new math.expression.node.OperatorNode("/", "divide", [term, divisor]));
                    newPlus = makeMulti('Plus', newTermsArray);

                    return makeMulti('Times', [divisor, newPlus]);
                
            }
        
        },
        extraEquation: math.parse('c==Select(c)')
    },

    factorBuitenhalenMetFunctie: {
        naam: 'factor buitenhalen met functie',
        input: {
            expr: math.parse('Plus(a,b)'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('Times(c,Plus(a/c,b/c))'),
            unknowns: ['a','b']
        },


       functie: function(expr) {

            var sameFactor = true;
            
            if (expr.name == 'Plus') {
             
                    console.log('good one');
                    commonFactor = expr.args[0].args[0];
                    newexpr = expr.map(function(term, index, parent) {
                        if (term.args[0].equals(commonFactor) & (term.name == 'Times'))
                        {
                //            (sameFactor = sameFactor);
                           return term.map(function(factor, index, parent) {
                                if (factor.equals(commonFactor) & index == "args[0]")
                                    {
                                        console.log("index = ", index);
                                        return math.parse(1);
                                    }
                                    else { 
                                        return factor
                                    }
                            });
                            // gezuiverdeterm = node;
                            // gezuiverdeterm.args[0] = math.parse(1);
                            // newTermsArray.push(gezuiverdeterm);
                        }
                        else {
                            sameFactor = false;
                            return term;
                        }
 
                      });
                    if (sameFactor) {
 //                      newTermsArray = expr.args.map(term => new math.expression.node.OperatorNode("/", "divide", [term, commonFactor]));

                      //  alle gemaakte 1en weghalen
                      newPlus = newexpr.map(function(term,index,parent) {
                        if (term.name == 'Times') {
                            if (term.args.some(s => s.value == 1)) {
                                console.log('bevat product met 1');
                                newfactors = [];
                                term.args.forEach(factor => {if (factor.value != 1) {console.log('notone =' + factor.toString()); newfactors.push(factor)}});
                                if (newfactors.length==0) {newfactors = [math.parse(1)]}
                                newterm = makeMulti('Times', newfactors);
                                console.log('newexp =' + newterm.toString());
                                return newterm;
                            }
                        }
                    
                    });
                        console.log('commonfactor = ', commonFactor);
                        console.log('newplus = ', newPlus);
                        return makeMulti('Times', [commonFactor, newPlus]);
                    } 

                
            }
        
        }
    },

    productAlsMacht: {
        naam: 'gelijke factoren als een macht schrijven met functie',
        input: {
            expr: [],
            unknowns: [],

        },
        output: {
            expr: [],
            unknowns: [],
        },
        functie: function(expr) {
            if (expr.name == 'Times') {
                base = expr.args[0];
                if (expr.args.every( factor => factor.equals(base))) {
                    console.log('good one');
                    exponent = expr.args.length;
                    console.log('exponent = '+ exponent);
                    console.log('base = ' + base.toString());
                    return new math.expression.node.FunctionNode('pow', [base, math.parse(exponent)]);

                }
            }
            
        }

    },

    brengLinkseFactorBinnenMetFunctie: {
        naam: 'factor langs links binnen multiplus brengen met functie',
        input: {
            expr: [],
            unknowns: [],

        },
        output: {
            expr: [],
            unknowns: [],
        },
        functie: function(expr) {
            if (expr.name == 'Times') {
                if (expr.args[1].name == 'Plus') {
                    console.log('good one');
                    generatorArray = expr.args;
                    console.log(generatorArray);
                    combos = oneCombinations(generatorArray);
                    return makeMulti('Plus', combos.map(paar => makeMulti('Times', paar)));

                }
            }
            // return math.parse('Times(l,o,l)');
        }

    },

    expandDoorMetFunctie: {
        naam: 'product van multiplussen terugbrengen tot lange som met functie',
        input: {
            expr: [],
            unknowns: [],

        },
        output: {
            expr: [],
            unknowns: [],
        },
        functie: function(expr) {
            if (expr.name == 'Times') {
                if (expr.args.some(s => s.name == 'Plus')) {
                    console.log('good one');
                    generatorArray = [];
                    expr.args.forEach(factor => (factor.name == 'Plus') ? generatorArray.push(factor.args) : generatorArray.push(factor));
                    console.log(generatorArray);
            //  TODO: vervang oneCombinations hier door nCombinations!
                    combos = oneCombinations(generatorArray);
                    return makeMulti('Plus', combos.map(paar => makeMulti('Times', paar)));

                }
            }
            return math.parse('Times(l,o,l)');
        }

    },

    vergelijkingNegeren: {
        naam: 'negeer vergelijking',
        input: {
            expr: math.parse('a==b'),
            unknowns: ['a','b']
        },
        output: {
            expr: math.parse('a==b'),
            unknowns: ['a','b']
        },
        functie: function(expr) {
            if (expr.fn == 'equal') {
                return math.parse("vgl dus gn omvorm");
            }

        }
    },                    

    nulBijtellen: {

        naam: 'nul bijtellen',
        input: {

            expr: math.parse('a'),
            unknowns: ['a']
        },
        output: {

            expr: math.parse('Plus(a,0)'),
            unknowns: ['a']
        }
    },

    aGedeeldDoorA: {

        naam: 'a delen door a is 1',
        input: {
            expr: math.parse('a/a'),
            unknowns: ['a']
        },
        output: {
            expr: math.parse('1'),
            unknowns: []
        }
    }, 

    logUitdelenOverMaal: {

        naam: 'log uitdelen over product',
        input: {
            expr: math.parse('log(Times(b,c),a)'),
            unknowns: ['a','b','c']
        },
        output: {

            expr: math.parse('Plus(log(b,a),log(c,a))'),
            unknowns: ['a','b','c']
        }
    },

    logUitdelenOverExp: {

        naam: 'log uitdelen over exponent',
        input: {
            expr: math.parse('log(pow(b,c),a)'),
            unknowns: ['a','b','c']
        },
        output: {

            expr: math.parse('Times(c,log(b,a))'),
            unknowns: ['a','b','c']
        }
    },                     

    delingMetGelijkeExponenten: {
        naam: 'deling met gelijke exponenten',
        input: {
            expr: math.parse('pow(x,n)/pow(y,n)'),
            unknowns: ['x','y','n']
        },
        output: {
            expr: math.parse('pow(x/y,n)'),
            unknowns: ['x','y','n']
        },
        functie: function(expr) {
            if (expr.fn == 'divide') {
                if (expr.args.every(factor => factor.name == 'pow')) {
                    console.log('deling van machten gevonden');
                    let teller = expr.args[0];
                    let noemer = expr.args[1];
                    
                    // Check of de exponenten gelijk zijn
                    if (teller.args[1].equals(noemer.args[1])) {
                        let basis = new math.expression.node.OperatorNode("/", "divide", 
                            [teller.args[0], noemer.args[0]]);
                        let exponent = teller.args[1];  // we nemen een van beide exponenten
                        
                        return new math.expression.node.FunctionNode('pow', [basis, exponent]);
                    }
                }
            }
        }
    },

    plusMinusNaarMin: {
        naam: 'plus minus naar min',
        input: 'Plus(a,unaryMinus(b))',
        output: 'Minus(a,b)',
        functie: function(expr) {
            if (expr.fn == 'Plus') {
                let minusIndex = expr.args.findIndex(arg => arg.name == 'unaryMinus');
                if (minusIndex !== -1) {
                    let otherArgs = expr.args.filter((arg, index) => index !== minusIndex);
                    let leftSide = otherArgs.length === 1 
                        ? otherArgs[0] 
                        : makeMulti('Plus', otherArgs);
                    
                    return new math.expression.node.OperatorNode('-', 'subtract', 
                        [leftSide, expr.args[minusIndex].args[0]]);
                }
            }
        }
    },

    minNaarPlusMinus: {
        naam: 'min naar plus minus',
        input: 'Minus(a,b)',
        output: 'Plus(a,unaryMinus(b))',
        functie: function(expr) {
            if (expr.fn == 'subtract') {
                let minusTerm = new math.expression.node.FunctionNode('unaryMinus', [expr.args[1]]);
                
                if (expr.args[0].fn == 'Plus') {
                    let newArgs = [...expr.args[0].args, minusTerm];
                    return makeMulti('Plus', newArgs);
                } else {
                    return makeMulti('Plus', [expr.args[0], minusTerm]);
                }
            }
        }
    },

    basisuitdelen: {
        naam: 'basis uitdelen',
        input: 'pow(a,b)',
        output: 'pow(a,Times(b,1))',
        functie: function(expr) {
            if (expr.name == 'pow') {
                let basis = expr.args[0];
                let exponent = expr.args[1];
                
                // Gebruik makeMulti in plaats van OperatorNode
                let nieuweExponent = makeMulti('Times', [exponent]);
                
                return new math.expression.node.FunctionNode('pow', [basis, nieuweExponent]);
            }
        }
    },

    machtMetUnaryMinusInExponent: {
        naam: 'macht met unary minus in exponent',
        input: 'pow(divide(a,b),unaryMinus(n))',
        output: 'pow(divide(b,a),n)',
        functie: function(expr) {
            if (expr.name == 'pow') {
                // Check of de basis een deling is
                let basis = expr.args[0];
                if (basis.fn != 'divide') return;
                
                // Check of de exponent een unaryMinus is
                let exponent = expr.args[1];
                if (exponent.name != 'unaryMinus') return;
                
                // Haal de teller en noemer uit de basis
                let teller = basis.args[0];
                let noemer = basis.args[1];
                
                // Maak een nieuwe deling met teller en noemer omgewisseld
                let nieuweBasis = new math.expression.node.OperatorNode('/', 'divide', [noemer, teller]);
                
                // Gebruik de expressie binnen de unaryMinus als nieuwe exponent
                let nieuweExponent = exponent.args[0];
                
                return new math.expression.node.FunctionNode('pow', [nieuweBasis, nieuweExponent]);
            }
        }
    },

    nulUitSomSchrappen: {
        naam: 'nul uit som schrappen',
        input: 'Plus(a,0,b)',
        output: 'Plus(a,b)',
        functie: function(expr) {
            if (expr.fn == 'Plus') {
                // Filter alle argumenten die niet 0 zijn
                let nietNulArgs = expr.args.filter(arg => 
                    !(arg.type == 'ConstantNode' && arg.value == 0)
                );
                
                // Als er geen argumenten overblijven, return 0
                if (nietNulArgs.length == 0) {
                    return new math.expression.node.ConstantNode(0);
                }
                
                // Als er maar 1 argument overblijft, return dat argument
                if (nietNulArgs.length == 1) {
                    return nietNulArgs[0];
                }
                
                // Anders maak een nieuwe Plus met de overgebleven argumenten
                return makeMulti('Plus', nietNulArgs);
            }
        }
    },

};

uitdeelregels = [
    'brengLinkseFactorBinnenMetFunctie',
    'simpeleBreukUitElkaarTrekken',
    'maalbreukSplitsen',
    'machtVanProduct',
    'machtVanProductZonderDeling',
    'machtVanDeling',  // Nieuwe regel toegevoegd
    'productOnderDeWortel',
    'wortelVanBreuk',
    'logUitdelenOverMaal',
    'logUitdelenOverExp',
    'delingMetGelijkeExponenten'
];